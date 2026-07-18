// FreshFold Laundry - Main JS File

function initAll() {
  // Initialize Theme and Direction
  initThemeAndDirection();

  // Initialize Sticky Header
  initStickyHeader();

  // Initialize Mobile Menu
  initMobileMenu();

  // Initialize Scroll Reveal Observer
  initScrollReveal();

  // Initialize Counters
  initCounters();

  // Initialize FAQ Accordion
  initAccordion();

  // Initialize Testimonial Slider
  initTestimonialSlider();

  // Initialize Back to Top Button
  initBackToTop();

  // Initialize WhatsApp Button / Actions
  initWhatsAppWidget();

  // Initialize Booking Wizard Flow
  initBookingWizard();

  // Initialize Button Ripple Effect
  initButtonRipple();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// ==========================================
// 1. Theme & Direction (LTR/RTL) Manager
// ==========================================
function initThemeAndDirection() {
  const html = document.documentElement;

  // Dark / Light Theme
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcons();
    });
  });

  // LTR / RTL Direction
  const dirToggleBtns = document.querySelectorAll('.dir-toggle-btn');
  const savedDir = localStorage.getItem('dir') || 'ltr';
  html.setAttribute('dir', savedDir);

  dirToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      html.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      updateDirButtonText(newDir);
    });
  });

  // Run initial button text / icon setups
  updateThemeIcons();
  updateDirButtonText(savedDir);
}

function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const moonIcons = document.querySelectorAll('.theme-moon-icon');
  const sunIcons = document.querySelectorAll('.theme-sun-icon');

  if (isDark) {
    moonIcons.forEach(icon => icon.classList.add('hidden'));
    sunIcons.forEach(icon => icon.classList.remove('hidden'));
  } else {
    moonIcons.forEach(icon => icon.classList.remove('hidden'));
    sunIcons.forEach(icon => icon.classList.add('hidden'));
  }
}

function updateDirButtonText(dir) {
  const dirLabels = document.querySelectorAll('.dir-label');
  dirLabels.forEach(label => {
    label.textContent = dir === 'ltr' ? 'RTL' : 'LTR';
  });
}

// ==========================================
// 2. Sticky Header Transparent to Solid
// ==========================================
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const scrollHandler = () => {
    if (window.scrollY > 20) {
      header.classList.add('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-white/95', 'dark:bg-slate-900/95', 'shadow-md', 'backdrop-blur-md');
      header.classList.add('bg-transparent');
    }
  };

  window.addEventListener('scroll', scrollHandler);
  scrollHandler(); // Initial call
}

// ==========================================
// 3. Animated Mobile Menu
// ==========================================
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');

  if (!menuBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    document.body.classList.toggle('overflow-hidden');
  };

  menuBtn.addEventListener('click', toggleMenu);
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }

  // Close when clicking mobile nav links
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    });
  });
}

// ==========================================
// 4. Scroll Reveal (Fade Up, Zoom, etc.)
// ==========================================
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-on-scroll');
  if (items.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  items.forEach(item => observer.observe(item));
}

// ==========================================
// 5. Statistics Counter Animation
// ==========================================
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds animation
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = formatCounterValue(target, counter);
            clearInterval(timer);
          } else {
            counter.textContent = formatCounterValue(Math.floor(current), counter);
          }
        }, stepTime);

        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function formatCounterValue(value, element) {
  const prefix = element.getAttribute('data-prefix') || '';
  const suffix = element.getAttribute('data-suffix') || '';
  return prefix + value.toLocaleString() + suffix;
}

// ==========================================
// 6. Accordion Toggles (FAQ)
// ==========================================
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const activeHeader = document.querySelector('.accordion-header.active-acc');
      const body = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');

      if (activeHeader && activeHeader !== header) {
        activeHeader.classList.remove('active-acc');
        activeHeader.nextElementSibling.style.maxHeight = null;
        const activeIcon = activeHeader.querySelector('.accordion-icon');
        if (activeIcon) activeIcon.style.transform = 'rotate(0deg)';
      }

      header.classList.toggle('active-acc');
      if (header.classList.contains('active-acc')) {
        body.style.maxHeight = body.scrollHeight + 'px';
        if (icon) icon.style.transform = 'rotate(180deg)';
      } else {
        body.style.maxHeight = null;
        if (icon) icon.style.transform = 'rotate(0deg)';
      }
    });
  });
}

// ==========================================
// 7. Testimonials Carousel
// ==========================================
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  if (!track) return;

  const slides = Array.from(track.children);
  if (slides.length === 0) return;

  let currentIndex = 0;

  const updateSlidePosition = () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const directionFactor = isRtl ? 1 : -1;
    const amountToMove = currentIndex * 100 * directionFactor;
    track.style.transform = `translateX(${amountToMove}%)`;
    
    // Update active dots if present
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-primary');
        dot.classList.remove('bg-gray-300', 'dark:bg-slate-700');
      } else {
        dot.classList.remove('bg-primary');
        dot.classList.add('bg-gray-300', 'dark:bg-slate-700');
      }
    });
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
  };

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Set up dot indicators
  const dotsContainer = document.querySelector('.carousel-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot w-3 h-3 rounded-full transition-all duration-300 ${
        index === 0 ? 'bg-primary' : 'bg-gray-300 dark:bg-slate-700'
      }`;
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlidePosition();
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Automatic slide rotation
  let slideInterval = setInterval(nextSlide, 5000);

  const resetInterval = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  };

  if (nextBtn) nextBtn.addEventListener('click', resetInterval);
  if (prevBtn) prevBtn.addEventListener('click', resetInterval);

  // Listen to LTR/RTL updates dynamically to reposition correctly
  const dirObserver = new MutationObserver(() => {
    updateSlidePosition();
  });
  dirObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] });
}

// ==========================================
// 8. Back to Top Button
// ==========================================
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// 9. Floating WhatsApp Widget
// ==========================================
function initWhatsAppWidget() {
  const waBtn = document.getElementById('whatsapp-widget-btn');
  const waBox = document.getElementById('whatsapp-widget-box');
  const waClose = document.getElementById('whatsapp-widget-close');
  const waSend = document.getElementById('whatsapp-widget-send');
  const waInput = document.getElementById('whatsapp-widget-input');

  if (!waBtn) return;

  waBtn.addEventListener('click', () => {
    waBox.classList.toggle('hidden');
    waBox.classList.toggle('flex');
  });

  if (waClose) {
    waClose.addEventListener('click', () => {
      waBox.classList.add('hidden');
      waBox.classList.remove('flex');
    });
  }

  if (waSend) {
    waSend.addEventListener('click', () => {
      const msg = waInput.value.trim();
      if (msg) {
        const encodedMsg = encodeURIComponent(msg);
        window.open(`https://wa.me/15550199?text=${encodedMsg}`, '_blank');
        waInput.value = '';
        waBox.classList.add('hidden');
        waBox.classList.remove('flex');
      }
    });
  }
}

// ==========================================
// 10. Multi-step Booking Flow Wizard
// ==========================================
function initBookingWizard() {
  const openModalBtns = document.querySelectorAll('.open-booking-modal-btn');
  const steps = document.querySelectorAll('.wizard-step');
  const stepIndicators = document.querySelectorAll('.wizard-step-indicator');
  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');
  const form = document.getElementById('booking-wizard-form');

  // Intercept all modal button clicks globally and redirect to booking.html
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If we are on booking.html, do nothing
      if (window.location.pathname.endsWith('booking.html')) {
        return;
      }
      e.preventDefault();
      window.location.href = 'booking.html';
    });
  });

  // If the booking form is not on this page (e.g. on pages other than booking.html), exit
  if (!form) return;

  let currentStep = 0;

  const showStep = (stepIndex) => {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });

    // Update progress bar step states
    stepIndicators.forEach((indicator, index) => {
      if (index <= stepIndex) {
        indicator.classList.add('bg-primary', 'text-white');
        indicator.classList.remove('bg-gray-200', 'text-gray-500', 'dark:bg-slate-700', 'dark:text-slate-400');
      } else {
        indicator.classList.remove('bg-primary', 'text-white');
        indicator.classList.add('bg-gray-200', 'text-gray-500', 'dark:bg-slate-700', 'dark:text-slate-400');
      }
    });

    // Update buttons visibility and labels
    if (prevBtn) {
      if (stepIndex === 0) {
        prevBtn.classList.add('invisible');
      } else {
        prevBtn.classList.remove('invisible');
      }
    }

    if (nextBtn) {
      if (stepIndex === steps.length - 1) {
        nextBtn.textContent = 'Confirm Booking';
      } else {
        nextBtn.textContent = 'Next';
      }
    }
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      } else {
        completeBooking();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  const completeBooking = () => {
    const successContent = document.getElementById('wizard-success-content');
    const wizardFormContent = document.getElementById('wizard-form-content');
    const wizardActions = document.getElementById('wizard-actions');

    if (successContent && wizardFormContent) {
      wizardFormContent.classList.add('hidden');
      if (wizardActions) wizardActions.classList.add('hidden');
      successContent.classList.remove('hidden');
    }
  };

  // Run initial state
  showStep(currentStep);
}

// ==========================================
// 11. Button Ripple Effect
// ==========================================
function initButtonRipple() {
  const rippleButtons = document.querySelectorAll('.ripple-btn');
  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      const left = e.clientX - rect.left - radius;
      const top = e.clientY - rect.top - radius;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${left}px`;
      circle.style.top = `${top}px`;
      circle.classList.add('ripple');

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });
}
