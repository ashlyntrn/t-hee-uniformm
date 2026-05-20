document.addEventListener('DOMContentLoaded', function () {

  // ─── 1. MOBILE NAVIGATION ───────────────────────────────────
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      navbar.classList.toggle('nav-open');
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navbar) navbar.classList.remove('nav-open');
    });
  });

  document.addEventListener('click', function (e) {
    if (navbar && !navbar.contains(e.target)) {
      navbar.classList.remove('nav-open');
    }
  });

  // ─── 2. ACTIVE NAV LINK ─────────────────────────────────────
  const currentPath = window.location.pathname;
  const currentFile = currentPath.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const linkFile = link.getAttribute('href');
    link.classList.remove('active');

    const isHome = (currentFile === '' || currentFile === 'index.html') && linkFile === 'index.html';
    const isMatch = linkFile === currentFile;

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });

  // ─── 3. FAQ ACCORDION (index.html) ──────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      // Close all items
      faqItems.forEach(function (other) {
        other.classList.remove('open');
      });

      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // ─── 4. PRODUCT FILTER (products.html) ──────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Show/hide cards
      productCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ─── 5. SCROLL ANIMATIONS ────────────────────────────────────
  const animatedEls = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window && animatedEls.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    animatedEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ─── 6. NAVBAR SCROLL SHADOW ────────────────────────────────
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

});
