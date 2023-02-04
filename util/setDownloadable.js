import mongoose from "mongoose"
import { Instrument } from "../mongo/schema.js"

import * as dotenv from "dotenv"
dotenv.config()

// connect to db
mongoose.set("strictQuery", true)
mongoose.connect(process.env.DATABASE_URL)

await Instrument.updateMany(
	{ contractType: "LinearPerpetual", quoteCoin: "USDT" },
	{ $set: { download: true } }
)

mongoose.disconnect()
