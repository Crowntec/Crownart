document.addEventListener('DOMContentLoaded', function() {
  // Animate on scroll
  AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });

  // Swiper sliders for each project
  document.querySelectorAll('.portfolio-swiper').forEach(function(swiperEl) {
    new Swiper(swiperEl, {
      loop: true,
      speed: 600,
      pagination: { el: swiperEl.querySelector('.swiper-pagination'), clickable: true },
      autoplay: { delay: 4000, disableOnInteraction: false },
      effect: 'fade'
    });
  });

  // Swiper slider for portfolio details
  document.querySelectorAll('.portfolio-details-slider').forEach(function(swiperEl) {
    new Swiper(swiperEl, {
      loop: true,
      speed: 600,
      navigation: {
        nextEl: swiperEl.querySelector('.swiper-button-next'),
        prevEl: swiperEl.querySelector('.swiper-button-prev')
      },
      pagination: { el: swiperEl.querySelector('.swiper-pagination'), clickable: true },
      autoplay: false, // No auto-slide
      effect: 'fade'
    });
  });

  // Portfolio category filter
  const buttons = document.querySelectorAll('.portfolio-categories button');
  const items = document.querySelectorAll('.portfolio-item');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      buttons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const filter = this.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.classList.add('aos-animate');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Portfolio lightbox
  GLightbox({ selector: '.portfolio-lightbox' });

  // Contact form feedback (optional, if using Formspree)
  const form = document.querySelector('.php-email-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const sentMessage = form.querySelector('.sent-message');
      loading.style.display = 'block';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
    });
  }
});