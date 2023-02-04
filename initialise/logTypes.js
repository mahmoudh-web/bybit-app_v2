import mongoose from "mongoose"
import { LogType } from "../mongo/schema.js"

const types = [{ name: "system" }, { name: "error" }, { name: "process" }]

const setTypes = async () => {
	const storedTypes = await LogType.find()
	if (!storedTypes.length) {
		const newTypes = await LogType.create(types)
	}
}

export { setTypes }
