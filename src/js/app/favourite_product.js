export function favourite_product() {
  const likeBtns = document.querySelectorAll(".actions-product__link._icon-favorite");
  /*  const favouriteBtn = document.querySelector("..header ._icon-favorite:hover::before"); */

  /*   favouriteBtn.addEventListener("click", () => {}); */

  likeBtns.forEach((item) =>
    addEventListener("click", (e) => {
      e.preventDefault();
    })
  );

  /*  console.log(213); */
}

/* import { favourite_product } from "../js/app/favourite_product.js";
const a = "fg"; */
