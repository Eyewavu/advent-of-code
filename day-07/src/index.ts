import fs from "node:fs"

const text =fs.readFileSync("input").toString("utf8").trim()
if ( !text ) process.exit(1)


type File ={
  isDir: boolean,
  name: string,
  size: number
}
class Tree {
  private _value: File
  private _children: Array<Tree>
  private _parent: Tree|null

  get children() {return this._children}
  get value() {return this._value}
  get parent() {return this._parent}

  constructor(value:File,parent?:Tree) {
    this._value = value
    this._parent = parent || null
    this._children =[]
  }

  public addChild(value: File) {
    const newChild = new Tree(value,this)
    this.children.push(newChild)
  }


  public getSize():number {
    return this._children.reduce((sum,child) => {
      if ( child.value.isDir && child._children.length > 0 ) return sum +child.getSize()
      return sum +child._value.size
    },0)
  }

  public listEveryDir():Tree[] {
    return [
      this._children.filter(c => c.value.isDir),
      this._children.map(c => c.listEveryDir()) || []
    ].flat(Infinity) as Tree[]
  }

  public listEverything(i =1):string {
    if ( this._children.length === 0 ) {
      return `${" ".repeat(((i-1)+Math.abs(i-1)))}- ${this._value.name}${this._value.isDir ? " (dir)" : `(file, size=${this._value.size})`}`
    }
    return [`${" ".repeat(((i-1)+Math.abs(i-1)))}- ${this._value.name}${this._value.isDir ? " (dir)" : `(file, size=${this._value.size})`}`,...this._children.map(c => c.listEverything(i+1))].join("\n")
  }
}

type Command ={
  command: {
    name: string;
    args: string[];
  };
  stdout: string;
}
function parseFsTreeFromInput(input: string) {
  const commands =input
    .split("$")
    .filter(i=>i)
    .map(entry => {
      const newLineIndex =entry.indexOf("\n")
      const rawCommand =entry.slice(0,newLineIndex)
      const stdout =entry.slice(newLineIndex)
      const [commandName,...commandArgs] =rawCommand.trim().split(" ")

      return {
        command: {
          name: commandName,
          args: commandArgs
        },
        stdout
      }
    }) as Command[]

  const root =new Tree({name:"/",size:0,isDir:true})
  let currentNode =root

  commands.forEach(command => {
    switch ( command.command.name ) {
      case "cd": {
        const [ path ] =command.command.args
        if ( !path ) break
        if ( path === ".." ) currentNode =currentNode.parent || currentNode
        
        const [ newNode ] =currentNode.children.filter(c => c.value.name === path)
        if ( !newNode ) break

        currentNode =newNode
      }; break
      case "ls": {
        const files:File[] =command.stdout.trim()
          .split("\n")
          .map(line => {
            if ( line.substring(0,3) === "dir" ) {
              return {
                isDir: true,
                name: line.replace(/.+\s/g,""),
                size: 0
              }
            }

            const [size,name] =line.trim().split(" ")
            return {
              isDir: false,
              name: name,
              size: parseInt(size)
            }

          })
        
        files.forEach(file => {
          currentNode.addChild(file)
        })

      }; break

    } 
  })

  return root
}

const root =parseFsTreeFromInput(text)
const allDirectories =root.listEveryDir()
const allDirectoriesFiltered =allDirectories.filter(dir => dir.getSize() <= 100_000)
const allDirectoriesFilteredSum =allDirectoriesFiltered.reduce((sum,dir) => sum + dir.getSize(),0)

console.log(allDirectoriesFilteredSum)

const DISK_SIZE =70_000_000
const UPDATE_SIZE =30_000_000
const DISK_USAGE =root.getSize()

const smallestToDelete =allDirectories
  .map(dir => dir.getSize())
  .filter(n => DISK_USAGE -n <= DISK_SIZE -UPDATE_SIZE)
  .sort((a,b) => a -b)


console.log(smallestToDelete[0])