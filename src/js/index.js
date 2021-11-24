console.log("Dev m3");

//Get the elements from API
function getProducts() {
    let productContainer = document.getElementById("items-container");
    fetch("http://localhost:5000/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.forEach((element) => {
          let { id, name, price, image, parcelamento } = element;
          productContainer.innerHTML += `
                <div class="producto" id="producto-${id}">
                <div class="product-image">
                  <img src=${image} alt="" />
                </div>
                <span class="product-name">${name}</span>
                <span class="product-price">R$ ${price}</span>
                <span class="product-quotas">até ${parcelamento[0]}x de R$${parcelamento[1]}</span>
                <button class="button product-button">COMPRAR</button>
              </div>`;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }




// Run the function
  getProducts();