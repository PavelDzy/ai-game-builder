import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { content, games } from './content.js';
import { renderMain, renderNav } from './render.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (reduce) root.classList.add('no-motion');

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------------- Язык: ?lang → сохранённый выбор → EN ---------------- */
const store = {
  get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
  set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* приватный режим */ } },
};
const qLang = new URLSearchParams(location.search).get('lang');
const lang = ['en', 'ru'].includes(qLang) ? qLang : (['en', 'ru'].includes(store.get('lang')) ? store.get('lang') : 'en');
if (qLang) store.set('lang', lang);
const t = content[lang];
root.lang = lang;
document.title = t.meta.title;
$('meta[name="description"]').content = t.meta.desc;

// Телефон / экономия трафика → облегчённые видео и постеры
const conn = navigator.connection || {};
const small = window.matchMedia('(max-width: 820px)').matches || conn.saveData === true || /(^|-)2g$/.test(conn.effectiveType || '');

/* ---------------- Рендер ---------------- */
const nav = renderNav(t);
$('.nav__links').innerHTML = nav.links;
$('.nav__lang').innerHTML = nav.sw;
$('.nav__cta span').textContent = nav.cta;
$('.menu').innerHTML = nav.menu;
$('main').innerHTML = renderMain(t, small);
$('.player__newtab').title = t.player.newtab;
$('.player__newtab').setAttribute('aria-label', t.player.newtab);
$('.player__btn[data-close]').setAttribute('aria-label', t.player.close);

// Смена языка без потери позиции: запоминаем ближайшую секцию
$$('[data-lang]').forEach((a) => a.addEventListener('click', (e) => {
  e.preventDefault();
  const to = a.dataset.lang;
  if (to === lang) return;
  store.set('lang', to);
  const sec = $$('main > section[id]').filter((s) => s.getBoundingClientRect().top < innerHeight / 2).pop();
  const url = new URL(location.href);
  url.searchParams.set('lang', to);
  url.hash = sec ? sec.id : '';
  location.href = url.toString();
}));

/* ---------------- Превью-петли: грузятся и играют только на экране ---------------- */
const previewIO = new IntersectionObserver((entries) => entries.forEach(({ target: v, isIntersecting }) => {
  if (isIntersecting) {
    if (!v.getAttribute('src')) v.src = v.dataset.src;
    v.play().then(() => v.classList.add('is-on')).catch(() => {});
  } else v.pause();
}), { threshold: 0.35 });
if (!reduce && !conn.saveData) $$('.proj__preview').forEach((v) => previewIO.observe(v));

/* ---------------- Плавный скролл ---------------- */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ duration: 1.15, easing: (x) => Math.min(1, 1.001 - Math.pow(2, -10 * x)), touchMultiplier: 1.4 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    const target = id === '#top' ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { offset: id === '#top' ? 0 : -40, duration: 1.4 });
    else if (id === '#top') window.scrollTo({ top: 0 });
    else target.scrollIntoView();
  });
});

/* ---------------- Мобильное меню ---------------- */
const burger = $('.nav__burger');
const menu = $('.menu');
function closeMenu() {
  if (!menu.classList.contains('is-open')) return;
  menu.classList.remove('is-open');
  menu.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  lenis?.start();
}
burger.addEventListener('click', () => {
  if (menu.classList.contains('is-open')) return closeMenu();
  menu.classList.add('is-open');
  menu.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  lenis?.stop();
  gsap.fromTo($$('a', menu), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'expo.out', delay: 0.15 });
});

/* ---------------- Навигация ---------------- */
const navEl = $('.nav');
let lastY = 0;
const onScroll = (y) => {
  navEl.classList.toggle('is-scrolled', y > 40);
  navEl.classList.toggle('is-hidden', y > 300 && y > lastY && !menu.classList.contains('is-open'));
  lastY = y;
};
if (lenis) lenis.on('scroll', ({ scroll }) => onScroll(scroll));
else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

$$('.nav__links a').forEach((a) => {
  const sec = $(a.getAttribute('href'));
  if (!sec) return;
  ScrollTrigger.create({ trigger: sec, start: 'top 50%', end: 'bottom 50%', onToggle: (self) => a.classList.toggle('is-active', self.isActive) });
});
gsap.to('.progress i', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

/* ---------------- Курсор ---------------- */
if (finePointer && !reduce) {
  const cursor = $('.cursor');
  const label = $('.cursor__label');
  const dx = gsap.quickTo('.cursor__dot', 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo('.cursor__dot', 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo('.cursor__ring', 'x', { duration: 0.45, ease: 'power3' });
  const ry = gsap.quickTo('.cursor__ring', 'y', { duration: 0.45, ease: 'power3' });
  window.addEventListener('pointermove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.addEventListener('pointerover', (e) => {
    const media = e.target.closest('.proj__media');
    const link = e.target.closest('a, button, [data-copy]');
    cursor.classList.toggle('is-play', !!media);
    cursor.classList.toggle('is-link', !media && !!link);
    label.textContent = media ? (lang === 'ru' ? 'Видео' : 'Watch') : '';
  });
  document.addEventListener('pointerleave', () => gsap.to(cursor, { opacity: 0, duration: 0.2 }));
  document.addEventListener('pointerenter', () => gsap.to(cursor, { opacity: 1, duration: 0.2 }));
}

/* ---------------- Магнитные кнопки ---------------- */
if (finePointer && !reduce) {
  $$('.magnetic').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}

$$('.xcard, .forge, .council').forEach((c) => c.addEventListener('pointermove', (e) => {
  const r = c.getBoundingClientRect();
  c.style.setProperty('--mx', `${e.clientX - r.left}px`);
  c.style.setProperty('--my', `${e.clientY - r.top}px`);
}));

if (finePointer && !reduce) {
  const portrait = $('.portrait');
  const pX = gsap.quickTo(portrait, 'rotationY', { duration: 1.2, ease: 'power3' });
  const pY = gsap.quickTo(portrait, 'rotationX', { duration: 1.2, ease: 'power3' });
  gsap.set(portrait, { transformPerspective: 900 });
  $('.hero').addEventListener('pointermove', (e) => {
    pX((e.clientX / innerWidth - 0.5) * 14);
    pY(-(e.clientY / innerHeight - 0.5) * 10);
  });
}

/* ---------------- Искры в hero ---------------- */
function sparks() {
  const canvas = $('.hero__sparks');
  const ctx = canvas.getContext('2d');
  let w, h, parts = [], running = true, mx = 0, my = 0;
  const colors = ['255,170,80', '255,138,31', '180,140,255', '139,61,255', '255,220,170'];
  const spawn = (any) => ({
    x: Math.random() * w, y: any ? Math.random() * h : h + 10, z: Math.random() * 0.9 + 0.1, r: Math.random() * 1.6 + 0.4,
    vy: Math.random() * 0.25 + 0.05, vx: (Math.random() - 0.5) * 0.12, t: Math.random() * Math.PI * 2, c: colors[(Math.random() * colors.length) | 0],
  });
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: Math.round(Math.min(small ? 70 : 160, (w * h) / 9000)) }, () => spawn(true));
  };
  const draw = () => {
    if (!running) return;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y -= p.vy * (0.5 + p.z); p.x += p.vx; p.t += 0.03;
      if (p.y < -10) Object.assign(p, spawn(false));
      const a = (0.35 + Math.sin(p.t) * 0.3) * p.z + 0.1;
      const x = p.x + mx * 30 * p.z, y = p.y + my * 20 * p.z;
      ctx.beginPath(); ctx.fillStyle = `rgba(${p.c},${a})`; ctx.arc(x, y, p.r * (0.6 + p.z), 0, Math.PI * 2); ctx.fill();
      if (p.r > 1.7 && p.z > 0.7) {
        ctx.strokeStyle = `rgba(${p.c},${a * 0.6})`; ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(x - 6, y); ctx.lineTo(x + 6, y); ctx.moveTo(x, y - 6); ctx.lineTo(x, y + 6); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  };
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  new IntersectionObserver(([en]) => { const was = running; running = en.isIntersecting; if (running && !was) draw(); }).observe(canvas);
  if (reduce) { running = false; return; }
  draw();
}
sparks();

/* ---------------- Анимации ---------------- */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  if (reduce) return tl;
  $$('.hero__line').forEach((line) => {
    const mask = document.createElement('span');
    mask.style.cssText = 'display:block;overflow:hidden;padding-bottom:.1em;margin-bottom:-.1em';
    line.parentNode.insertBefore(mask, line); mask.appendChild(line);
  });
  tl.from('.hero__line', { yPercent: 115, rotate: 4, duration: 1.4, stagger: 0.12 })
    .from('.hero__eyebrow', { y: 20, opacity: 0, duration: 1 }, 0.1)
    .from('.portrait', { scale: 0.82, opacity: 0, duration: 1.6 }, 0.05)
    .from('.chip', { y: 30, opacity: 0, duration: 1.1, stagger: 0.12 }, 0.6)
    .from('.hero__sub', { y: 30, opacity: 0, duration: 1.1 }, 0.45)
    .from('.hero__actions > *', { y: 24, opacity: 0, duration: 1, stagger: 0.08 }, 0.65)
    .from('.nav', { opacity: 0, duration: 1 }, 0.4) // не transform: у .nav CSS-transition на transform (скрытие при скролле)
    .from('.hero__scroll', { opacity: 0, duration: 1 }, 1);
  return tl;
}

function scrollAnimations() {
  if (reduce) return;
  $$('.split').forEach((el) => {
    SplitText.create(el, {
      type: 'lines,words', mask: 'lines', linesClass: 'line', autoSplit: true,
      onSplit: (self) => gsap.from(self.words, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.05, scrollTrigger: { trigger: el, start: 'top 85%', once: true } }),
    });
  });
  $$('.scrub-words').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'word' });
    gsap.to(split.words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 45%', scrub: 0.6 } });
  });
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  ScrollTrigger.batch('.reveal-card', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 70, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.09, overwrite: true }),
  });
  ScrollTrigger.batch('.reveal-row', {
    start: 'top 92%', once: true,
    onEnter: (els) => gsap.fromTo(els, { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
  $$('[data-count]').forEach((el) => {
    const end = +el.dataset.count;
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, { v: end, duration: 1.8, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(obj.v)), scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  // Схема процесса: шаги загораются по очереди
  const steps = $$('.flow__step');
  if (steps.length) {
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.flow', start: 'top 78%', once: true } });
    steps.forEach((s, i) => {
      tl.from(s, { y: 24, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' }, i * 0.12).add(() => s.classList.add('is-on'), i * 0.12 + 0.25);
    });
  }
  ScrollTrigger.batch('.criteria li', {
    start: 'top 92%', once: true,
    onEnter: (els) => els.forEach((li, i) => setTimeout(() => li.classList.add('is-on'), i * 90)),
  });
  gsap.to('.hero__text', { yPercent: -18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__media', { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.fromTo('.contact__title', { scale: 0.92 }, { scale: 1, transformOrigin: 'left bottom', ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'top 30%', scrub: true } });
  gsap.fromTo('.contact__glow', { opacity: 0.2, scale: 0.7 }, { opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'center center', scrub: true } });
}

/* ---------------- Копирование почты ---------------- */
$$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
  const s = $('small', b);
  try { await navigator.clipboard.writeText(b.dataset.copy); s.textContent = b.dataset.done; }
  catch { location.href = `mailto:${b.dataset.copy}`; return; }
  b.classList.add('is-done');
  setTimeout(() => { s.textContent = b.dataset.idle; b.classList.remove('is-done'); }, 2000);
}));

/* ---------------- Плеер: видео геймплея и playable-демо ---------------- */
const player = $('.player');
const device = $('.player__device', player);
const frame = $('iframe', player);
const video = $('.player__video', player);
let lastFocus = null;

function openPlayer(slug, kind) {
  const g = games.find((x) => x.slug === slug);
  if (!g) return;
  const c = g[lang];
  const isVideo = kind === 'video';
  lastFocus = document.activeElement;
  $('.player__loading b', player).textContent = isVideo ? t.loading.video : t.loading.demo;
  $('.player__title', player).textContent = c.title;
  $('.player__genre', player).textContent = `${c.genre} · ${isVideo ? g.duration : t.games.labels.play}`;
  $('.player__hint', player).textContent = isVideo ? t.player.videoHint : t.player.demoHint;
  const url = isVideo ? `video/${small ? `${slug}-m` : slug}.mp4` : `games/${slug}/index.html`;
  $('.player__newtab', player).href = url;
  frame.hidden = isVideo; video.hidden = !isVideo;
  device.classList.remove('is-ready');
  player.hidden = false;
  player.style.setProperty('--bar-w', `${device.getBoundingClientRect().width}px`);
  if (isVideo) {
    video.poster = `img/games/${small ? `${slug}-m` : slug}.webp`;
    video.src = url;
    video.play().catch(() => { /* без жеста автозапуск со звуком может быть заблокирован — есть controls */ });
  } else frame.src = url;
  $$('.proj__preview').forEach((v) => v.pause());
  lenis?.stop();
  document.body.style.overflow = 'hidden';
  if (!reduce) {
    gsap.fromTo('.player__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo('.player__wrap', { y: 60, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' });
  }
  $('[data-close].player__btn', player).focus();
}

function closePlayer() {
  if (player.hidden) return;
  const done = () => {
    player.hidden = true;
    frame.src = 'about:blank';
    video.pause(); video.removeAttribute('src'); video.load();
    lenis?.start();
    document.body.style.overflow = '';
    lastFocus?.focus?.({ preventScroll: true });
  };
  if (reduce) return done();
  gsap.to('.player__wrap', { y: 40, opacity: 0, duration: 0.35, ease: 'power2.in' });
  gsap.to('.player__backdrop', { opacity: 0, duration: 0.35, onComplete: done });
}

frame.addEventListener('load', () => {
  if (frame.src === 'about:blank' || frame.hidden) return;
  device.classList.add('is-ready');
  frame.focus();
  try { frame.contentWindow.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePlayer(); }); } catch { /* другой origin */ }
});
video.addEventListener('loadeddata', () => device.classList.add('is-ready'));
$('main').addEventListener('click', (e) => {
  const v = e.target.closest('[data-video]');
  const d = e.target.closest('[data-demo]');
  if (v) openPlayer(v.dataset.video, 'video');
  else if (d) openPlayer(d.dataset.demo, 'demo');
});
$$('[data-close]', player).forEach((el) => el.addEventListener('click', closePlayer));
addEventListener('keydown', (e) => { if (e.key === 'Escape') { closePlayer(); closeMenu(); } });
addEventListener('resize', () => { if (!player.hidden) player.style.setProperty('--bar-w', `${device.getBoundingClientRect().width}px`); });

/* ---------------- Прелоадер и старт ---------------- */
async function start() {
  const loader = $('.loader');
  const jump = () => { if (location.hash && $(location.hash)) (lenis ? lenis.scrollTo($(location.hash), { immediate: true, offset: -40 }) : $(location.hash).scrollIntoView()); };
  if (reduce) { loader.remove(); scrollAnimations(); jump(); return; }
  const count = $('.loader__count');
  const counter = { v: 0 };
  const ready = Promise.all([
    document.fonts?.ready,
    new Promise((r) => { const img = $('.portrait img'); img.complete ? r() : (img.onload = img.onerror = r); }),
  ]);
  lenis?.stop();
  const quick = !!qLang; // при смене языка — короткий прелоадер
  await Promise.all([
    gsap.to(counter, { v: 100, duration: quick ? 0.3 : 1.0, ease: 'power2.inOut', onUpdate: () => (count.textContent = Math.round(counter.v)) }),
    gsap.to('.loader__bar i', { scaleX: 1, duration: quick ? 0.3 : 1.0, ease: 'power2.inOut' }),
    ready,
  ]);
  const intro = heroIntro().pause();
  gsap.timeline()
    .to('.loader__inner', { y: -30, opacity: 0, duration: 0.3, ease: 'power2.in' })
    .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.8, ease: 'expo.inOut' })
    .add(() => intro.play(), '-=0.5')
    .add(() => { loader.remove(); lenis?.start(); jump(); });
  scrollAnimations();
  ScrollTrigger.refresh();
}
start();
