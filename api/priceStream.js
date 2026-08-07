export default async function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  await new Promise((resolve) => {
    
    const interval = setInterval(() => {
      
      const basePrice = 2000;
      const volatility = (Math.random() - 0.5) * 15; 
      const priceAlgor = parseFloat((basePrice + volatility).toFixed(2));

      res.write(
        `data: ${JSON.stringify({
          event: 'Price-Updated',
          price: priceAlgor
        })}\n\n`
      );
    }, 3000);

    req.on('close', () => {
      clearInterval(interval);
      res.end();
      resolve(); 
    });
    
  });
}
