import * as dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
import { setTypes } from "./initialise/logTypes.js"
import { getMarketData, setMarketData } from "./instruments/instruments.js"

// connect to db
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URL)

await setTypes()

// TODO: check instruments data
// TODO: check instruments data
// TODO: check instruments data
// TODO: check instruments data
// TODO: check instruments data
// TODO: check instruments data
// TODO: check instruments data

const marketData = async () => {
	// get data from api
	const data = await getMarketData()
	if (data.length) {
		await setMarketData(data)
	}
}

await marketData()
mongoose.disconnect()
