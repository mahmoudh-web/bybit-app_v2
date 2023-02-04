import fs from "fs"
import csv from "fast-csv"
import { chunk } from "lodash-es"

const alphabet = "1ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alpahabetArr = alphabet.split("")

const split = chunk(alpahabetArr, 4)
console.log(split.length)
const one = split[0]
const two = split[1]
const three = split[2]
const four = split[3]
const five = split[4]
const six = split[5]
const seven = split[6]

// console.log(one)
// console.log(two)
// console.log(three)
// console.log(four)

// create files
fs.writeFile(`./restore/three/one.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/two.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/three.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/four.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/five.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/six.csv`, "", err => console.log(err))
fs.writeFile(`./restore/three/seven.csv`, "", err => console.log(err))

// create write streams
const writeA = fs.createWriteStream("./restore/three/one.csv", {
	encoding: "utf-8",
})
const writeB = fs.createWriteStream("./restore/three/two.csv", {
	encoding: "utf-8",
})
const writeC = fs.createWriteStream("./restore/three/three.csv", {
	encoding: "utf-8",
})
const writeD = fs.createWriteStream("./restore/three/four.csv", {
	encoding: "utf-8",
})
const writeE = fs.createWriteStream("./restore/three/five.csv", {
	encoding: "utf-8",
})
const writeF = fs.createWriteStream("./restore/three/six.csv", {
	encoding: "utf-8",
})
const writeG = fs.createWriteStream("./restore/three/seven.csv", {
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
writeE.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeF.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeG.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)

let x = 1
fs.createReadStream("backups/kline_3m.csv")
	.pipe(csv.parse({ headers: true }))
	.on("error", error => console.error(error))
	.on("data", row => {
		console.log(
			`candle #${x.toLocaleString("en-GB")}: ${row.symbol}, ${
				row.startISO
			}`
		)
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
		} else if (four.includes(row.symbol[0])) {
			console.log(`placed in four.csv`)
			writeD.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (five.includes(row.symbol[0])) {
			console.log(`placed in five.csv`)
			writeE.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (six.includes(row.symbol[0])) {
			console.log(`placed in six.csv`)
			writeF.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else {
			console.log(`placed in seven.csv`)
			writeG.write(
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
		writeE.close()
		writeF.close()
		writeG.close()
	})
