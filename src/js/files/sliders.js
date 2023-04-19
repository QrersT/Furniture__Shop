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

const swiper2 = new Swiper(".training-slider", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 3,
  watchOverflow: false,
  spaceBetween: 25,
  centerSlide: true,
  fade: true,
  grabCursor: true,
  dynamicBullets: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    prevEl: ".training-slider-control.swiper-button-prev",
    nextEl: ".training-slider-control.swiper-button-next",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
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
    991: {
      spaceBetween: 0,
    },
  },
});

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
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
  },
});
