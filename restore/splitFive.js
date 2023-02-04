import fs from "fs"
import csv from "fast-csv"
import { chunk } from "lodash-es"

const alphabet = "1ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alpahabetArr = alphabet.split("")

const split = chunk(alpahabetArr, 7)

const one = split[0]
const two = split[1]
const three = split[2]
const four = split[3]

console.log(one)
console.log(two)
console.log(three)
console.log(four)

// create files
fs.writeFile(`./restore/five/one.csv`, "", err => console.log(err))
fs.writeFile(`./restore/five/two.csv`, "", err => console.log(err))
fs.writeFile(`./restore/five/three.csv`, "", err => console.log(err))
fs.writeFile(`./restore/five/four.csv`, "", err => console.log(err))

// create write streams
const writeA = fs.createWriteStream("./restore/five/one.csv", {
	encoding: "utf-8",
})
const writeB = fs.createWriteStream("./restore/five/two.csv", {
	encoding: "utf-8",
})
const writeC = fs.createWriteStream("./restore/five/three.csv", {
	encoding: "utf-8",
})
const writeD = fs.createWriteStream("./restore/five/four.csv", {
	encoding: "utf-8",
})

// write headers
writeA.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeB.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeC.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeD.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)

let x = 1
fs.createReadStream("backups/kline_5m.csv")
	.pipe(csv.parse({ headers: true }))
	.on("error", error => console.error(error))
	.on("data", row => {
		console.log(`candle #${x}: ${row.symbol}, ${row.startISO}`)
		if (one.includes(row.symbol[0])) {
			console.log(`placed in one.csv`)
			writeA.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (two.includes(row.symbol[0])) {
			console.log(`placed in two.csv`)
			writeB.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (three.includes(row.symbol[0])) {
			console.log(`placed in three.csv`)
			writeC.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else {
			console.log(`placed in four.csv`)
			writeD.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		}
		x += 1
	})
	.on("end", async () => {
		writeA.close()
		writeB.close()
		writeC.close()
		writeD.close()
	})
