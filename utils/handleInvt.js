import { getData } from './getData.js'
import { emailNotisEmitter } from "../events/emailNotisEmitter.js"
import path from "node:path"
import fs from "node:fs/promises"

const data = path.join(import.meta.dirname, '../data/invtRec.json')

export async function handleInvt(invstData) {
  try {
    
    const newData = await getData()
    invstData.timeStamp = new Date().toISOString()
    newData.push(invstData)

    await fs.writeFile(
      data,
      JSON.stringify(newData, null, 2),
      'utf8'
    )

    emailNotisEmitter.emit('email sent/added', invstData)

    return { success: true }
    
  } catch (err) { 
      console.error("Critical handleInvt operation failure:", err.message)
      throw err
    }
}
