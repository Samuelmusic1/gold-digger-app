import path from "node:path"
import { sendResponse } from "./sendResponse.js"
import fs from "node:fs/promises"
import { getContentType } from "./getContentType.js"

export async function serveStatic (res, req, baseURL) {

  
  const filePath = path.join(baseURL, 'public')
  const pathToResource = path.join(filePath, req.url === '/' ? 'index.html' : req.url)
  const ext = path.extname(pathToResource)
  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(pathToResource)

    sendResponse(res, 200, contentType, content)
  } catch (err) {
      if (err.code === 'ENOENT') {
        const pathToResource = path.join(filePath, '404.html')
        const content = await fs.readFile(pathToResource)

        sendResponse(res, 404, "text/html", content)
      } else {
          const content = `<html><h1> Server Error: ${err.code} </h1></html>`
          sendResponse(res, 404, "text/html", content)
        }
     
    }
}