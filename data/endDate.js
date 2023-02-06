import { DateTime } from "luxon"

const setEndDate = start => {
	const yesterday = DateTime.now()
		.minus({ days: 1 })
		.endOf("day")
		.setZone("utc")
	let end = DateTime.fromMillis(start)
		.plus({ days: 15 })
		.endOf("day")
		.setZone("utc")

	if (end > yesterday) end = yesterday

	return end
}

export { setEndDate }
