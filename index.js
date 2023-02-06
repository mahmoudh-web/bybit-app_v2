// TODO: check if jobs are in queue and if necessary add them
// TODO: process queue

import * as dotenv from "dotenv"
dotenv.config()
import { setTypes } from "./initialise/logTypes.js"
import { getMarketData, setMarketData } from "./instruments/instruments.js"
import { DateTime } from "luxon"
import { connectDb, disconnectDb } from "./mongo/connection.js"
import { Queue } from "./mongo/schema.js"
import { createQueue } from "./data/queue.js"
import { processJob } from "./data/processJob.js"

// set global variables
const helper = process.env.HELPER
const initialise = process.env.INITIALISE

// makes sure inly one process is running
let processing = false

const listSize = 200 // no. of candles returned by api
global.timeframes = [
	{
		interval: "1m",
		minutes: "1",
		candles: 1440,
		candleMillis: 60000,
		resultMillis: 60000 * listSize,
	},
	{
		interval: "3m",
		minutes: "3",
		candles: 480,
		candleMillis: 180000,
		resultMillis: 180000 * listSize,
	},
	{
		interval: "5m",
		minutes: "5",
		candles: 288,
		candleMillis: 300000,
		resultMillis: 300000 * listSize,
	},
	{
		interval: "15m",
		minutes: "15",
		candles: 96,
		candleMillis: 900000,
		resultMillis: 900000 * listSize,
	},
	{
		interval: "1h",
		minutes: "60",
		candles: 24,
		candleMillis: 3600000,
		resultMillis: 3600000 * listSize,
	},
]

connectDb()

if (initialise === "true" && helper === "false") {
	console.log(`Initialising log types`)
	await setTypes()
}

// update instrument data
const marketData = async () => {
	if (processing) return

	processing = true
	console.log(`Updating instrument data`)
	// get data from api
	const data = await getMarketData()
	if (data.length) {
		await setMarketData(data)
	}
	processing = false
}

// check queue
const checkQueue = async () => {
	if (processing) return

	processing = true

	// get queue count
	const queueCount = await Queue.countDocuments()

	// exit if queue items exist
	if (queueCount > 0) {
		console.log("items already in queue")
		processing = false
		return
	}

	// create queue
	console.log("queue is empty, proceeding to create queue")
	await createQueue()
	processing = false
}

// process queue
const processQueue = async () => {
	if (processing) return

	processing = true
	const job = await Queue.findOne({ active: false })
	if (!job) return
	// set job as active
	// await Queue.findByIdAndUpdate(job._id, { active: true })

	await processJob(job)
	processing = false
}

// start processes
if (helper === "false" && initialise === "true") await marketData()

if (helper === "false") await checkQueue()

await processQueue()
disconnectDb()
