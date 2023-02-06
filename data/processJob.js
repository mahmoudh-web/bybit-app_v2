import axios from "axios"
import { chunk } from "lodash-es"
import { DateTime } from "luxon"
import {
	kline_1m,
	kline_3m,
	kline_5m,
	kline_15m,
	kline_1h,
} from "../mongo/schema.js"

const processJob = async job => {
	const settings = timeframes.filter(t => t.minutes === job.timeframe)
	const updateInterval = settings[0].resultMillis

	// set parameters for whole session
	const sessionStart = DateTime.fromMillis(job.start).setZone("utc")
	const sessionEnd = DateTime.fromMillis(job.end).setZone("utc")

	// set start and end for first request
	let requestStart = sessionStart
	let requestEnd = sessionStart.plus({ milliseconds: updateInterval - 1 })

	// create array of url's to query
	const requests = []
	do {
		if (requestEnd > sessionEnd) {
			requestEnd = sessionEnd
		}

		console.log(requestEnd.toISO())

		const query = `${process.env.BYBIT_FUTURES_DATA_BASE_URL}${process.env.BYBIT_FUTURES_KLINE}?symbol=${job.symbol}&interval=${job.timeframe}&start=${requestStart.ts}&end=${requestEnd.ts}&limit=200`
		requests.push(query)
		requestStart = requestStart.plus({ milliseconds: updateInterval })
		requestEnd = requestEnd.plus({ milliseconds: updateInterval - 1 })
	} while (requestStart < sessionEnd)

	const results = []
	for await (let request of requests) {
		//FIXME: make sure this works

		// get candle data
		const data = await axios(url)
			.then(res => res.data.result.list)
			.catch(async err => {
				await createLogEntry({
					message: `Could't get candle data: ${err}`,
					type: "error",
					callingFunction: "getCandleData",
				})

				return []
			})

		if (data.length) {
			// format candle data
			const formatted = formatCandles(data)
			formatted.forEach(candle => results.push(candle))
			await saveCandles(results, job.timeframe)
		}
	}
}

function formatCandles(candles) {
	const candleData = []

	const sorted = reverse(candles)

	sorted.forEach(candle => {
		const kline = {
			identifier: `${symbol}_${candle[0]}`,
			symbol: symbol,
			start: Number(candle[0]),
			startISO: DateTime.fromMillis(Number(candle[0]))
				.setZone("utc")
				.toISO(),
			open: Number(candle[1]),
			high: Number(candle[2]),
			low: Number(candle[3]),
			close: Number(candle[4]),
			volume: Number(candle[5]),
			turnover: Number(candle[6]),
		}

		candleData.push(kline)
	})

	return candleData
}

async function saveCandles(candles, timeframe) {
	const chunked = chunk(candles, 5000)

	for await (let chunk of chunked) {
		switch (timeframe) {
			case "1":
				await kline_1m.create(chunk).catch(err => console.log(err))
				break
			case "3":
				await kline_3m.create(chunk).catch(err => console.log(err))
				break
			case "5":
				await kline_5m.create(chunk).catch(err => console.log(err))
				break
			case "15":
				await kline_15m.create(chunk).catch(err => console.log(err))
				break
			case "60":
				await kline_1h.create(chunk).catch(err => console.log(err))
				break
		}
	}
}

export { processJob }
