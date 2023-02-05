import fs from "fs"
import csv from "fast-csv"
import { chunk } from "lodash-es"

const alphabet = "1ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const alpahabetArr = alphabet.split("")

// create files
alpahabetArr.forEach(letter => {
	// const lower = String(letter).toLowerCase()
	fs.writeFile(`./restore/one/${letter.toLowerCase()}.csv`, "", err =>
		console.log(err)
	)
})

// create write streams
const write1 = fs.createWriteStream("./restore/one/1.csv", {
	encoding: "utf-8",
})
const writeA = fs.createWriteStream("./restore/one/a.csv", {
	encoding: "utf-8",
})
const writeB = fs.createWriteStream("./restore/one/b.csv", {
	encoding: "utf-8",
})
const writeC = fs.createWriteStream("./restore/one/c.csv", {
	encoding: "utf-8",
})
const writeD = fs.createWriteStream("./restore/one/d.csv", {
	encoding: "utf-8",
})
const writeE = fs.createWriteStream("./restore/one/e.csv", {
	encoding: "utf-8",
})
const writeF = fs.createWriteStream("./restore/one/f.csv", {
	encoding: "utf-8",
})
const writeG = fs.createWriteStream("./restore/one/g.csv", {
	encoding: "utf-8",
})
const writeH = fs.createWriteStream("./restore/one/h.csv", {
	encoding: "utf-8",
})
const writeI = fs.createWriteStream("./restore/one/i.csv", {
	encoding: "utf-8",
})
const writeJ = fs.createWriteStream("./restore/one/j.csv", {
	encoding: "utf-8",
})
const writeK = fs.createWriteStream("./restore/one/k.csv", {
	encoding: "utf-8",
})
const writeL = fs.createWriteStream("./restore/one/l.csv", {
	encoding: "utf-8",
})
const writeM = fs.createWriteStream("./restore/one/m.csv", {
	encoding: "utf-8",
})
const writeN = fs.createWriteStream("./restore/one/n.csv", {
	encoding: "utf-8",
})
const writeO = fs.createWriteStream("./restore/one/o.csv", {
	encoding: "utf-8",
})
const writeP = fs.createWriteStream("./restore/one/p.csv", {
	encoding: "utf-8",
})
const writeQ = fs.createWriteStream("./restore/one/q.csv", {
	encoding: "utf-8",
})
const writeR = fs.createWriteStream("./restore/one/r.csv", {
	encoding: "utf-8",
})
const writeS = fs.createWriteStream("./restore/one/s.csv", {
	encoding: "utf-8",
})
const writeT = fs.createWriteStream("./restore/one/t.csv", {
	encoding: "utf-8",
})
const writeU = fs.createWriteStream("./restore/one/u.csv", {
	encoding: "utf-8",
})
const writeV = fs.createWriteStream("./restore/one/v.csv", {
	encoding: "utf-8",
})
const writeW = fs.createWriteStream("./restore/one/w.csv", {
	encoding: "utf-8",
})
const writeX = fs.createWriteStream("./restore/one/x.csv", {
	encoding: "utf-8",
})
const writeY = fs.createWriteStream("./restore/one/y.csv", {
	encoding: "utf-8",
})
const writeZ = fs.createWriteStream("./restore/one/z.csv", {
	encoding: "utf-8",
})

// write headers
write1.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
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
writeH.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeI.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeJ.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeK.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeL.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeM.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeN.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeO.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeP.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeQ.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeR.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeS.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeT.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeU.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeV.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeW.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeX.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeY.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)
writeZ.write(
	`start,open,high,low,close,volume,turnover,identifier,startISO,symbol\n`
)

let x = 1
fs.createReadStream("backups/kline_1m.csv")
	.pipe(csv.parse({ headers: true }))
	.on("error", error => console.error(error))
	.on("data", row => {
		console.log(
			`candle #${x.toLocaleString("en-GB")}: ${row.symbol}, ${
				row.startISO
			}`
		)
		if (row.symbol.startsWith("1")) {
			console.log(`placed in 1.csv`)
			write1.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("A")) {
			console.log(`placed in a.csv`)
			writeA.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("B")) {
			console.log(`placed in b.csv`)
			writeB.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("C")) {
			console.log(`placed in c.csv`)
			writeC.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("D")) {
			console.log(`placed in d.csv`)
			writeD.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("E")) {
			console.log(`placed in e.csv`)
			writeE.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("F")) {
			console.log(`placed in f.csv`)
			writeF.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("G")) {
			console.log(`placed in g.csv`)
			writeG.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("H")) {
			console.log(`placed in h.csv`)
			writeH.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("I")) {
			console.log(`placed in i.csv`)
			writeI.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("J")) {
			console.log(`placed in j.csv`)
			writeJ.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("K")) {
			console.log(`placed in k.csv`)
			writeK.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("L")) {
			console.log(`placed in l.csv`)
			writeL.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("M")) {
			console.log(`placed in m.csv`)
			writeM.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("N")) {
			console.log(`placed in n.csv`)
			writeN.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("O")) {
			console.log(`placed in o.csv`)
			writeO.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("P")) {
			console.log(`placed in p.csv`)
			writeP.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("Q")) {
			console.log(`placed in q.csv`)
			writeQ.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("R")) {
			console.log(`placed in r.csv`)
			writeR.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("S")) {
			console.log(`placed in s.csv`)
			writeS.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("T")) {
			console.log(`placed in t.csv`)
			writeT.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("U")) {
			console.log(`placed in u.csv`)
			writeU.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("V")) {
			console.log(`placed in v.csv`)
			writeV.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("W")) {
			console.log(`placed in w.csv`)
			writeW.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("X")) {
			console.log(`placed in x.csv`)
			writeX.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("Y")) {
			console.log(`placed in y.csv`)
			writeY.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		} else if (row.symbol.startsWith("Z")) {
			console.log(`placed in z.csv`)
			writeZ.write(
				`${row.start},${row.open},${row.high},${row.low},${row.close},${row.volume},${row.turnover},${row.identifier},${row.startISO},${row.symbol}\n`
			)
		}
		x += 1
	})
	.on("end", async () => {
		write1.close()
		writeA.close()
		writeB.close()
		writeC.close()
		writeD.close()
		writeE.close()
		writeF.close()
		writeG.close()
		writeH.close()
		writeI.close()
		writeJ.close()
		writeK.close()
		writeL.close()
		writeM.close()
		writeN.close()
		writeO.close()
		writeP.close()
		writeQ.close()
		writeR.close()
		writeS.close()
		writeT.close()
		writeU.close()
		writeV.close()
		writeW.close()
		writeX.close()
		writeY.close()
		writeZ.close()
	})
