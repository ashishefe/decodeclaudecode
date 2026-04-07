/* ============================================================
   DECODING CLAUDE CODE — Interactivity
   Scroll reveals, nav highlighting, glossary, loop animation
   ============================================================ */

(function () {
  'use strict';

  // --- Scroll Reveal ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Active Nav Link ---
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '56px'} 0px -40% 0px` }
  );

  sections.forEach((section) => navObserver.observe(section));

  // --- Smooth Scroll for Nav Links ---
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // --- Glossary Accordion ---
  document.querySelectorAll('.glossary-term').forEach((term) => {
    term.addEventListener('click', () => {
      const item = term.closest('.glossary-item');
      const wasOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.glossary-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
      });

      // Toggle clicked item
      if (!wasOpen) {
        item.classList.add('open');
      }
    });

    // Keyboard accessibility
    term.setAttribute('tabindex', '0');
    term.setAttribute('role', 'button');
    term.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        term.click();
      }
    });
  });

  // --- Agentic Loop Animation ---
  const loopDiagram = document.getElementById('loop-diagram');
  if (loopDiagram) {
    const steps = loopDiagram.querySelectorAll('.loop-step');
    let currentStep = 0;
    let loopInterval = null;
    let isAnimating = false;

    function advanceStep() {
      steps.forEach((step) => step.classList.remove('active'));
      steps[currentStep].classList.add('active');
      currentStep = (currentStep + 1) % steps.length;
    }

    function startAnimation() {
      if (isAnimating) return;
      isAnimating = true;
      advanceStep();
      loopInterval = setInterval(advanceStep, 1200);
    }

    function stopAnimation() {
      if (!isAnimating) return;
      isAnimating = false;
      clearInterval(loopInterval);
      // Show all steps at rest
      steps.forEach((step) => step.classList.remove('active'));
      steps.forEach((step) => (step.style.opacity = '1'));
    }

    // Start when diagram scrolls into view
    const loopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset opacity for animation
            steps.forEach((step) => (step.style.opacity = ''));
            startAnimation();
          } else {
            stopAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    loopObserver.observe(loopDiagram.closest('.diagram-container'));
  }

  // --- Hide scroll indicator on scroll ---
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    let hidden = false;
    window.addEventListener(
      'scroll',
      () => {
        if (!hidden && window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
          scrollIndicator.style.transition = 'opacity 0.5s ease';
          hidden = true;
        }
      },
      { passive: true }
    );
  }
})();
