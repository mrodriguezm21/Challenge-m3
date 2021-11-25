console.log("Dev m3");
// Filter duplicated products
let noRepeat = [];
function nonRepeat(id) {
  const val = noRepeat.includes(id);
  if (!val) noRepeat.push(id);
  return val;
}

/* Filter menu mobile */

//Get the elements from DOM

let filterMenu = document.getElementById("filter-container-desktop");
let filterButton = document.getElementById("filter-button");
let categoryTitle = document.getElementById("category-title");
let colorMenu = document.getElementsByClassName("colors")[0];
let colorUl = document.getElementsByClassName("color-ul")[0];
let colorUl2 = document.getElementsByClassName("expand-colors-ul")[0];
let sizeMenu = document.getElementsByClassName("sizes")[0];
let sizeUl = document.getElementsByClassName("size-ul")[0];
let priceMenu = document.getElementsByClassName("price-range")[0];
let priceUl = document.getElementsByClassName("p-container")[0];
let h1Filter = document.getElementById("filt-header");
let xButton = document.getElementById("x");
let bagIcon = document.getElementById("bag-icon");
let logo = document.getElementById("logo");
filterButton.addEventListener("click", () => {
  categoryTitle.style.display = "none";
  logo.style.display = "none";
  bagIcon.style.display = "none";
  filterMenu.classList.toggle("is-active");
  h1Filter.classList.toggle("is-active");
  xButton.classList.toggle("is-active");
});
xButton.addEventListener("click", () => {
  categoryTitle.style.display = "unset";
  logo.style.display = "unset";
  bagIcon.style.display = "unset";
  filterMenu.classList.toggle("is-active");
  h1Filter.classList.toggle("is-active");
  xButton.classList.toggle("is-active");
});
if (window.matchMedia("(max-width: 768px)").matches) {
  colorMenu.firstElementChild.addEventListener("click", () => {
    colorUl.classList.toggle("is-active");
    colorUl2.classList.toggle("is-active");
  });
  
  sizeMenu.firstElementChild.addEventListener("click", () => {
    sizeUl.classList.toggle("is-activeG");
  });
  priceMenu.firstElementChild.addEventListener("click", () => {
    priceUl.classList.toggle("is-active");
  });
}

/* Sort menu mobile */

/* Get the elements from API */

//Get the elements from DOM
let productContainer = document.getElementById("items-container");
let seeMoreButton = document.getElementById("see-more");

// Get products
function getProducts(amount) {
  fetch("http://localhost:5000/products")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let slicedArray = data.slice(0, amount);
      slicedArray.forEach((element) => {
        let { id, name, price, image, parcelamento } = element;
        if (!nonRepeat(id)) {
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
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// Get products media querie
const product = () => {
  if (window.matchMedia("(max-width: 768px)").matches) {
    getProducts(4);
    return null;
  } else {
    getProducts();
  }
};
// Get more products (for mobile)
seeMoreButton.addEventListener("click", () => {
  productContainer.innerHTML = "";
  noRepeat = [];
  getProducts(9);
});

// Run the function
product();
