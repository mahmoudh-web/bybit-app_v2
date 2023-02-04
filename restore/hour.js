import * as dotenv from "dotenv"
dotenv.config()

import csv from "fast-csv"
import mongoose from "mongoose"
import fs from "fs"
import { Instrument, kline_1h } from "../mongo/schema.js"
import { sortBy, chunk } from "lodash-es"
import { formatCandles } from "./lib/helpers.js"

// connect to db
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URL)

// get instruments
const instruments = await Instrument.find().sort({ symbol: 1 })

if (instruments.length) {
	// read candle data
	const data = []

	let x = 1
	fs.createReadStream("backups/kline_1h.csv")
		.pipe(csv.parse({ headers: true }))
		.on("error", error => console.error(error))
		.on("data", row => {
			console.log(`received candle #${x}`)
			data.push(row)
			x += 1
		})
		.on("end", async () => {
			console.log(`imported data: ${data.length} candles`)
			for await (let instrument of instruments) {
				const candles = data.filter(d => d.symbol === instrument.symbol)
				console.log(`${instrument.symbol}: ${candles.length} candles`)
				if (candles.length) {
					const formatted = sortBy(formatCandles(candles), "start")
					const chunked = chunk(formatted, 10000)
					let y = 1
					for await (let chunk of chunked) {
						await kline_1h
							.insertMany(chunk, { ordered: false })
							.catch(err => console.log(err))
						console.log(
							`${instrument.symbol}: Written chunk ${y} of ${chunked.length}`
						)
						y += 1
					}
				}
			}
			mongoose.disconnect()
		})
}
