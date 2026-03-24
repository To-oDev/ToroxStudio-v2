// Torox Studio - Mobile Menu Logic

export function initMobileMenu() {
  const burger = document.getElementById('burger-menu');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (!burger || !navLinks) return;

  burger.addEventListener('click', () => {
    const isExpanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isExpanded);
    navLinks.setAttribute('aria-hidden', isExpanded);
    
    burger.classList.toggle('active');
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close menu when clicking a link
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
    });
  });

  // Close menu on resize if screen becomes large
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      burger.classList.remove('active');
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'false'); // Visible on desktop
    }
  });
}
