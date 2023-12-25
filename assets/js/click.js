  const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        faq.addEventListener('click', () => {
            faq.classList.toggle('open');
            const h4 = faq.querySelector('h4');

            // CHANGE ICON
            const icon = faq.querySelector('.faq__icon i');

            if (icon.className === 'fa-sharp fa-solid fa-plus') {
                icon.className = "fa-sharp fa-solid fa-minus";
                h4.style.borderBottom = "2px solid #00d664";
                h4.style.textAlign = "center";
                faq.style.backgroundColor = "black";
                console.log("Button Clicked");

            } else {
                icon.className = "fa-sharp fa-solid fa-plus";
                h4.style.borderBottom = "none";
                h4.style.textAlign = "";
                faq.style.backgroundColor = "";
                
            }
        })
    })


  document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector("#navbar");
    const menuBtn = document.querySelector("#open-menu-btn");
    const closeBtn = document.querySelector("#close-menu-btn");
  
    menuBtn.addEventListener('click', () => {
      menu.style.display = "flex"
      closeBtn.style.display = "inline-block";
      menuBtn.style.display = "none";
    });
  
    closeBtn.addEventListener('click', () => {
      menu.style.display = "none";
      closeBtn.style.display = "none";
      menuBtn.style.display = "inline-block";
    });
  
    console.log("Contact script file linked successfully!");
  });


  const countElements = document.querySelectorAll('.count');

const animateCount = (element) => {
  const endValue = parseInt(element.dataset.counterEnd);
  const duration = 500; // Duration in milliseconds

  let startValue = 0;
  let startTime = null;
  let animationFrameId = null;

  const updateCount = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;

    const currentValue = Math.round((endValue / duration) * progress);
    element.textContent = currentValue;

    if (progress < duration) {
      animationFrameId = requestAnimationFrame(updateCount);
    } else {
      element.textContent = endValue;
    }
  };

  const randomDelay = Math.random() * 5000; // Random delay between 0 and 5 seconds

  setTimeout(() => {
    requestAnimationFrame(updateCount);
  }, randomDelay);
};

countElements.forEach((element) => {
  animateCount(element);

  // Repeat animation every 5 seconds
  setInterval(() => {
    animateCount(element);
  }, 5000);
});



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



