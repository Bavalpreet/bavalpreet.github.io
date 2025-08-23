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

  // Live development environment stats
  const activityEl = document.getElementById('activity');
  const blogEl = document.getElementById('blog-count');

  const loadActivity = async () => {
    if (!activityEl) return;
    try {
      const res = await fetch('https://api.github.com/users/bavalpreet/events');
      if (!res.ok) throw new Error('network');
      const events = await res.json();
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      let commits = 0;
      for (const ev of events) {
        if (ev.type === 'PushEvent' && new Date(ev.created_at).getTime() > cutoff) {
          commits += ev.payload.commits.length;
        }
      }
      activityEl.textContent = `${commits} commits`;
      localStorage.setItem('activity', activityEl.textContent);
    } catch (err) {
      const cached = localStorage.getItem('activity');
      activityEl.textContent = cached || '--';
    }
  };

  const loadBlogCount = async () => {
    if (!blogEl) return;
    try {
      const url = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@bavalpreetsinghh&count=1000';
      const res = await fetch(url);
      if (!res.ok) throw new Error('network');
      const data = await res.json();
      const count = Array.isArray(data.items) ? data.items.length : 0;
      blogEl.textContent = count;
      localStorage.setItem('blog-count', count);
    } catch (err) {
      const cached = localStorage.getItem('blog-count');
      blogEl.textContent = cached || '--';
    }
  };

  loadActivity();
  loadBlogCount();
});

