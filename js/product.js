const params = new URLSearchParams(window.location.search);
const id = params.get("id");

document.querySelector(".back_btn").addEventListener("click", goBack)
function goBack() {
    history.back();
}
const productContainer = document.querySelector("#productContainer");
fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = ` <figure>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="Produktbillede" class="productImage">
            <span class="saleLabel${data.discount ? "" : ""}">Udsalg!</span>
        </figure>
        <section class="productDetails">
            <h2 class="productName">${data.productdisplayname}</h2>
            <div>
                <p class="articleType"><span class="bold">Type:</span> ${data.articletype}</p>
                <p class="productCategory"><span class="bold">Kategori:</span> ${data.category}</p>
                <p class="productPrice"><span class="bold">Pris:</span> ${data.price}</p>
            </div>
            <button class="buyButton">Køb nu</button>
        </section>
        `;
  });
