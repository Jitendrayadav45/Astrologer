/**
 * सभी contact / WhatsApp / phone यहाँ बदलें — एक जगह।
 */
var SITE = {
  brand: 'Astrologer Pandit Sachin Sharma',
  email: 'PanditRam@Astrology.com',
  whatsapp: 'https://wa.me/917851957845',
  phoneDisplay: '7851-957845',
  phoneTel: '+917851957845',
};

(function () {
  'use strict';

  function initLoader() {
    var loader = document.getElementById('loader');
    var textEl = document.querySelector('.loader-text');
    if (textEl && SITE.brand) {
      textEl.textContent = SITE.brand;
    }
    setTimeout(function () {
      if (loader) {
        loader.style.display = 'none';
      }
    }, 1000);
  }

  function initAos() {
    if (typeof AOS === 'undefined') {
      return;
    }
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  function initStorySwiper() {
    if (typeof Swiper === 'undefined') {
      return;
    }
    if (!document.querySelector('.story-slider-container')) {
      return;
    }
    new Swiper('.story-slider-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
      },
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var id = this.getAttribute('href');
        if (!id || id === '#') {
          return;
        }
        var target = document.querySelector(id);
        if (!target) {
          return;
        }
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initNavScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) {
      return;
    }
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) {
      return;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = String(fd.get('name') || '').trim();
      var phone = String(fd.get('phone') || '').trim();
      var userEmail = String(fd.get('email') || '').trim();
      var service = String(fd.get('service') || '').trim();
      var message = String(fd.get('message') || '').trim();
      var subject = encodeURIComponent('Consultation request');
      var body = encodeURIComponent(
        'Name: ' +
          name +
          '\nEmail: ' +
          userEmail +
          '\nPhone: ' +
          phone +
          '\nService: ' +
          service +
          '\n\n' +
          message
      );
      window.location.href =
        'mailto:' + SITE.email + '?subject=' + subject + '&body=' + body;
    });
  }

  function initCustomScrollSpy() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    if (!sections.length || !navLinks.length) return;

    function updateActiveNav() {
      var scrollPosition = window.scrollY + 200; // Deep offset for fixed nav buffer
      var isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);
      var currentSectionId = null;

      // Detect current section via standard layout calculations
      sections.forEach(function (section) {
        if (
          section.offsetTop <= scrollPosition &&
          (section.offsetTop + section.offsetHeight) > scrollPosition
        ) {
          currentSectionId = section.getAttribute('id');
        }
      });

      // Edge case: If user hit the absolute bottom of the document, force the last section to active
      if (isAtBottom) {
        currentSectionId = sections[sections.length - 1].getAttribute('id');
      }

      // Apply the active state precisely
      if (currentSectionId) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
          }
        });
      }
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    
    // Evaluate initial state once DOM fully renders the heights
    setTimeout(updateActiveNav, 150);
  }

  function onReady() {
    initSmoothScroll();
    initNavScroll();
    initAos();
    initStorySwiper();
    initContactForm();
    initCustomScrollSpy();
  }

  onReady();
  window.addEventListener('load', initLoader);
})();
