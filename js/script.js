// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
const hamberger = document.querySelector("#hamberger-menu");

// when clicked hamburger menu
hamberger.addEventListener("click", function (e) {
  e.preventDefault();
  navbarNav.classList.toggle("active");
});

// Klik bebas
document.addEventListener("click", function (e) {
  if (!hamberger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// ===== CAROUSEL SECTION =====
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-button.prev");
  const nextBtn = document.querySelector(".carousel-button.next");

  let items = Array.from(track.children);
  let currentSlide = 0;
  let itemsPerSlide = getItemsPerSlide();
  let totalSlides = Math.ceil(items.length / itemsPerSlide);

  function getItemsPerSlide() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    return 3;
  }

  function updateButtons() {
    prevBtn.style.display = currentSlide === 0 ? "none" : "block";
    nextBtn.style.display = currentSlide >= totalSlides - 1 ? "none" : "block";
  }

  function updateCarousel() {
    const itemWidth = items[0].getBoundingClientRect().width;
    itemsPerSlide = getItemsPerSlide();
    totalSlides = Math.ceil(items.length / itemsPerSlide);

    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

    const moveX = currentSlide * itemWidth * itemsPerSlide;
    track.style.transform = `translateX(-${moveX}px)`;

    updateButtons();
  }

  function refreshItems() {
    items = Array.from(track.children);
  }

  if (track && prevBtn && nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    window.addEventListener("resize", () => {
      refreshItems();
      updateCarousel();
    });

    // Inisialisasi pertama kali
    updateCarousel();
  }
});
