import {
	kline_1m,
	kline_3m,
	kline_5m,
	kline_15m,
	kline_1h,
} from "../mongo/schema.js"
import { DateTime } from "luxon"

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

export { getLastCandle }
