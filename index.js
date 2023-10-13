// creare dinamicamente card prodotto
// aggiungere tasto MODIFICA e SCOPRI DI PIU a ogni prodotto

// headers: {
//     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM"
//     }

const showProduct = function (arrayProducts) {
  const row = document.getElementById('row-card')

  arrayProducts.forEach((product) => {
    const col = document.createElement('div')
    col.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3', 'my-5')
    col.innerHTML = `<div class="card my-4 h-100">
    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style='height:400px'>
    <div class="card-body d-flex flex-column align-items-center justify-content-center">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.brand}</p>
      <p class="card-text text-center">${product.description}</p>
      <p class="card-text">${product.price}€</p>
      <a href="./details.html?productId=${product._id}" class="btn btn-primary m-2">Scopri di più</a>
      <a href="./backoffice.html?productId=${product._id}" class="btn btn-warning m-2">Modifica</a>
      <a href="./details.html?productId=${product._id}" class="btn btn-danger m-2" id="delete-btn">Elimina</a>
    </div>
  </div>`
    row.appendChild(col)
  })
}

// logica spinner
const spinnerLogic = () => {
  const spinner = document.getElementById('spinner')
  spinner.classList.add('d-none')
}

const getProducts = function () {
  fetch('https://striveschool-api.herokuapp.com/api/product', {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTI5MWMwZGU5ZTExZTAwMThlZGEwODYiLCJpYXQiOjE2OTcxOTI5NzMsImV4cCI6MTY5ODQwMjU3M30.6DB21TLcc-IfjuCwkLCNty-iYT1ynq8jUlArwDPFwsM',
    },
  })
    .then((res) => {
      spinnerLogic()
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
    .then((products) => {
      showProduct(products)
    })
    .catch((err) => {
      spinnerLogic(s)
      console.log(err)
    })
}

getProducts()
