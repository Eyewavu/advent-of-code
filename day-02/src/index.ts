import fs from "node:fs"

const text =fs.readFileSync("input")
  .toString("utf8")
  .trim()
if ( !text ) process.exit(1)


type Char ="A"|"B"|"C"|"X"|"Y"|"Z"

part1()
function part1() {
  function getChar(input:Char) {
    switch( input ) {
    case "A":
    case "X": return 1
    case "B":
    case "Y": return 2
    case "C":
    case "Z": return 3
    }
  }
  
  function compareChars(a:Char,b:Char) {
    if ( a === "A" && b === "X") return true
    if ( a === "B" && b === "Y") return true
    if ( a === "C" && b === "Z") return true
    return false
  }
  
  const winMap =new Map<Char,Char>([
    ["A","Z"],
    ["B","X"],
    ["C","Y"],
    ["X","C"],
    ["Y","A"],
    ["Z","B"],
  ])
  
  const result =text
    .split("\n")
    .map(line => {
      const [a,b] = line.split(/\s/) as [Char,Char]
      const charScore =getChar(b)
  
      if ( compareChars(a,b) ) return 3 +charScore
      if (winMap.get(b) === a) return 6 +charScore
      return charScore
    })
    .reduce((sum,n) => sum +n)
  
  console.log(result)
}

part2()
function part2() {
  function getCharScore(input:Char) {
    switch( input ) {
    case "A": return 1
    case "X": return 0
    case "B": return 2
    case "Y": return 3
    case "C": return 3
    case "Z": return 6
    }
  }
  
  function getChar(a:Char,b:Char) {
    switch(a) {
    case "X": return winMap.get(b)
    case "Y": return b
    case "Z": return loseMap.get(b)
    }
  }

  const winMap =new Map<Char,Char>([
    ["A","C"],
    ["B","A"],
    ["C","B"],
  ])

  const loseMap =new Map<Char,Char>([
    ["C","A"],
    ["A","B"],
    ["B","C"],
  ])
  
  const result =text
    .split("\n")
    .map(line => {
      const [a,b] = line.split(/\s/) as [Char,Char]
      const c =getChar(b,a)!
      const charScore =getCharScore(c)

      return getCharScore(b) +charScore      
    })
    .reduce((sum,n) => sum +n)
  
  console.log(result)
}
