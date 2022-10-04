'use strict';

const header = document.querySelector('.header');
///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//btn open modals
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies to improve functionality and analytics. <button class='btn btn-close-cookie'>Got it</button>`;
header.prepend(message);
// header.append(message.cloneNode(true));

header.before(message);
// header.after(message.cloneNode(true));

document.querySelector('.btn-close-cookie').addEventListener('click', function(e){
  message.remove();
  // message.parentElement.removeChild(message);
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('.section--1');

btnScrollTo.addEventListener('click', function(e){
  const scroll1 = e.target.getBoundingClientRect();
  console.log(scroll1);

  console.log('current Map', scrollX, scrollY);
  console.log('client Map', document.documentElement.clientHeight, document.documentElement.clientWidth);
})