import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8").trim()
if ( !text ) process.exit(1)

const grid =text
  .split("\n")
  .map(line => line.split("").map(n => parseInt(n, 10)))


const HEIGHT =grid.length
const WIDTH =grid[0].length

let visible =(WIDTH *2) +((HEIGHT -2) *2)
for ( let y =1; y < grid.length -1; y ++ ) {
  for ( let x =1; x < grid[0].length -1; x ++ ) {
    const item =grid[y][x]
    const top =grid.map(l => l[x]).slice(1,y)             .some(n => n >= item) || grid[0][x] >= item
    const right =grid[y].slice(x+1,WIDTH-1)               .some(n => n >= item) || grid[y][WIDTH -1] >= item
    const bottom =grid.map(l => l[x]).slice(y+1,HEIGHT-1) .some(n => n >= item) || grid[HEIGHT -1][x] >= item
    const left =grid[y].slice(1,x)                        .some(n => n >= item) || grid[y][0] >= item

    if ( top && right && bottom && left ) continue
    visible ++
  }
}

console.log(visible)

const scoreArray =[]
function getScoreFromArray(input:number[]) {
  let score =0
  const first =input[0]
  for ( let i = 1; i < input.length; i ++ ) {
    score =i
    if ( input[i] >= first ) {
      return score
    }
  }
  return score
}

for ( let y =1; y < grid.length -1; y ++ ) {
  for ( let x =1; x < grid[0].length -1; x ++ ) {
    const directions =[
      grid.map(l => l[x]).slice(0,y+1).reverse(),
      grid[y].slice(x,WIDTH),
      grid.map(l => l[x]).slice(y,HEIGHT),
      grid[y].slice(0,x+1).reverse(),
    ]

    const scores =directions.map(getScoreFromArray)
    scoreArray.push(scores.reduce((product,item) => product *item,1))
  }
}

const bestScore =scoreArray.sort((a,b) => a -b).reverse()[0]

console.log(bestScore)