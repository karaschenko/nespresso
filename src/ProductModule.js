import { debounce } from "./helpers.js";

export default class ProductModule {
  constructor() {
    this.usedIds = new Set();
    this.firstFetch = true;
    this.debouncedFetch = debounce(this.fetchRandomProduct, 1000);
  }

  fetchRandomProduct = () => {
    let id;
    do {
      id = Math.floor(Math.random() * 50) + 1;
    } while (this.usedIds.has(id));
    this.usedIds.add(id);

    const url = `https://dummyjson.com/products/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (this.firstFetch) {
          this.showCoffeeSpecs();
          this.firstFetch = false;
        }
        let formattedData = "";
        Object.entries(data).forEach(([key, value]) => {
          if (key === "images") {
            formattedData += `<div class="responce-key images"><strong>${key}:</strong><br>`;
            value.forEach((image) => {
              formattedData += `<img src="${image}" alt="Product Image"><br>`;
            });
            formattedData += "</div>";
          } else {
            formattedData += `<div class="responce-key">${key}: ${value}<br></div>`;
          }
        });
        document.getElementById("fetched-data").innerHTML = formattedData;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  showCoffeeSpecs() {
    document.querySelector(".coffee-specs").style.display = "block";
  }
}
