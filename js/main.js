// ── Custom Cursor (desktop only) ──
if (window.matchMedia('(pointer: fine)').matches) {
  const cur = document.querySelector('.cursor');
  const ring = document.querySelector('.cursor-ring');
  if (cur && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let cursorReady = false;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
      if (!cursorReady) {
        cursorReady = true;
        rx = mx; ry = my;
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        cur.classList.add('ready');
        ring.classList.add('ready');
      }
    });
    (function tick() {
      rx += (mx - rx) * 0.1; ry += (my - ry) * 0.1;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a, button, .rcard, .ocard, .g-item').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('expanded'));
      el.addEventListener('mouseleave', () => ring.classList.remove('expanded'));
    });
  }
}

// ── Nav scroll ──
const nav = document.querySelector('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile hamburger menu ──
const burger = document.querySelector('.nav-burger');
const overlay = document.querySelector('.nav-overlay');
if (burger && overlay) {
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const delay = +(e.target.dataset.delay || 0) * 120;
      setTimeout(() => e.target.classList.add('in'), delay);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => obs.observe(el));
}

// ── Stagger children of [data-stagger] ──
document.querySelectorAll('[data-stagger]').forEach(group => {
  const kids = Array.from(group.children);
  kids.forEach(k => { k.style.opacity = '0'; k.style.transform = 'translateY(20px)'; });
  const obs2 = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    kids.forEach((k, i) => {
      const delay = i * 80;
      k.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
      setTimeout(() => { k.style.opacity = '1'; k.style.transform = 'none'; }, 50);
    });
    obs2.unobserve(group);
  }, { threshold: 0.08 });
  obs2.observe(group);
});

// ── Parallax hero ──
const heroBg = document.querySelector('.obj-hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.22}px)`;
  }, { passive: true });
}

// ── Animated counters ──
document.querySelectorAll('[data-count]').forEach(el => {
  const target = +el.dataset.count;
  const obs3 = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const start = performance.now();
    const dur = 1400;
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = p < 1 ? Math.round(ease * target) : target;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    obs3.unobserve(el);
  }, { threshold: 0.5 });
  obs3.observe(el);
});

// ── Typed coords ──
document.querySelectorAll('.coords[data-text]').forEach(el => {
  const text = el.dataset.text;
  el.textContent = '';
  const obs4 = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    let i = 0;
    const type = () => { if (i <= text.length) { el.textContent = text.slice(0, i++); setTimeout(type, 38); } };
    type();
    obs4.unobserve(el);
  }, { threshold: 0.5 });
  obs4.observe(el);
});

// ── Page transitions ──
const veil = document.querySelector('.veil');
if (veil) {
  document.querySelectorAll('a[data-t]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript')) return;
      e.preventDefault();
      veil.classList.add('enter');
      setTimeout(() => { window.location.href = href; }, 520);
    });
  });
  window.addEventListener('pageshow', () => {
    veil.classList.remove('enter');
    veil.classList.add('leave');
    setTimeout(() => veil.classList.remove('leave'), 600);
  });
}

// ── Gallery items fade-in ──
document.querySelectorAll('.g-item').forEach((item, i) => {
  item.style.opacity = '0';
  item.style.transform = 'scale(0.97)';
  const obs5 = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const delay = i * 70;
    item.style.transition = `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`;
    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'none'; }, 30);
    obs5.unobserve(item);
  }, { threshold: 0.15 });
  obs5.observe(item);
});
