import mongoose from "mongoose"
import axios from "axios"
import { Instrument } from "../mongo/schema.js"

const getMarketData = async () => {
	const url = `${process.env.BYBIT_FUTURES_DATA_BASE_URL}${process.env.BYBIT_FUTURES_DATA_INFO}`

	const data = await axios(url)
		.then(res => res.data.result.list)
		.catch(err => [])

	return data
}

const setMarketData = async data => {
	let count = 0

	for await (let instrument of data) {
		count++
		const instrumentData = {
			symbol: instrument.symbol,
			contractType: instrument.contractType,
			status: instrument.status,
			baseCoin: instrument.baseCoin,
			quoteCoin: instrument.quoteCoin,
			launchTime: Number(instrument.launchTime),
			deliveryTime: instrument.deliveryTime,
			deliveryFeeRate: instrument.deliveryFeeRate,
			priceScale: Number(instrument.priceScale),
			leverageFilter: {
				minLeverage: Number(instrument.leverageFilter.minLeverage),
				maxLeverage: Number(instrument.leverageFilter.maxLeverage),
				leverageStep: Number(instrument.leverageFilter.leverageStep),
			},
			priceFilter: {
				minPrice: Number(instrument.priceFilter.minPrice),
				maxPrice: Number(instrument.priceFilter.maxPrice),
				tickSize: Number(instrument.priceFilter.tickSize),
			},
			lotSizeFilter: {
				maxTradingQty: Number(instrument.lotSizeFilter.maxTradingQty),
				minTradingQty: Number(instrument.lotSizeFilter.minTradingQty),
				qtyStep: Number(instrument.lotSizeFilter.qtyStep),
				postOnlyMaxOrderQty: Number(
					instrument.lotSizeFilter.postOnlyMaxOrderQty
				),
				maxOrderQty: Number(instrument.lotSizeFilter.maxOrderQty),
				minOrderQty: Number(instrument.lotSizeFilter.minOrderQty),
			},
			unifiedMarginTrade: instrument.unifiedMarginTrade,
			fundingInterval: instrument.fundingInterval,
			settleCoin: instrument.settleCoin,
		}

		await Instrument.updateOne(
			{ symbol: instrumentData.symbol },
			{ $set: instrumentData },
			{ upsert: true, new: true }
		)
	}
}

export { getMarketData, setMarketData }
