import { priceAlgo } from "../utils/priceAlgo.js"
import { sendResponse } from "../utils/sendResponse.js"
import { sanitizeInput } from "../utils/sanitizeInput.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { emailNotisEmitter } from "../events/emailNotisEmitter.js"
import { handleInvt } from "../utils/handleInvt.js"


export async function handlePost(res, req) {
  try {
    const parsedBody = await parseJSONBody(req)
    const sanitizedBody = sanitizeInput(parsedBody)
    await handleInvt(sanitizedBody)
    // emailNotisEmitter.emit('email sent/added', sanitizedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))

  } catch {
    sendResponse(res, 404, 'application/json', JSON.stringify({ status: 'Error', message: err.message}))
  }
}

export function handleLivePrices (res, req, statusCode) {

      res.statusCode = statusCode
      res.setHeader("Content-Type", "text/event-stream")
      res.setHeader("Cache-Control", "no-cache")
      res.setHeader("connection", "keep-alive")

      const interval = setInterval( () => {
        const priceAlgor = priceAlgo()
        res.write(
          `data: ${JSON.stringify({
            event: 'Price-Updated',
            price: priceAlgor
          })}\n\n`
        )
      }, 3000)

      req.on('close', () => {
        clearInterval(interval)
        res.end()
      })

}

