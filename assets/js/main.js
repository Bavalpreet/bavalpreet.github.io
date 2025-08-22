// Main JavaScript for interactive features

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.body.classList.add('dark');
  }
  if (themeToggle) {
    const setIcon = () => {
      themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    };
    setIcon();
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const mode = document.body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', mode);
      setIcon();
    });
  }

  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      siteNav.classList.toggle('open');
    });
  }

  // Typewriter effect for headline
  const headline = document.getElementById('headline');
  if (headline) {
    const text = headline.dataset.text || '';
    let index = 0;
    const type = () => {
      if (index < text.length) {
        headline.textContent += text.charAt(index);
        index++;
        setTimeout(type, 80);
      }
    };
    type();
  }

  // Reveal cards on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card').forEach((card) => {
    observer.observe(card);
  });
});
