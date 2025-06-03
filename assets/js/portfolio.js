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

  // Project data for modal (add all your projects here)
  const projectData = {
    "branding-zeta": {
      slides: [
        "assets/web/branding/b0.jpg",
        "assets/web/branding/b1.webp",
        "assets/web/branding/b2.webp",
        "assets/web/branding/b3.webp",
        "assets/web/branding/b4.webp",
        "assets/web/branding/b5.webp"
      ],
      details: `
        <h4>Brand Identity for Zeta</h4>
        <p><strong>Client:</strong> Zeta Corp</p>
        <p><strong>Category:</strong> Branding</p>
        <p>Developed a complete visual identity, including logo, colors, and corporate collateral.</p>
      `
    },
    // Add more projects here, e.g.:
    // "product-urban": { slides: [...], details: `...` }
  };

  // Modal logic
  const modal = document.getElementById('portfolio-modal');
  const modalContent = modal.querySelector('.portfolio-modal-content');
  const modalSliderContainer = modal.querySelector('.portfolio-modal-slider-container');
  const modalDetails = modal.querySelector('.portfolio-modal-details');
  let modalSwiper = null;

  document.querySelectorAll('.dive-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const projectKey = btn.getAttribute('data-project');
      const data = projectData[projectKey];
      if (!data) return;

      // Build Swiper HTML
      let slidesHtml = data.slides.map(src =>
        `<div class="swiper-slide"><img src="${src}" alt=""></div>`
      ).join('');
      modalSliderContainer.innerHTML = `
        <div class="swiper portfolio-modal-swiper">
          <div class="swiper-wrapper">${slidesHtml}</div>
          <div class="swiper-button-prev custom-arrow"></div>
          <div class="swiper-button-next custom-arrow"></div>
          <div class="swiper-pagination"></div>
        </div>
      `;
      modalDetails.innerHTML = data.details;

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Init Swiper
      setTimeout(() => {
        if (modalSwiper) modalSwiper.destroy();
        modalSwiper = new Swiper('.portfolio-modal-swiper', {
          loop: true,
          speed: 600,
          navigation: {
            nextEl: '.portfolio-modal-swiper .swiper-button-next',
            prevEl: '.portfolio-modal-swiper .swiper-button-prev'
          },
          pagination: { el: '.portfolio-modal-swiper .swiper-pagination', clickable: true },
          autoplay: false,
          effect: 'fade'
        });
      }, 50);
    });
  });

  // Close modal
  modal.querySelector('.portfolio-modal-close').onclick = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalSliderContainer.innerHTML = '';
    modalDetails.innerHTML = '';
    if (modalSwiper) { modalSwiper.destroy(); modalSwiper = null; }
  };
  // Close on overlay click
  modal.onclick = function(e) {
    if (e.target === modal) modal.querySelector('.portfolio-modal-close').onclick();
  };
});