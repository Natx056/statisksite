("use strict");
const params = new URLSearchParams(window.location.search);
let category = params.get("category") || "Apparel";

let theData;
document.querySelector(".ascending").addEventListener("click", klikSorter);
document.querySelector(".descending").addEventListener("click", klikSorter);

function klikSorter(evt) {
  console.log("klik sorter evt", evt.target.dataset.direction);
  console.log("theData", theData);
  if (evt.target.dataset.direction === "descending") {
    theData.sort(function (a, b) {
      return a.price - b.price;
    });
  }
  if (evt.target.dataset.direction === "ascending") {
    theData.sort(function (a, b) {
      return b.price - a.price;
    });
  }
  showProducts(theData);
}

const productContainer = document.querySelector("main");
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}&limit=50`)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      console.log(product.discount);
      if (product.discount) {
        product.realPrice = Math.ceil(product.price - (product.price / 100) * product.discount);
      } else {
        product.realPrice = product.price;
      }
    });

    theData = data;
    // data.sort(function (a, b) {
    //   return a.price - b.price;
    // });

    showProducts(theData);
  });

function showProducts(productsArr) {
  // console.log("productsArr", productsArr);
  productContainer.innerHTML = "";
  productsArr.forEach((product) => {
    console.log("product", product.id);

    productContainer.innerHTML += `<article class="smallProduct${product.soldout ? "soldOut" : ""} ${product.discount ? "discounted" : ""}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
        <p class="soldoutTxt color_me_black_and_red">SOLD OUT</p>
        <h3>${product.productdisplayname}</h3>
        <p class="subtle">${product.articletype} | ${product.brandname}</p>
        <p class="price">DKK <span>${product.price}</span>,-</p>
        <div class="discounted_element">
          <p>Now DKK <span>${Math.ceil(product.price - (product.price / 100) * product.discount)}</span>,-</p>
          <p class="color_me_red"><span>${product.discount}</span>%</p>
        </div>
        <a href="product.html?id=${product.id}"}>Read More</a>
      </article>`;
  });
}
