"use strict";
const productContainer = document.querySelector("main");
fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    showProducts(data);
  });

function showProducts(productsArr) {
  // console.log("productsArr", productsArr);
  productContainer.innerHTML = "";
  productsArr.forEach((product) => {
    console.log("product", product.id);

    productContainer.innerHTML += `<article class="smallProduct${product.soldout ? " soldOut" : ""} ${product.discount ? " discounted" : ""}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="product image" />
        <p class="soldoutTxt color_me_black_and_red">SOLD OUT</p>

        <h3>${product.productdisplayname}</h3>
        <p class="subtle">${product.articletype} | ${product.brandname}</p>
        <p class="price">DKK <span>${product.price}</span>,-</p>
        <div class="discounted_element">
          <p>Now DKK <span>${Math.ceil((product.price / 100) * product.discount)}</span>,-</p>
          <p class="color_me_red"><span>${product.discount}</span>%</p>
        </div>
        <a href="product.html?id=${product.id}"}>Read More</a>
      </article>`;
  });
}
