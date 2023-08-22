export function popGallery() {
  const gallery = document.querySelector("._pop-gallery");
  const imgCollection = gallery.querySelectorAll("img");

  /* function showImg(img) {
    console.log(img.closest(".row-furniture__item"));
  } */

  imgCollection.forEach((item) => {
    const closeItem = item.closest(".row-furniture__item");
    const img = `${item.outerHTML}`;
    const popWrapper = closeItem.querySelector("._pop-gallery__wrapper");
    closeItem.innerHTML = `<div class="_pop-gallery__wrapper">${img}</div>`;

    closeItem.addEventListener("click", (e) => {
      e.preventDefault();
    });

    closeItem.addEventListener("click", (e) => {
      e.preventDefault();
      const popWrapper = closeItem.querySelector("._pop-gallery__wrapper");
      popWrapper.classList.toggle("_active");
    });
  });
}
