import { DateTime } from "luxon"
import { getInstruments } from "../instruments/instruments.js"
import { Queue } from "../mongo/schema.js"
import { getLastCandle } from "./candles.js"
import { setEndDate } from "./endDate.js"
import { setJob } from "./setJob.js"

const createQueue = async () => {
	// get instruments to download data for
	const instruments = await getInstruments()
	if (!instruments.length) {
		console.log("No instruments returned")
		return
	}

	const startDate = DateTime.fromISO("2021-01-01T00:00:00.000").setZone("utc")

	for await (let instrument of instruments) {
		let oneStart = startDate
		let threeStart = startDate
		let fiveStart = startDate
		let fifteenStart = startDate
		let hourStart = startDate

		console.log(`processing ${instrument.symbol}`)
		// get last candles
		const lastCandles = await getLastCandle(instrument.symbol)

		if (lastCandles.one) {
			oneStart = DateTime.fromMillis(lastCandles.one.start)
				.plus({ minutes: 1 })
				.setZone("utc")
		}

		if (lastCandles.three) {
			threeStart = DateTime.fromMillis(lastCandles.three.start)
				.plus({ minutes: 3 })
				.setZone("utc")
			const threeEnd = setEndDate(threeStart.ts)
		}

		if (lastCandles.five) {
			fiveStart = DateTime.fromMillis(lastCandles.five.start)
				.plus({ minutes: 5 })
				.setZone("utc")
			const fiveEnd = setEndDate(fiveStart.ts)
		}

		if (lastCandles.fifteen) {
			fifteenStart = DateTime.fromMillis(lastCandles.fifteen.start)
				.plus({ minutes: 15 })
				.setZone("utc")
			const fifteenEnd = setEndDate(fifteenStart.ts)
		}

		if (lastCandles.hour) {
			hourStart = DateTime.fromMillis(lastCandles.hour.start)
				.plus({ hours: 1 })
				.setZone("utc")
			const hourEnd = setEndDate(hourStart.ts)
		}

		await setJob(instrument.symbol, "1", oneStart)
		await setJob(instrument.symbol, "3", threeStart)
		await setJob(instrument.symbol, "5", fiveStart)
		await setJob(instrument.symbol, "15", fifteenStart)
		await setJob(instrument.symbol, "60", hourStart)
	}
}

export { createQueue }
