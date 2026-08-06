const eventSource = new EventSource('/priceStream')
const form = document.querySelector('form')
const dialogueEl = document.querySelector('.outputs')
const dialogueEmailEl = document.querySelector('.outputsmail')
const btnEl = dialogueEl.querySelector('button')
const btnEmailEl = dialogueEmailEl.querySelector('button')
const invtAmt = document.getElementById('investment-amount')
const invtAlert = document.getElementById('investment-summary')
const priceDisplay = document.getElementById('price-display')
const inputEmail = document.getElementById('investment-email-input')
const fromMessage = document.getElementById('input-email-warning')

let livePrice = 3000

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  livePrice = data.price
  priceDisplay.textContent = livePrice
}

eventSource.onerror = () => {
  console.log('connection failed...')
}

function calcOz () {
  const goldPrice = livePrice
  const invt = parseFloat(invtAmt.value)
  if (isNaN(invt) || invt <= 0) return 0
  const oz = invt / goldPrice
  return parseFloat(oz.toFixed(4))
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  dialogueEmailEl.showModal()
})

btnEmailEl.addEventListener('click', async () => {

  const emailValue = inputEmail.value.trim()

  const ozBought = calcOz()
  const invest = parseFloat(invtAmt.value)
  
  if (!emailValue || !emailValue.includes('@')) {
    fromMessage.textContent = `Please enter a valid email address.`
    return
  }

  dialogueEmailEl.close()

  const invstPayload = {
    ozBought: ozBought,
    invest: invest,
    userEmail: emailValue
  }

  try {
    invtAlert.textContent = " "

    const response = await fetch('./invest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(invstPayload)
    })

    if (response.ok) {
      invtAlert.textContent = `You just bought ${ozBought} ounces (ozt) for €${invest}. You will receive documentation to ${emailValue} shortly.`
      dialogueEl.showModal()
    } else {
      invtAlert.textContent = `We are currently experiencing a downtime, please try again.`
      console.log('Server Error:', response.statusText)
    }

  } catch (error) {
      invtAlert.textContent = `Bad Timing, please try again`
      console.log('Error:', error)
  }

})

btnEl.addEventListener('click', () => {
  dialogueEl.close()
  form.reset()
})

 

