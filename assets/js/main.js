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
  const commitCountEl = document.getElementById('commit-count');
  const commitLabelEl = document.getElementById('commit-label');
  const blogEl = document.getElementById('blog-count');

  const flapCommitStats = (total, last24) => {
    if (!commitCountEl || !commitLabelEl) return;
    const states = [
      { count: total, label: 'Total commits' },
      { count: last24, label: 'Commits last 24h' }
    ];
    let i = 0;
    const render = () => {
      const s = states[i];
      commitCountEl.textContent = s.count;
      commitLabelEl.textContent = s.label;
      i = (i + 1) % states.length;
    };
    render();
    setInterval(render, 3000);
  };

  const loadCommitStats = async () => {
    if (!commitCountEl || !commitLabelEl) return;
    try {
      const eventsRes = await fetch('https://api.github.com/users/bavalpreet/events');
      if (!eventsRes.ok) throw new Error('network');
      const events = await eventsRes.json();
      const cutoff = Date.now() - 24 * 60 * 60 * 1000;
      let last24 = 0;
      for (const ev of events) {
        if (ev.type === 'PushEvent' && new Date(ev.created_at).getTime() > cutoff) {
          last24 += ev.payload.commits.length;
        }
      }

      let total = 0;
      const totalRes = await fetch('https://api.github.com/search/commits?q=author:bavalpreet', {
        headers: { Accept: 'application/vnd.github.cloak-preview' }
      });
      if (totalRes.ok) {
        const totalData = await totalRes.json();
        total = totalData.total_count || 0;
      }

      flapCommitStats(total, last24);
      localStorage.setItem('commit-stats', JSON.stringify({ total, last24 }));
    } catch (err) {
      const cached = localStorage.getItem('commit-stats');
      if (cached) {
        const { total = 0, last24 = 0 } = JSON.parse(cached);
        flapCommitStats(total, last24);
      } else {
        flapCommitStats(0, 0);
      }
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
      blogEl.textContent = cached || '0';
    }
  };

  loadCommitStats();
  loadBlogCount();
});

