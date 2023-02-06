import {
	kline_1m,
	kline_3m,
	kline_5m,
	kline_15m,
	kline_1h,
} from "../mongo/schema.js"
import { DateTime } from "luxon"
import { last } from "lodash-es"
import axios from "axios"

const getLastCandle = async instrument => {
	const one = await kline_1m
		.findOne({ identifier: { $regex: `^${instrument}` } })
		.sort({ identifier: -1 })
		.select("start")
	const three = await kline_3m
		.findOne({ identifier: { $regex: `^${instrument}` } })
		.sort({ identifier: -1 })
		.select("start")

	const five = await kline_5m
		.findOne({ identifier: { $regex: `^${instrument}` } })
		.sort({ identifier: -1 })
		.select("start")

	const fifteen = await kline_15m
		.findOne({ identifier: { $regex: `^${instrument}` } })
		.sort({ identifier: -1 })
		.select("start")

	const hour = await kline_1h
		.findOne({ identifier: { $regex: `^${instrument}` } })
		.sort({ identifier: -1 })
		.select("start")

	return { one, three, five, fifteen, hour }
}

const getFirstCandle = async (symbol, interval, start, end) => {
	const query = `${process.env.BYBIT_FUTURES_DATA_BASE_URL}${process.env.BYBIT_FUTURES_KLINE}?symbol=${symbol}&interval=${interval}&start=${start}&end=${end}&limit=200`
	const firstCandleQuery = await axios(query)
		.then(res => res.data.result.list)
		.catch(err => console.log(err))
	return DateTime.fromMillis(Number(last(firstCandleQuery)[0]))
		.startOf("day")
		.setZone("utc")
}

export { getLastCandle, getFirstCandle }
