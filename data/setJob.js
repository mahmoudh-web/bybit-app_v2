import { Queue } from "../mongo/schema.js"
import { setEndDate } from "./endDate.js"

const setJob = async (symbol, interval, start) => {
	const end = setEndDate(start.ts)

	if (start < end) {
		const queueData = {
			symbol: symbol,
			timeframe: interval,
			start: start.ts,
			startISO: start.toISO(),
			end: end.ts,
			endISO: end.toISO(),
		}

		await Queue.create(queueData)
	}

	return true
}

export { setJob }
