import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8").trim()
if ( !text ) process.exit(1)

const rucksacks =text
  .split("\n")
  .map(line => {
    const index =Math.round(line.length /2)
    return [
      line.substring(0, index),
      line.substring(index)
    ]
  }) as [string,string][]


function chunkArray<T>(input:T[],CHUNK_SIZE =3) {
  const chunks:T[][] =[]
  const chunk:T[] =[input?.[0]]
  
  for ( let i =1; i < input.length; i++ ) {
    if ( i % CHUNK_SIZE === 0 ) {
      chunks.push([...chunk])
      chunk.splice(0,Infinity)
    }

    chunk.push(input[i])
  }
  chunks.push([...chunk])
  
  return chunks
}

function getPriority(input:string) {
  const char =input.charCodeAt(0)
  if ( char >= 97 && char <= 122 ) return char -96
  if ( char >= 65 && char <= 90 ) return char -38
  return 0
}


function findDuplicatesInAll(...inputs:string[]) {
  const sets =inputs.map(input => {
    const set =new Set(input.split(""))
    const arr =Array.from(set.values())
    return arr
  })
  
  const smallest_set =sets.sort((a,b) => a.length -b.length)[0]
  const common:string[] =[]
  
  smallest_set?.forEach(ch => sets.every(set => set.indexOf(ch) !== -1) && common.push(ch))

  return common
}


function findDuplicates(...inputs:string[]) {
  const map =new Map<string,number>()
  inputs.forEach(input => {
    const set =new Set<string>()
    input
      .split("")
      .forEach(ch => set.add(ch))
    
    set.forEach(ch => map.set(ch,(map.get(ch) || 0) +1))
  })

  const duplicates =Array
    .from(map.entries())
    .filter(([_,value]) => value > 1 )
    .map(([key]) => key)

  return duplicates
}


const priority_sum =rucksacks.reduce((sum,rucksack) => {
  const duplicates =findDuplicates(...rucksack)
  duplicates.forEach(d => sum += getPriority(d))

  return sum
},0)

console.log(priority_sum)


const chunks =chunkArray(rucksacks)
const badge_sum =chunks.reduce((sum,chunk) => {
  const _chunk =chunk.map(item => item.join(""))
  const duplicates =findDuplicatesInAll(..._chunk)
  duplicates.forEach(d => sum += getPriority(d))

  return sum
},0)

console.log(badge_sum)