"use strict";
//check if window is touch screen
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

window.onload = function () {
  document.addEventListener("click", documentActions);

  //Actions (Делигування івентов)
  function documentActions(e) {
    const targetElement = e.target;
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
    let media768 = window.matchMedia("(min-width: 768px)");
    let media991 = window.matchMedia("(min-width: 991px)");

    if (media768.matches) {
      Array.from(document.querySelectorAll(".menu__sub-list")).forEach((item) => {
        item.removeAttribute("hidden");
      });
    }
    if (!media991.matches) {
      const searchBtn = document.querySelector(".search-header__form_icon");
      if (targetElement === searchBtn) {
        searchHeader.classList.toggle("_active");
      } else if (targetElement !== searchBtn && targetElement !== inputForm && targetElement !== searchFormBtn) {
        searchHeader.classList.remove("_active");
      }
    }
  }
  documentActions(" ");

  //positioning menu burger
  function openCloseMenuBurger() {
    const menuBtn = document.querySelector(".menu__icon");
    const menuBody = document.querySelector(".menu__body");
    menuBtn.addEventListener("click", () => {
      menuBody.classList.toggle("_active");
    });
  }
  openCloseMenuBurger();
};
