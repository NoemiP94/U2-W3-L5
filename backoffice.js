const addressBarContent = new URLSearchParams('location.search')
const productId = addressBarContent.get('productId')
const nameProductInput = document.getElementById('name')
const descriptionProductInput = document.getElementById('description')
const brandProductInput = document.getElementById('brand')
const imageProductInput = document.getElementById('imageUrl')
const priceProductInput = document.getElementById('price')

// per la modifica
if (productId) {
  fetch('https://striveschool-api.herokuapp.com/api/product/' + productId, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM',
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        if (res.status === 400) {
          throw new Error('Errore 400 - Bad request')
        } else if (res.status === 401) {
          throw new Error('Errore 401 - Unauthorized')
        } else if (res.status === 404) {
          throw new Error('Errore 404 - Not found')
        } else if (res.status === 500) {
          throw new Error('Errore 500 - Internal Server Error')
        } else {
          throw new Error('Errore')
        }
      }
    })
    .then((productDetails) => {
      nameProductInput.value = productDetails.name
      descriptionProductInput.value = productDetails.description
      brandProductInput.value = productDetails.brand
      imageProductInput.value = productDetails.imageUrl
      priceProductInput.value = productDetails.price
    })
    .catch((err) => {
      console.log(err)
    })
}

// creazione oggetti e card
const formProduct = document.getElementById('formP')
formProduct.addEventListener('submit', (e) => {
  e.preventDefault()

  // creo oggetto product
  const newProduct = {
    name: nameProductInput.value,
    description: descriptionProductInput.value,
    brand: brandProductInput.value,
    imageUrl: imageProductInput.value,
    price: priceProductInput.value,
  }

  console.log(newProduct)

  // fetch per invio dati all'API
  fetch('https://striveschool-api.herokuapp.com/api/product', {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM',
    },
  })

  let methodMod = 'POST'
  if (productId) {
    methodMod = 'PUT'
  }

  let url = 'https://striveschool-api.herokuapp.com/api/product/'
  if (productId) {
    url = 'https://striveschool-api.herokuapp.com/api/product/' + productId
  }

  fetch(url, {
    method: methodMod,
    body: JSON.stringify(newProduct),
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM',
    },
  })
    .then((res) => {
      if (res.ok) {
        alert('Congratulazioni! Hai salvato il prodotto!')
      } else {
        alert('ATTENZIONE! Errore nel salvataggio!')
        if (res.status === 400) {
          throw new Error('Errore 400 - Bad request')
        } else if (res.status === 401) {
          throw new Error('Errore 401 - Unauthorized')
        } else if (res.status === 404) {
          throw new Error('Errore 404 - Not found')
        } else if (res.status === 500) {
          throw new Error('Errore 500 - Internal Server Error')
        } else {
          throw new Error('Errore')
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
