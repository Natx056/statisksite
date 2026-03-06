const categoryContainer = document.querySelector("#categorylist");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryContainer.innerHTML += `<a href="productlist.html?category=${category.category}">${category.category}</a>`;
    });
  });