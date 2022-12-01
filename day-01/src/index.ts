import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8")
if ( !text ) process.exit(1)


/* part one */

const elfs =text
  .split("\n\n")
  .map(i => {
    const calories =i
      .split("\n")
      .map(i => parseInt(i))
    
    const sum =calories.reduce((sum,value) => sum + value,0)
    return { sum, calories }
  })
  .filter(e => !isNaN(e.sum))

const max =Math.max(...elfs.map(e => e.sum))
const [ result ] =elfs.filter(e => e.sum === max)

console.log(result.sum)

/* part two */

const topThree =elfs
  .sort((a,b) => a.sum -b.sum)
  .reverse()
  .splice(0,3)

const topThreeSum =topThree.reduce((sum,elf) => sum + elf.sum,0)

console.log(topThreeSum)