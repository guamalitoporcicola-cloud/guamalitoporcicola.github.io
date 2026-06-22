/* ============================================================
   SCRIPT.JS — [NOMBRE_EMPRESA]
   JavaScript Vanilla — sin dependencias externas
   ------------------------------------------------------------
   Índice:
   1. Header: fondo al hacer scroll
   2. Menú responsive (apertura/cierre)
   3. Cierre de menú al hacer clic en un enlace
   4. Animaciones de aparición al hacer scroll (Intersection Observer)
   5. Galería con efecto Lightbox
   6. Año actual automático en el footer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. HEADER: FONDO AL HACER SCROLL
     ============================================================ */
  const header = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ============================================================
     2. MENÚ RESPONSIVE
     ============================================================ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', toggleMenu);

  /* ============================================================
     3. CERRAR MENÚ AL HACER CLIC EN UN ENLACE (vista móvil)
     ============================================================ */
  const navLinks = mainNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* ============================================================
     4. ANIMACIONES DE APARICIÓN AL HACER SCROLL
     ============================================================ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback para navegadores sin soporte: mostrar todo directamente
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  /* ============================================================
     5. GALERÍA CON LIGHTBOX
     ============================================================ */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  let lastFocusedElement = null;

  function openLightbox(fullSrc, altText) {
    lastFocusedElement = document.activeElement;
    lightboxImg.src = fullSrc;
    lightboxImg.alt = altText || 'Imagen ampliada de la galería';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const fullSrc = item.getAttribute('data-full');
      const img = item.querySelector('img');
      const altText = img ? img.getAttribute('alt') : '';
      openLightbox(fullSrc, altText);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);

  // Cerrar al hacer clic fuera de la imagen
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* ============================================================
     6. AÑO ACTUAL AUTOMÁTICO EN EL FOOTER
     ============================================================ */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
