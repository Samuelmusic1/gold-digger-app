import { handleLivePrices } from "./routeHandlers/routeHandlers.js"

export default async function handlePrice(req, res) {

    await new Promise((resolve) => {
        
        handleLivePrices(res, req, 200);
        
        req.on('close', () => {
            resolve(); 
        })
    })

}