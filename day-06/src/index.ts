import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8").trim()
if ( !text ) process.exit(1)


function find(input:string,size:number) {
  for ( let i =0; i < input.length -size -1; i++ ) {
    const set =new Set(input.substring(i,i+size).split(""))
    if ( set.size === size ) return i +size
  }
}

console.log(find(text,4))
console.log(find(text,14))
