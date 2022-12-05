import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8")
if ( !text ) process.exit(1)

const [stack_data,command_data] =text.split("\n\n")

function parseStackData(input:string) {
  const grid:(string|null)[][] =[]
  const lines =input.split("\n")
  lines.forEach(line => {
    const crates =line.match(/.{3,4}/g) || []
    grid.push(crates.map(c => {
      const [ char ] =c.match(/\w/) || []

      return char || null
    }))
  })

  const stack_labels =grid.pop()!
  const stacks:string[][] =stack_labels.map((_,i) => {
    return grid
      .map(line => line[i] || null)
      .filter(item => item !== null)
      .reverse() as string[]
  })

  return stacks
}


type Command ={
  move: number,
  from: number,
  to: number
}
function parseCommandData(input:string):Command[] {
  return input
    .split("\n")
    .map(line => {
      const match =line.match(/\d+/g) || []
      if ( match.length < 3 ) return

      const [move,from,to] =match.map(n => parseInt(n))
      return {move,from,to}
    })
    .filter(i => i) as Command[]
}

const stacks = parseStackData(stack_data)
const commands = parseCommandData(command_data)

function crateMover9000(__stacks:string[][],__commands:Command[]) {
  const stacks =JSON.parse(JSON.stringify(__stacks)) as string[][]
  const commands = JSON.parse(JSON.stringify(__commands)) as Command[]

  commands.forEach(command => {
    const { move,from,to } =command
    Array(move)
      .fill(0)
      .map(() => stacks[from -1].pop())
      .forEach(c => stacks[to -1].push(c!))
  })

  const top =stacks.map(stack => stack[stack.length -1])
  return top.join("")
}

function crateMover9001(__stacks:string[][],__commands:Command[]) {
  const stacks =JSON.parse(JSON.stringify(__stacks)) as string[][]
  const commands = JSON.parse(JSON.stringify(__commands)) as Command[]

  commands.forEach(command => {
    const { move,from,to } =command
    const crates =Array(move)
      .fill(0)
      .map(() => stacks[from -1].pop())
      .reverse()
    
    crates.forEach(c => stacks[to -1].push(c!))
  })

  const top =stacks.map(stack => stack[stack.length -1])
  return top.join("")
}

console.log(crateMover9000(stacks,commands))
console.log(crateMover9001(stacks,commands))