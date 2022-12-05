import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8").trim()
if ( !text ) process.exit(1)

const numbers =text
  .split("\n")
  .map(line => {
    const pairs = line.split(",")
    return pairs.map(pair => {
      return pair
        .split("-")
        .map(i => parseInt(i))
    })
  }) as [[number,number],[number,number]][]

const fullyContained = numbers.reduce((sum,pair) => {
  const [a,b] =pair
  if (
    a[0] <= b[0] && a[1] >= b[1] ||
    b[0] <= a[0] && b[1] >= a[1]
  ) return sum +1
  return sum
},0)



const overlapped =numbers.reduce((sum,pair) => {
  const [a,b] =pair

  if ( a[0] <= b[1] && a[1] >= b[0] ) return sum +1
  

  return sum
},0)


console.log(fullyContained)
console.log(overlapped)