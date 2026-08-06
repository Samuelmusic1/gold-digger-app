let goldPrice = 3000.00

  setInterval(
    () => { 
      const percentChange = (Math.random() - 0.5) * 0.10
      const priceMultiplier = Math.exp(percentChange)
      goldPrice = parseFloat(priceMultiplier * goldPrice)
    }, 3000
  )

export function priceAlgo() {
  return goldPrice.toFixed(2)
}

