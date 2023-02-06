import axios from "axios"
import { chunk, reverse } from "lodash-es"
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

		const query = `${process.env.BYBIT_FUTURES_DATA_BASE_URL}${process.env.BYBIT_FUTURES_KLINE}?symbol=${job.symbol}&interval=${job.timeframe}&start=${requestStart.ts}&end=${requestEnd.ts}&limit=200`
		requests.push(query)
		requestStart = requestStart.plus({ milliseconds: updateInterval })
		requestEnd = requestEnd.plus({ milliseconds: updateInterval - 1 })
	} while (requestStart < sessionEnd)

	const results = []
	let count = 1
	for await (let request of requests) {
		// get candle data
		const data = await axios(request)
			.then(res => res.data.result.list)
			.catch(async err => {
				return []
			})
		// format candle data
		const formatted = formatCandles(data, job.symbol)
		formatted.forEach(candle => results.push(candle))

		console.log(
			`${job.symbol} - ${job.timeframe}m: request ${count} of ${requests.length} - received ${data.length} candles, total ${results.length} candles`
		)
		count += 1
	}

	if (results.length) {
		await saveCandles(results, job.timeframe, job.symbol)
		console.log(`finished writing ${job.symbol} - ${job.timeframe}m`)
	}
}

function formatCandles(candles, symbol) {
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

async function saveCandles(candles, timeframe, symbol) {
	console.log(`${symbol} - ${timeframe}: ${candles.length} candles`)
	const chunked = chunk(candles, 5000)

	let x = 1
	for await (let chunk of chunked) {
		console.log(
			`${symbol} - ${timeframe}m: writing chunk ${x} of ${chunked.length}`
		)
		switch (timeframe) {
			case "1":
				await kline_1m
					.insertMany(chunk, { ordered: false })
					.catch(err => console.log(err))
				break
			case "3":
				await kline_3m
					.insertMany(chunk, { ordered: false })
					.catch(err => console.log(err))
				break
			case "5":
				await kline_5m
					.insertMany(chunk, { ordered: false })
					.catch(err => console.log(err))
				break
			case "15":
				await kline_15m
					.insertMany(chunk, { ordered: false })
					.catch(err => console.log(err))
				break
			case "60":
				await kline_1h
					.insertMany(chunk, { ordered: false })
					.catch(err => console.log(err))
				break
		}
		x += 1
	}
}

export { processJob }
