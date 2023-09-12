const customObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const customHiddenElements = document.querySelectorAll('.hidden');
customHiddenElements.forEach((el) => customObserver.observe(el));




const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.flexy1.hidden');
hiddenElements.forEach((el) => observer.observe(el));





// Hamburger menu code hide and show navbar

document.addEventListener('DOMContentLoaded', function() {
  const menu = document.querySelector("#navbar");
  const menuBtn = document.querySelector("#open-menu-btn");
  const closeBtn = document.querySelector("#close-menu-btn");

  menuBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    menuBtn.style.display = "none";
  });

  closeBtn.addEventListener('click', () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    menuBtn.style.display = "inline-block";
  });
});
// Hamburger menu code hide and show navbar end

console.log("Script file linked successfully!");

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});




