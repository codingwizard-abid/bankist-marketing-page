"use strict";

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const header = document.querySelector(".header");
///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const nav = document.querySelector(".nav");

const openModal = function (e) {
   e.preventDefault();
   modal.classList.remove("hidden");
   overlay.classList.remove("hidden");
};

const closeModal = function () {
   modal.classList.add("hidden");
   overlay.classList.add("hidden");
};

//btn open modals
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
   if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
   }
});

// sticky header
// const initialsCoords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//    if (window.scrollY > initialsCoords.top) nav.classList.add("sticky");
//    else nav.classList.remove("sticky");
// });

// smooth scorlling
btnScrollTo.addEventListener("click", function (e) {
   // console.log(e.target.getBoundingClientRect());
   // console.log('client height x/y', document.documentElement.clientHeight, document.documentElement.clientWidth);
   // const scroll1 = section1.getBoundingClientRect();
   // window.scrollTo({
   //   left: scroll1.left + window.scrollX,
   //   top:scroll1.top + window.scrollY,
   //   behavior: "smooth",
   // });
   // window.scrollTo(scroll1.left + window.scrollX, scroll1.top + window.scrollY);

   // this works fine and easy
   section1.scrollIntoView({ behavior: "smooth" });
});

// document.querySelectorAll('.nav__link').forEach((el)=>{
//    el.addEventListener('click', function(e){
//       e.preventDefault();
//       const id = this.getAttribute('href');
//       document.querySelector(id).scrollIntoView({behavior: "smooth"})
//    })
// })

document.querySelector(".nav__links").addEventListener("click", function (e) {
   e.preventDefault();
   console.log(e.target);
   if (e.target.classList.contains("nav__link")) {
      console.log(e.target.href);
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
   }
});

// mouse handle
const handleHover = function (e, opacity) {
   if (e.target.classList.contains("nav__link")) {
      const link = e.target;
      const siblings = link.closest(".nav").querySelectorAll(".nav__link");
      siblings.forEach((el) => {
         if (el !== link) el.style.opacity = opacity;
      });
   }
};

// menu opacity
nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));

nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// header
const message = document.createElement("div");
message.classList.add("cookie-message");
message.innerHTML = `We use cookies to improve functionality and analytics. <button class='btn btn-close-cookie'>Got it</button>`;
// header.prepend(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message.cloneNode(true));
// header.after(message);

// document
//    .querySelector(".btn-close-cookie")
//    .addEventListener("click", function (e) {
//       message.remove();
//       // message.parentElement.removeChild(message);
//    });

// const highlights = document.querySelectorAll('.highlight');

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabContents = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
   const clicked = e.target.closest(".operations__tab");
   console.log(clicked);
   if (!clicked) return;
   tabs.forEach((f) => f.classList.remove("operations__tab--active"));
   clicked.classList.add("operations__tab--active");

   //others remove
   tabContents.forEach((f) =>
      f.classList.remove("operations__content--active")
   );
   // content appearencs
   document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
});

// header navigation
const stickyNav = function (entries) {
   const [entry] = entries;
   if (!entry.isIntersecting) nav.classList.add("sticky");
   else nav.classList.remove("sticky");
};

const headerObs = new IntersectionObserver(stickyNav, {
   root: null,
   threshold: 0,
});

headerObs.observe(header);

// revealing section as we apporoach

const allSections = document.querySelectorAll(".section");
const revealSections = function (entries, observer) {
   const [entry] = entries;
   if (!entry.isIntersecting) return;
   entry.target.classList.remove("section--hidden");
   observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSections, {
   root: null,
   threshold: 0.15,
});

allSections.forEach((section) => {
   sectionObserver.observe(section);
   // section.classList.add('section--hidden');
});

// lazy loaiding images

const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
   const [entry] = entries;
   if (!entry.isIntersecting) return;
   entry.target.src = entry.target.dataset.src;
   entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
   });
   observer.unobserve(entry.target);
};
const imgObserve = new IntersectionObserver(loadImg, {
   root: null,
   threshold: 0,
   rootMargin: "-200px",
});

imgTargets.forEach((img) => imgObserve.observe(img));

// slider
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

const slides = document.querySelectorAll(".slide");
let curSlide = 0;
const maxSlides = slides.length;

const createDots = function () {
   slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
         "beforeend",
         `<button class="dots__dot" data-slide="${i}"></button>`
      );
   });
};
createDots();

const activeteDot = function(slide){
   document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
   document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};
activeteDot(0)
const goToSlide = function (slide) {
   slides.forEach((c, i) => {
      c.style.transform = `translateX(${100 * (i - slide)}%)`;
   });
};
goToSlide(0);

const nextSlide = function () {
   if (curSlide === maxSlides - 1) {
      curSlide = 0;
   } else {
      curSlide++;
   }
   goToSlide(curSlide);
   activeteDot(curSlide)
};
const prevSlide = function () {
   if (curSlide == 0) {
      curSlide = maxSlides - 1;
   } else {
      curSlide--;
   }
   goToSlide(curSlide);
   activeteDot(curSlide)
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", function (e) {
   if (e.key === "ArrowLeft") prevSlide();
   e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener('click', function(e){
   if(e.target.classList.contains('dots__dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activeteDot(slide)
   };
});