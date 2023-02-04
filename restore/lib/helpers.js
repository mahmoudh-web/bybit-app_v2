import { DateTime } from "luxon"

function formatCandles(candles) {
	const formatted = []
	candles.forEach(candle => {
		const formattedData = {
			start: Number(candle.start),
			open: Number(candle.open),
			high: Number(candle.high),
			low: Number(candle.low),
			close: Number(candle.close),
			volume: Number(candle.volume),
			turnover: Number(candle.turnover),
			identifier: candle.identifier,
			startISO: DateTime.fromMillis(Number(candle.start))
				.setZone("utc")
				.toISO(),
			symbol: candle.symbol,
		}

		formatted.push(formattedData)
	})

	return formatted
}

export { formatCandles }
