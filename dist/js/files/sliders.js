if (document.querySelector(".slider-main__body")) {
  const swiperFirst = new Swiper(".slider-main__body", {
    effect: `slide`,
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 32,
    watchOverflow: true,
    speed: 300,
    loop: true,
    loopedSlides: 1,
    loopAditionalSlides: 5,
    preloadImages: false,
    parralax: true,
    initialSlide: 1,
    //Dotts
    pagination: {
      el: ".controls-slider-main__dotts",
      clickable: true,
    },

    //Arrows
    navigation: {
      nextEl: ".slider-arrow_next",
      prevEl: ".slider-arrow_prev",
    },
    breakpoints: {
      /* 0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      }, */
      992: {
        spaceBetween: 32,
      },
      991: {
        spaceBetween: 0,
      },
    },
  });
}

/* if (document.querySelector(".slider-rooms__body")) {
  const swiperFirst = new Swiper(".slider-rooms__body", {
    slidesPerView: 1,
    loopedSlides: 1,
    loop: true,
    effect: `slide`,
    speed: 300,
    spaceBetween: 24,
    observer: true,
    observeParents: true,

    watchOverflow: true,

    loopAditionalSlides: 1,
    preloadImages: false,
    parralax: true,
    initialSlide: 1,

    //Dotts
    pagination: {
      el: ".slider-rooms__dotts",
      clickable: true,
    },

    //Arrows
    navigation: {
      nextEl: ".slider-rooms .slider-arrow_next",
      prevEl: ".slider-rooms .slider-arrow_prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
      992: {
        spaceBetween: 32,
      },
      991: {
        spaceBetween: 0,
      },
    },
  });
}
 */
if (document.querySelector(".mySwiper")) {
  var swiper = new Swiper(".mySwiper", {
    effect: "slide",
    grabCursor: true,
    loop: true,
    /* centeredSlides: true, */
    spaceBetween: 24,
    slidesPerView: 1,

    pagination: {
      el: ".swiper-pagination",
    },
  });
}

if (document.querySelector(".slider-tips__body")) {
  var swiper = new Swiper(".slider-tips__body", {
    effect: "slide",
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    spaceBetween: 24,
    slidesPerView: 1,

    pagination: {
      el: ".swiper-pagination",
    },
  });
}
