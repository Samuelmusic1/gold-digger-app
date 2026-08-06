import fs from "node:fs/promises"
import path from "node:path"

const __dirname = import.meta.dirname
const data = path.join(__dirname, '../data/invtRec.json')

try { 
  await fs.mkdir(path.dirname(data), { recursive : true})
  await fs.writeFile(data, '[]', { flag: 'wx'})
} catch (err) {

}

export async function getData() {
  try {
    const newData = await fs.readFile(data, 'utf8').catch(() => '[]')
    let parsedData = JSON.parse(newData || '[]')
    if(!Array.isArray(parsedData)) {
      parsedData = []
    }
    return parsedData
  } catch(err) {
    console.log(err)
    return []
  }
}