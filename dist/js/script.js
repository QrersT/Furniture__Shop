"use strict";
import { favourite_product } from "../js/app/favourite_product.js";
const a = "fg";
const b = "fdfs";

//check if window is touch screens
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

window.onload = function () {
  document.addEventListener("click", documentActions);

  //Actions (Делигування івентов)
  function documentActions(e) {
    const targetElement = e.target;
    const noUndefined = targetElement !== undefined;
    const searchBtn = document.querySelector(".search-header__form_icon");
    const searchHeader = document.querySelector(".search-header");
    const inputForm = document.querySelector(".search-header__input");
    const searchFormBtn = document.querySelector(".search-header__form_btn");

    if (window.innerWidth > 768 && isTouchDevice() && targetElement !== undefined) {
      if (targetElement.classList.contains("menu__arrow")) {
        targetElement.closest(".menu__item").classList.toggle("_hover");
      }
      if (!targetElement.closest(".menu__item") && document.querySelectorAll(".menu__item._hover")) {
        Array.from(document.querySelectorAll(".menu__item")).forEach((item) => {
          item.classList.remove("_hover");
        });
      }
    }
    //-----------------------------------------------------------------
    //Робота з JSON
    if (typeof targetElement !== "undefined" && targetElement.classList.contains("products__more")) {
      getProducts(targetElement);
      e.preventDefault();
      favourite_product();
    }
    //-----------------------------------------------------------------
    //hidden remove
    let media768 = window.matchMedia("(min-width: 768px)");
    let media991 = window.matchMedia("(min-width: 991px)");

    if (media768.matches) {
      Array.from(document.querySelectorAll(".menu__sub-list")).forEach((item) => {
        item.removeAttribute("hidden");
      });
    }
    if (!media991.matches) {
      if (targetElement === searchBtn) {
        searchHeader.classList.toggle("_active");
      } else if (targetElement !== searchBtn && targetElement !== inputForm && targetElement !== searchFormBtn) {
        searchHeader.classList.remove("_active");
      }
    }
    if (noUndefined && targetElement.classList.contains("actions-product__button")) {
      const productId = targetElement.closest(".item-product").dataset.pid;
      addToCart(targetElement, productId);
      e.preventDefault();
    }

    if (noUndefined && !targetElement.classList.contains("cart-header__icon") && !targetElement.closest(".cart-header__body") && !targetElement.classList.contains("actions-product__button")) {
      closeCart();
    }

    if (noUndefined && targetElement.classList.contains("cart-list__delete")) {
      e.preventDefault();
    }
    //-----------------------------------------------------------------
    //видалення з корзини
    if (noUndefined && targetElement.classList.contains("cart-list__delete")) {
      const productId = targetElement.closest(".cart-list__item").dataset.cartPid;
      updateCart(targetElement, productId, false);
      e.preventDefault();
    }
  }
  documentActions(" ");

  //positioning menu burger
  /* function openCloseMenuBurger() {
    const menuBtn = document.querySelector(".menu__icon");
    const menuBody = document.querySelector(".menu__body");
    menuBtn.addEventListener("click", () => {
      menuBody.classList.toggle("_active");
    });
  }
  openCloseMenuBurger(); */

  function addClassActiveOn970px() {
    const footerBody = document.querySelector(".body-footer");
    const spollersArr = Array.from(footerBody.querySelectorAll("[data-spoller]"));
    const matchMedia = window.matchMedia("(min-width: 768px)");
    if (matchMedia.matches) {
      spollersArr.forEach((item) => {
        item.nextElementSibling.removeAttribute("hidden");
      });
    } else {
      spollersArr.forEach((item) => {
        /* item.classList.remove("_active"); */
      });
    }
  }
  addClassActiveOn970px();

  //-----------------------------------------------------------------
  //header
  function header() {
    const header = document.querySelector(".header");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            header.classList.add("hidden");
            console.log(1);
          } else {
            header.classList.remove("hidden");
            console.log(2);
          }
        });
      },
      {
        threshold: 0,
      }
    );

    observer.observe(header);
  }
  /* header(); */

  /*   const headerElement = document.querySelector(".header");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("true");
        } else {
          console.log("false");
        }
      });
    },
    { threshold: 0 }
  );
  observer.observe(headerElement); */
  /* const headerElement = document.querySelector(".header");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log(true);
      } else {
        console.log(false);
      }
    });
  }, {});
  observer.observe(headerElement); */

  const headerElement = document.querySelector(".header");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        headerElement.classList.remove("_scroll");
      } else {
        headerElement.classList.add("_scroll");
      }
    });
  }, {});
  observer.observe(headerElement);

  //Load more products
  async function getProducts(button) {
    if (!button.classList.contains("_hold")) {
      button.classList.add("_hold");
      const file = "json/products.json";
      let response = await fetch(file, { method: "GET" });

      if (response.ok) {
        let result = await response.json();
        loadProducts(result);
        button.classList.remove("_hold");
        button.remove();
      } else alert("Error");
    }
  }

  function loadProducts(data) {
    const productsitems = document.querySelector(".products__items");
    data.products.forEach((item) => {
      const productId = item.id;
      const productUrl = item.url;
      const productImage = item.image;
      const productTitle = item.title;
      const productText = item.text;
      const productPrice = item.price;
      const productOldPrice = item.priceOld;
      const productShareUrl = item.shareUrl;
      const productLikeUrl = item.likeUrl;
      const productLabels = item.labels;

      function labelFunc() {
        //виводить лейбли
        let answer = "";
        if (productLabels !== "") {
          if (productLabels === undefined) {
            return Error;
          } else {
            productLabels.forEach((label) => {
              let labelOne = `<div class="item-product__label item-product__label_${label.type}">${label.value}</div>`;
              answer += labelOne;
            });
          }
        }
        return answer;
      }

      let productTemplate = `<article data-pid="${productId}" class="products-item item-product">
      <div class="item-product__labels">
      ${labelFunc()}
      </div>
      <a href="${productUrl}" class="item-product__image  ">
          <img src="img/products/${productImage}" alt="">
      </a>
      <div class="item-product__body">
          <div class="item-product__content">
              <h4 class="item-product__title">${productTitle}</h4>
              <div class="item-product__text">${productText}</div>
              <div class="item-product__prices">
                  <div class="item-product__price">${productPrice}</div>
                  <div class="item-product__price _item-product__price_old">${productOldPrice}</div>
              </div>
          </div>
          <div class="item-product__actions actions-product">
              <div class="actions-product__body">
                  <a href="" class="actions-product__button btn btn_white">Add to cart</a>
                  <div class="actions-product__links">
                      <a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
                      <a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
                  </div>
              </div>
          </div>
      </div>
  </article>`;
      productsitems.insertAdjacentHTML("beforeend", productTemplate);
    });
  }

  //-----------------------------------------------------------------
  //відкриття корзини при кліку
  function openCart(value) {
    const cart = document.querySelector(".cart-header__icon");
    const cartBody = document.querySelector(".cart-header__body");

    if (value === "close") {
      cartBody.classList.remove("_active");
    } else {
      cart.addEventListener("click", (e) => {
        e.preventDefault();
        if (cartBody.classList.contains("_active")) {
          cartBody.classList.remove("_active");
        } else if (!cartBody.classList.contains("_active")) {
          cartBody.classList.add("_active");
        }
      });
    }
  }
  openCart();
  //-----------------------------------------------------------------
  //furnirure Gallery

  const furniture = document.querySelector(".furniture__body");
  if (furniture && !isTouchDevice()) {
    const furnitureItems = furniture.querySelector(".furniture__items");
    const furnitureColumns = furniture.querySelectorAll(".furniture__row");
    const speed = furniture.dataset.speed;
    let possitionX = 0;
    let coordXPercent = 0;

    function setMouseGalleryStyle() {
      let furnitureItemsWidths = 0;
      furnitureColumns.forEach((column) => {
        furnitureItemsWidths += column.offsetWidth;
      });

      const furnitureDifferent = furnitureItemsWidths - furniture.offsetWidth;
      const distX = Math.floor(coordXPercent - possitionX);

      possitionX = possitionX + distX * speed;
      let possition = (furnitureDifferent / 200) * possitionX;

      furnitureItems.style.cssText = `transform: translate3d(${possition}px,0,0);`;

      if (Math.abs(distX) > 0) {
        requestAnimationFrame(setMouseGalleryStyle);
      } else {
        furniture.classList.remove("_init");
      }
    }

    furniture.addEventListener("mousemove", (e) => {
      //отримання ширини
      const furnitureWidth = furniture.offsetWidth;
      //Нуль по середині
      const coordX = e.pageX - furnitureWidth / 2;
      //отримуємо відсотки
      coordXPercent = (coordX / furnitureWidth) * 200;

      if (!furniture.classList.contains("_init")) {
        requestAnimationFrame(setMouseGalleryStyle);
        furniture.classList.add("_init");
      }
    });
  }

  //-----------------------------------------------------------------
};

alert("Працює тільки додавання товарів до кошику");
