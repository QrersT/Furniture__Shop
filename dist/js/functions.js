"use strict";
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage = "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

function autoSpollers() {
  const spollersArray = document.querySelectorAll("[data-spollers]");
  if (spollersArray.length > 0) {
    //отримання звичайних спойлерів(без медіа запитів)
    const spollersRegular = Array.from(spollersArray).filter((item, index, self) => {
      return !item.dataset.spollers.split(",")[0];
    });
    if (spollersRegular.length > 0) {
      initSpollers(spollersRegular);
    }

    //отримання спойлерів з медіа запитами
    const spollersMedia = Array.from(spollersArray).filter((item, index, self) => {
      return item.dataset.spollers.split(",")[0];
    });

    //ініціфлізація спойлерів з медіа запросами
    if (spollersMedia.length > 0) {
      const breakpointsArray = [];
      spollersMedia.forEach((item) => {
        const params = item.dataset.spollers;
        const breakpoint = {};
        const paramsArray = params.split(",");
        breakpoint.value = paramsArray[0];
        breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
        breakpoint.item = item;
        breakpointsArray.push(breakpoint);
      });

      //отримуєму унікальні брекпоінти(щоб врахувати повтори)
      let mediaQueries = breakpointsArray.map(function (item) {
        return `(${item.type}-width: ${item.value}px),${item.value},${item.type}`;
      });

      //повертаємо унікальне значення(будуть тільки унікальі значення без
      //повторів)
      mediaQueries = mediaQueries.filter(function (item, index, self) {
        return self.indexOf(item) === index;
      });
      //робота з кожним брейкпоінтом
      mediaQueries.forEach((breakpoint) => {
        const paramsArray = breakpoint.split(",");
        const mediaBreakpoint = paramsArray[1];
        const mediaType = paramsArray[2];
        const matchMedia = window.matchMedia(paramsArray[0]);

        //об'єкти з потрібними властивостями(перевірка)
        const spollersArray = breakpointsArray.filter(function (item) {
          if (item.value === mediaBreakpoint && item.type === mediaType) {
            return true;
          }
        });

        //івент
        matchMedia.addEventListener("change", () => {
          initSpollers(spollersArray, matchMedia);
        });
        initSpollers(spollersArray, matchMedia); //просто запускаємо функцію,
        //щоб вона запустилася після загрузки сторінки
      });
    }
    //ініціалізація функції

    function initSpollers(spollersArray, matchMedia = false) {
      spollersArray.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("_init");
          initSpollerBody(spollersBlock);
          spollersBlock.addEventListener("click", setSpollerAction);
        } else {
          spollersBlock.classList.remove("_init");
          initSpollerBody(spollersBlock, false);
          spollersBlock.removeEventListener("click", setSpollerAction);
        }
      });
    }
    //-----------------------------------------------------------------
    //Робота з контентом

    function initSpollerBody(spollersBlock, hideSpollerBody = true) {
      const spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
      if (spollerTitles.length > 0) {
        spollerTitles.forEach((spollerTitle) => {
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
          }
          //видимість спойлерів(visibility: hidden)
          if (!spollerTitle.classList.contains("_active")) {
            spollerTitle.nextElementSibling.hidden = true;
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }
    function setSpollerAction(e) {
      const el = e.target;
      if (el.hasAttribute("data-spoller") || el.closest("[data-spoller]")) {
        const spollerTitle = el.hasAttribute("data-spoller") ? el : el.closest("[data-spoller]");
        const spollersBlock = spollerTitle.closest("[data-spollers]");
        const oneSpoller = spollersBlock.hasAttribute("data-one-spoller") ? true : false;
        if (!spollersBlock.querySelectorAll("._slide").length) {
          if (oneSpoller && !spollerTitle.classList.contains("_active")) {
            hideSpollersBody(spollersBlock);
          }
          spollerTitle.classList.toggle("_active");
          _slideToggle(spollerTitle.nextElementSibling, 300); //тут вказати швидкість відкривання/закривання
        }
        e.preventDefault();
      }
    }

    function hideSpollersBody(spollersBlock) {
      const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._active");
      if (spollerActiveTitle) {
        spollerActiveTitle.classList.remove("_active");
        _slideUp(spollerActiveTitle.nextElementSibling, 300); //тут вказати швидкість відкривання/закривання
      }
    }
  }

  //-----------------------------------------------------------------

  let _slideUp = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = target.offsetHeight + "px";
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.hidden = true;
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };

  let _slideDown = (target, duration = 500) => {
    if (!target.classList.contains("_slide")) {
      target.classList.add("_slide");
      if (target.hidden) {
        target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + "ms";
      target.style.height = height + "px";
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        target.classList.remove("_slide");
      }, duration);
    }
  };

  let _slideToggle = (target, duration = 500) => {
    if (target.hidden) {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  };
}
autoSpollers();
//-----------------------------------------------------------------
function openCloseBurger() {
  const menuBtn = document.querySelector(".menu__icon");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      document.body.classList.toggle("_locked");
      menuBtn.classList.toggle("_active");
      //-----------------------------------------------------------------
      document.querySelector(".menu__body").classList.toggle("_active");
    });
  }
}
openCloseBurger();
//------------------------------------------------------------------
/* function changePositionOfBlock() {
  //wrapper of block that we need to move
  const parentOriginal = document.querySelector(".main-slider__content");
  //wrapper of block where we need to move it
  const parent = document.querySelector(".slider-main__body");
  //block itself
  const item = document.querySelector(".content__block_item");
  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  function moovePosition() {
    if (viewportWidth <= 992) {
      console.log("dfsdf");
      if (!item.classList.contains("done")) {
        parent.insertBefore(item, parent.children[5]);
        item.classList.add("done");
      }
    } else {
      if (item.classList.contains("done")) {
        parentOriginal.insertBefore(item, parentOriginal.children[5]);
        item.classList.remove("done");
      }
    }
  }
  //-----------------------------------------------------------------
  moovePosition();

  window.addEventListener("resize", (e) => {
    moovePosition();
  });
}
changePositionOfBlock(); */
//-----------------------------------------------------------------
//Додавання елементів в корзину
function addToCart(productButton, productId) {
  if (!productButton.classList.contains("_hold")) {
    productButton.classList.add("_hold");
    productButton.classList.add("_fly");

    const cart = document.querySelector(".cart-header__icon");
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const productImage = product.querySelector(".item-product__image");

    const productImageFly = productImage.cloneNode(true);

    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlytop = productImage.getBoundingClientRect().top;
    const productImageFlyleft = productImage.getBoundingClientRect().left;

    productImageFly.classList.add("_flyImage");
    productImageFly.style.cssText = `
    left: ${productImageFlyleft}px;
    top: ${productImageFlytop}px;
    width: ${productImageFlyWidth}px;
    height:${productImageFlyHeight}px;
    `;
    document.body.append(productImageFly);

    const cartFlyLeft = cart.getBoundingClientRect().left;
    const cartFlyTop = cart.getBoundingClientRect().top;

    productImageFly.style.cssText = `
    width: 0px;
    height: 0px;
    left: ${cartFlyLeft}px;
    top: ${cartFlyTop}px;
    
    opacity: 0;
    `;

    setTimeout(() => {
      if (productButton.classList.contains("_fly")) {
        productImageFly.remove();
        updateCart(productButton, productId);
        productButton.classList.remove("_fly");
      }
    }, 1000);
  }
}

function closeCart() {
  const cartBody = document.querySelector(".cart-header__body");
  cartBody.classList.remove("_active");
}

function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector(".cart-header");
  const cartIcon = cart.querySelector(".cart-header__icon");
  const cartQuantity = cartIcon.querySelector("span");
  /* const cardProduct = document.querySelector(`[data-pid="${productId}"]`); */
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
  const cartList = document.querySelector(".cart-header__list");

  //додавання в корзину
  if (productAdd) {
    const noItemsCart = document.querySelector(".cart-header__no-items");
    if (noItemsCart) {
      noItemsCart.classList.remove("_active");
    }
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentElement("beforeend", "<span>1</span>");
    }

    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const cartProductImage = product.querySelector(".item-product__image").innerHTML;
      const cartProductTitle = product.querySelector(".item-product__title").innerHTML;

      const cartProductContent = `
            <a href="" class="cart-list__image">${cartProductImage}</a>
            <div class="cart-list__body">
                <a href="" class="cart-list__title">${cartProductTitle}</a>
                <div class="cart-list__quantity">Quantity: <span>1</span></div>
                <a href="" class="cart-list__delete">Delete</a>
            </div>`;
      cartList.insertAdjacentHTML("beforeend", `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
    } else {
      const cartProductQuantity = cartProduct.querySelector("span");
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
    }

    //після всій дій
    productButton.classList.remove("_hold");
  } else {
    const cartProductQuantity = cartProduct.querySelector(".cart-list__quantity span");
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const noItemsCart = document.querySelector(".cart-header__no-items");
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
    cartQuantity.innerHTML = --cartQuantity.innerHTML;

    if (cartProductQuantity.innerHTML == 0) {
      cartProductQuantity.closest(".cart-list__item").remove();
    }
    if (!document.querySelector(".cart-header__list").hasChildNodes()) {
      noItemsCart.classList.add("_active");
      console.log(true);
    }
  }
}
