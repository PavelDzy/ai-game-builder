// Разметка секций из content.js. Язык выбирается до рендера (см. main.js).
import { games } from './content.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const arrow = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>';
const down = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>';
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>';
const head = (num, title, id) => `<div class="section__head"><span class="section__num">${num}</span><h2 class="section__title split"${id ? ` id="${id}"` : ''}>${title}</h2></div>`;

export function renderMain(t, small) {
  const L = t.games.labels;
  const v = (slug) => (small ? `${slug}-m` : slug);

  const hero = `
  <section class="hero" aria-labelledby="hero-title">
    <canvas class="hero__sparks" aria-hidden="true"></canvas>
    <div class="hero__glow hero__glow--a" aria-hidden="true"></div>
    <div class="hero__glow hero__glow--b" aria-hidden="true"></div>
    <div class="hero__grid container">
      <div class="hero__text">
        <p class="eyebrow hero__eyebrow"><span class="dot"></span> ${t.hero.eyebrow}</p>
        <h1 id="hero-title" class="hero__title hero__title--long">
          <span class="hero__line">${t.hero.l1}</span>
          <span class="hero__line hero__line--accent">${t.hero.l2}</span>
        </h1>
        <p class="hero__sub hero__sub--lead">${t.hero.lead}</p>
        <div class="hero__actions">
          <a class="btn btn--primary magnetic" href="#games"><span>${t.hero.primary}</span>${down}</a>
          <a class="btn btn--link" href="#contact"><span>${t.hero.secondary}</span></a>
        </div>
      </div>
      <div class="hero__media">
        <div class="portrait">
          <div class="portrait__frame"><img src="img/pavel.webp" alt="Pavel Dziubenko" width="900" height="900" fetchpriority="high" /></div>
          <div class="portrait__orbit" aria-hidden="true"></div>
          <div class="chip chip--a" aria-hidden="true"><b>${t.hero.chip[0]}</b><span>${t.hero.chip[1]}</span></div>
        </div>
      </div>
    </div>
    <a class="hero__scroll" href="#games" aria-label="Scroll"><span>Scroll</span><i></i></a>
  </section>

  <section class="stats container">
    ${t.stats.map(([n, s]) => `<div class="stat"><b><span${/^\d+$/.test(n) ? ` data-count="${n}"` : ''}>${n}</span></b><span>${s}</span></div>`).join('')}
  </section>`;

  const projects = `
  <section id="games" class="section work container">
    ${head(t.games.num, t.games.title)}
    <div class="work__intro">
      <h3 class="work__sub reveal">${t.games.sub}</h3>
      <p class="reveal">${t.games.intro}</p>
    </div>
    <div class="projects">
      ${games.map((g, i) => {
        const c = g[t.lang];
        return `
      <article class="proj reveal-card${i % 2 ? ' proj--flip' : ''}" id="game-${g.slug}">
        <button class="proj__media" data-video="${g.slug}" data-verb="${esc(L.watch)}" aria-label="${esc(L.watch)}: ${esc(c.title)}">
          <img src="img/games/${small ? `${g.slug}-m` : g.slug}.webp" alt="" loading="lazy" width="720" height="1280" />
          <video class="proj__preview" data-src="video/${small ? `${g.slug}-preview-m` : `${g.slug}-preview`}.mp4" muted loop playsinline preload="none" aria-hidden="true"></video>
          <span class="game__badge">${g.duration}</span>
          <span class="game__play">${playIcon}</span>
        </button>
        <div class="proj__body">
          <span class="game__genre">${String(i + 1).padStart(2, '0')} · ${c.genre}</span>
          <h3 class="proj__title">${c.title}</h3>
          <p class="proj__mech">${c.mechanic}</p>
          <dl class="proj__facts">
            <div><dt>${L.task}</dt><dd>${c.task}</dd></div>
            <div><dt>${L.role}</dt><dd>${c.role}</dd></div>
            <div><dt>${L.notes}</dt><dd><ul>${c.notes.map((n) => `<li>${n}</li>`).join('')}</ul></dd></div>
          </dl>
          <div class="proj__stack" aria-label="${esc(L.stack)}">${g.stack.map((s) => `<span>${s}</span>`).join('')}</div>
          <div class="proj__actions">
            <button class="btn btn--primary magnetic" data-demo="${g.slug}"><span>${L.play}</span><small>~${String(g.demoMB).replace('.', t.lang === 'ru' ? ',' : '.')} ${L.mb}</small></button>
            <button class="btn btn--ghost magnetic" data-video="${g.slug}"><span>${L.watch} · ${g.duration}</span></button>
          </div>
        </div>
      </article>`;
      }).join('')}
    </div>

  </section>`;

  const W = t.workflow;
  const workflow = `
  <section id="workflow" class="section container">
    ${head(W.num, W.title)}
    <p class="about__statement scrub-words">${W.lead}</p>
    <ol class="flow reveal">
      ${W.steps.map(([a, b], i) => `<li class="flow__step"><i>${i + 1}</i><b>${a}</b><span>${b}</span></li>`).join('')}
    </ol>
  </section>`;

  const B = t.lab;
  const lab = `
  <section id="lab" class="section container">
    ${head(B.num, B.title)}
    <p class="about__statement scrub-words">${B.lead}</p>
    <div class="stats stats--lab">${B.nums.map(([n, s]) => `<div class="stat"><b>${n}</b><span>${s}</span></div>`).join('')}</div>
    <article class="lablink reveal-card">
      <img src="img/games/${small ? 'space-odyssey-m' : 'space-odyssey'}.webp" alt="" loading="lazy" width="720" height="1280" />
      <div>
        <h3>${B.link.title}</h3>
        <p>${B.link.text}</p>
        <a class="btn btn--link" href="#game-space-odyssey"><span>${B.link.cta}</span></a>
      </div>
    </article>
  </section>`;

  const E = t.exp;
  const exp = `
  <section id="experiments" class="section container">
    ${head(E.num, E.title)}
    <p class="work__lead reveal">${E.lead}</p>
    <div class="cards2">
      ${E.items.map((x) => `
      <article class="xcard reveal-card">
        <span class="tag">${x.tag}</span>
        <h3>${x.title}</h3>
        <p>${x.text}</p>
        <ul class="checks">${x.facts.map((f) => `<li>${f}</li>`).join('')}</ul>
      </article>`).join('')}
    </div>
  </section>`;

  const S = t.skills;
  const skills = `
  <section id="skills" class="section container">
    ${head(S.num, S.title)}
    <div class="skills">
      ${S.groups.map(([h, items], i) => `<div class="skills__col reveal-card"><span class="xcard__idx">/0${i + 1}</span><h3>${h}</h3><ul>${items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}
    </div>
  </section>`;

  const G = t.bg;
  const bg = `
  <section id="background" class="section container">
    ${head(G.num, G.title)}
    <ul class="bring bring--compact">${G.items.map(([a, b]) => `<li class="reveal-row"><span>${a}</span>${b}</li>`).join('')}</ul>
  </section>`;

  const C = t.contact;
  const contact = `
  <section id="contact" class="contact">
    <div class="contact__glow" aria-hidden="true"></div>
    <div class="container">
      <p class="eyebrow"><span class="dot"></span> ${C.eyebrow}</p>
      <h2 class="contact__title split">${C.title}</h2>
      <p class="contact__lead reveal">${C.lead}</p>
      <div class="contact__actions reveal">
        <a class="btn btn--primary btn--xl magnetic" href="https://t.me/paveldziu" target="_blank" rel="noopener"><span>${C.tg}</span>${arrow}</a>
        <a class="btn btn--ghost btn--xl magnetic" href="mailto:paveldzy89@gmail.com"><span>${C.mail}</span></a>
      </div>
      <div class="contact__list reveal">
        <div><span>Email</span><button class="copy" data-copy="paveldzy89@gmail.com" data-done="${esc(C.copied)}" data-idle="${esc(C.copy)}">paveldzy89@gmail.com <small>${C.copy}</small></button></div>
        <div><span>Telegram</span><a href="https://t.me/paveldziu" target="_blank" rel="noopener">@paveldziu</a></div>
      </div>
    </div>
    <footer class="footer container">
      <span>${C.footer}</span>
      <a href="#top" class="footer__top">${C.top}</a>
    </footer>
  </section>`;

  return hero + projects + workflow + lab + exp + skills + bg + contact;
}

export function renderNav(t) {
  const links = [['#games', t.nav.games], ['#workflow', t.nav.workflow], ['#lab', t.nav.lab], ['#skills', t.nav.skills]];
  const other = t.lang === 'en' ? 'ru' : 'en';
  const sw = `<div class="lang" role="group" aria-label="Language">
      <a href="?lang=en" data-lang="en"${t.lang === 'en' ? ' aria-current="true"' : ''}>EN</a><a href="?lang=ru" data-lang="ru"${t.lang === 'ru' ? ' aria-current="true"' : ''}>RU</a>
    </div>`;
  return {
    links: links.map(([h, s]) => `<a href="${h}">${s}</a>`).join(''),
    menu: [...links, ['#contact', t.nav.contact]].map(([h, s]) => `<a href="${h}">${s}</a>`).join('') + `<a href="?lang=${other}" data-lang="${other}" class="menu__lang">${other.toUpperCase()}</a>`,
    cta: t.nav.cta,
    sw,
  };
}
