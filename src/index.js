import "@/styles/index.scss";

import ProductModule from "./productModule.js";

// Your code here
document.addEventListener("DOMContentLoaded", function () {
  const productModule = new ProductModule();

  // Attach the fetch functionality to the button click event
  document
    .getElementById("fetch-json")
    .addEventListener("click", productModule.debouncedFetch);
});
