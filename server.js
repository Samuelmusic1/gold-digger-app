import http from "node:http"
import { serveStatic } from "./utils/serveStatic.js"
import { handleLivePrices } from "./routeHandlers/routeHandlers.js"
import { handlePost } from "./routeHandlers/routeHandlers.js"

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

  if (req.url.startsWith('/priceStream')) {
    handleLivePrices(res, req, 200)
    return 
  } else if (req.url === '/invest' && req.method === 'POST') {
      await handlePost(res, req)
      return
  }
  
  await serveStatic(res, req, __dirname)
  
})
server.listen(PORT, () => console.log(`server is live on ${PORT}`))