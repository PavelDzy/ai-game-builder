// Весь текст сайта — EN и RU. Правьте здесь; разметку собирает src/render.js.
// Факты сверены с документами проектов на 11.11.2026. Без названий AI-инструментов и моделей и без внутренних наработок студии.

export const games = [
  {
    slug: 'obelisk',
    duration: '1:35',
    demoMB: 12,
    stack: ['Three.js', 'TypeScript', 'Vite', 'WebGL'],
    en: {
      title: 'Obelisk: Monopoly',
      genre: 'Board idle × action roguelite · 3D',
      mechanic: 'Roll the dice to move a hero around a board ringed around an ancient Obelisk — every tile pays out, buildings grow. Then take the hero on expeditions: hordes, skill picks, elite and boss fights. Back home, the board flips into tower defence.',
      task: 'Check whether a calm board economy and an intense combat run can feed each other in one portrait mobile game — in full 3D in the browser.',
      role: 'Concept and source GDD, the “fully 3D” decision, balance calls, task setting, playtests and acceptance. Implementation by AI under my direction.',
      notes: [
        'Board, hero and enemies are real-time 3D models (Three.js), multi-file web build',
        'Stage: the meta loop of one map is complete; visual pass next',
        'Automated playtest 11/11 passed; a playtest with outside players is still pending',
      ],
    },
    ru: {
      title: 'Обелиск: Монополия',
      genre: 'Idle на поле × экшен-рогалик · 3D',
      mechanic: 'Бросаешь кубик — герой идёт по полю вокруг древнего Обелиска, клетки приносят ресурсы, здания растут. Потом герой уходит в поход: орды, выбор навыков, элитные враги и боссы. А дома поле переворачивается в режим обороны.',
      task: 'Проверить, могут ли спокойная экономика на поле и напряжённый боевой забег подпитывать друг друга в одной вертикальной мобильной игре — в полном 3D в браузере.',
      role: 'Концепция и исходный GDD, решение «полностью 3D», решения по балансу, постановка задач, плейтесты и приёмка. Реализация — AI под моим руководством.',
      notes: [
        'Поле, герой и враги — 3D-модели в реальном времени (Three.js), многофайловая веб-сборка',
        'Этап: мета-цикл одной карты готов, дальше визуальный проход',
        'Автоплейтест 11/11 пройден; плейтест со сторонними игроками ещё впереди',
      ],
    },
  },
  {
    slug: 'ball-to-wall',
    duration: '0:49',
    demoMB: 1.5,
    stack: ['TypeScript', 'Vite', 'Canvas 2D', 'Python (pacing sim)'],
    en: {
      title: 'Neon Ricochet',
      genre: 'Idle × arcade defence',
      mechanic: 'Launch neon shapes into the perimeter: they ricochet, generate charge and smash waves of blocks crawling toward the Core. One gesture — tap. Spend charge on Power, Speed, More Shapes and Merge; a boss every fifth wave, a workshop and ten difficulty tiers between runs.',
      task: 'A one-handed portrait game where every upgrade shows its effect in the same frame: a 3–8 minute run plus a meta loop between runs.',
      role: 'Brief (“neon + meta”), design decisions and balance calls, style choice, task setting, playtests and acceptance at every stage. Implementation by AI under my direction.',
      notes: [
        'Deterministic simulation and a balance bot run on 100 seeds; pacing modelled in a Python sim before tuning',
        'Final QA stage passed',
        'Builds prepared for CrazyGames, Poki and Playhop with SDK integration — not published yet',
      ],
    },
    ru: {
      title: 'Неон-Рикошет',
      genre: 'Idle × аркадная оборона',
      mechanic: 'Запускаешь в периметр неоновые фигуры: они рикошетят, копят заряд и крушат волны блоков, ползущих к Ядру. Один жест — тап. Заряд тратится на Мощь, Разгон, новые фигуры и Слияние; босс каждую пятую волну, между забегами — мастерская и десять уровней сложности.',
      task: 'Игра для одной руки в вертикальном кадре, где каждое улучшение видно в том же кадре: забег на 3–8 минут и мета-цикл между забегами.',
      role: 'Бриф («неон + мета»), геймдизайн-решения и баланс, выбор стиля, постановка задач, плейтесты и приёмка на каждом этапе. Реализация — AI под моим руководством.',
      notes: [
        'Детерминированная симуляция и бот баланса на 100 seed; темп смоделирован в Python до настройки',
        'Финальный этап QA пройден',
        'Подготовлены сборки под CrazyGames, Poki и Playhop с интеграцией SDK — пока не опубликованы',
      ],
    },
  },
  {
    slug: 'space-odyssey',
    duration: '2:01',
    demoMB: 10,
    stack: ['TypeScript', 'Vite', 'Canvas 2D', 'Web Audio'],
    en: {
      title: 'Solar Relay',
      genre: 'Cosmic idle',
      mechanic: 'Tap when the impulse crosses the yellow zone to keep the relay going around the Sun. Grow planets, wind and satellites, trigger supernovae and seed life — from microbes with their own mini-game to colonies across the galaxy.',
      task: 'Take a mechanic hypothesis selected in Game Idea Lab all the way to a progression game with a calm, meditative feel.',
      role: 'Choice of the idea in Game Idea Lab, direction and mood (“space, semi-meditative”), design decisions, task setting, playtests and acceptance. Implementation by AI under my direction.',
      notes: [
        'Started as a Game Idea Lab experiment, moved into full production on 1 Nov 2026',
        'Current stage: progression; original music and sound',
        'Builds prepared for CrazyGames, Poki and Yandex Games; ad SDKs tested against mocks only — not published yet',
      ],
    },
    ru: {
      title: 'Солнечная эстафета',
      genre: 'Космический idle',
      mechanic: 'Тапни, когда импульс проходит жёлтую зону, — и эстафета вокруг Солнца продолжается. Растут планеты, ветер и спутники, вспыхивают сверхновые, зарождается жизнь — от микробов со своей мини-игрой до колоний по всей галактике.',
      task: 'Довести механическую гипотезу, отобранную в Game Idea Lab, до игры с прогрессией и спокойным, медитативным ощущением.',
      role: 'Выбор идеи в Game Idea Lab, направление и настроение («космос, полумедитативный вайб»), геймдизайн-решения, постановка задач, плейтесты и приёмка. Реализация — AI под моим руководством.',
      notes: [
        'Начиналась как эксперимент Game Idea Lab, 01.11.2026 ушла в полноценную разработку',
        'Текущий этап: прогрессия; своя музыка и звуки',
        'Подготовлены сборки под CrazyGames, Poki и Яндекс Игры; рекламные SDK проверены только на заглушках — пока не опубликованы',
      ],
    },
  },
  {
    slug: 'idle-2-brothers',
    duration: '3:02',
    demoMB: 55,
    stack: ['JavaScript', 'Canvas + WebGL post-FX', 'Custom engine'],
    en: {
      title: 'Two Brothers',
      genre: 'Shooter-defence × crafting',
      mechanic: 'Two garden gnomes ride a cart along the edge of a garden and fight off a giant caterpillar. Drag items from the conveyor into the cart’s slots to craft weapons on the fly; between levels — a garden hub with beds, a workshop, quests and a shop.',
      task: 'Combine a real-time crafting conveyor with lane defence and wrap it into a light idle meta (garden, timers, quests) for mobile.',
      role: 'Concept and GDD iterations (now v0.7), design decisions, feedback from phone playtests, visual and UX reviews, acceptance. Implementation by AI under my direction.',
      notes: [
        'Own engine with a deterministic simulation, level generator and solver',
        'Version v013: QA passed on the meta slice; my own playtest of v013 completed',
        'Public demo: test API, debug mode and mock purchases are switched off',
      ],
    },
    ru: {
      title: 'Два брата',
      genre: 'Shooter-defense × крафт',
      mechanic: 'Два садовых гнома едут на тележке вдоль огорода и отбиваются от гигантской гусеницы. Перетаскивай предметы с ленты в ячейки тележки и собирай оружие на ходу; между уровнями — огород-хаб с грядками, мастерская, задания и магазин.',
      task: 'Соединить крафт на ленте в реальном времени с обороной на линии и обернуть это в лёгкую idle-мету (огород, таймеры, задания) для мобильных.',
      role: 'Концепция и итерации GDD (сейчас v0.7), геймдизайн-решения, обратная связь по плейтестам с телефона, визуальные и UX-ревью, приёмка. Реализация — AI под моим руководством.',
      notes: [
        'Собственный движок с детерминированной симуляцией, генератором уровней и солвером',
        'Версия v013: QA меты пройден, мой плейтест v013 пройден',
        'В публичном демо отключены тестовый API, режим отладки и тестовые покупки',
      ],
    },
  },
];


const en = {
  lang: 'en',
  meta: {
    title: 'Pavel Dziubenko — AI Game Builder',
    desc: 'Pavel Dziubenko: game design and AI-driven game prototyping. Playable prototypes and game-idea R&D.',
  },
  nav: { games: 'Games', workflow: 'How I work', lab: 'Idea Lab', skills: 'Skills', contact: 'Contact', cta: 'Contact' },
  loading: { video: 'Loading video…', demo: 'Loading the demo…' },
  hero: {
    eyebrow: 'AI Game Builder · AI Game Prototyper · Game R&D',
    l1: 'From Idea', l2: 'to Game',
    lead: 'I’m <b>Pavel Dziubenko</b>. I design games and build them with AI — from an idea to a playable prototype in days, not months. Then I test them, cut what doesn’t work and push the rest further.',
    primary: 'Play the games', secondary: 'Get in touch',
    chip: ['35+', 'prototypes built'],
  },
  stats: [
    ['35', 'Game prototypes built — four are playable right here on the site'],
    ['100+', 'Game ideas generated and scored in Game Idea Lab'],
    ['8752', 'Entries in the AI agents’ knowledge base'],
    ['192+', 'Game mechanics in the Game Idea Lab catalogue'],
  ],
  games: {
    num: '01', title: 'Selected Game Projects',
    sub: 'Four prototypes, each with a gameplay video and a playable demo',
    intro: 'Everything in the videos is the real game: its own UI, real progression, no added captions. Demos open in a phone frame; game UI is in Russian.',
    labels: { task: 'Goal', role: 'My role', stack: 'Stack', notes: 'Technical notes & status', watch: 'Watch gameplay', play: 'Play demo', mb: 'MB' },
  },
  workflow: {
    num: '02', title: 'How I Work',
    lead: 'I own the game: the idea, the design and every decision about what stays. AI does the implementation under my direction — and nothing moves forward until I’ve played it myself.',
    steps: [
      ['Idea', 'Pick a hypothesis worth testing'],
      ['Concept & GDD', 'Core loop, goals, design decisions'],
      ['Prototype', 'The mechanic first, polish later'],
      ['Checks', 'Logic, balance and performance verified'],
      ['My playtest', 'On a phone: accept or send back with notes'],
      ['Iterate', 'Fix, rebalance, play again'],
      ['Art & sound', 'Visual style, animation and audio'],
      ['Build', 'Web, mobile or Unity'],
    ],
  },
  lab: {
    num: '03', title: 'Game Idea Lab',
    lead: 'My R&D track for game ideas: generate many, filter hard, prototype the few that survive — and only then decide what deserves full production.',
    nums: [['100+', 'Game ideas generated and scored'], ['12', 'Experiments testing game concepts'], ['4', 'Experiments passed the technical check'], ['1', 'Concept became a standalone game project']],
    link: {
      title: 'From the lab to a game: Solar Relay',
      text: 'The “Solar relay” experiment passed the check, moved into full production on 1 Nov 2026 and grew into the prototype shown above.',
      cta: 'See the game',
    },
  },
  exp: {
    num: '04', title: 'Technical Experiments in Unity',
    lead: 'Unity 6 projects for mobile and PC, with game logic covered by tests.',
    items: [
      {
        tag: 'Unity 6 · Android · portrait', title: 'Tavern Chef Puzzle',
        text: 'A mobile puzzle with fully procedural levels: each level is generated from a difficulty profile and proven solvable before the player sees it.',
        facts: ['Playable prototype on placeholder art', 'EditMode tests 81/81, PlayMode 12/12', 'Android build checked on a physical phone'],
      },
      {
        tag: 'Unity 6 · URP 2D · PC / Steam', title: 'Inkwell',
        text: 'A 2D platformer where the hero with an inkwell head draws physical constructions in real time and drains colour out of the world.',
        facts: ['Stage: concept done, vertical slice in progress', 'EditMode 40/40, PlayMode 76/76 (2 Oct 2026)', 'Windows dev build builds and runs'],
      },
    ],
  },
  skills: {
    num: '05', title: 'Skills & Technology',
    groups: [
      ['Game design', ['Core loops and progression', 'GDDs and design decisions', 'Balance through data and simulation', 'Meta and economy for mobile', 'Playtesting and feedback loops']],
      ['Building games with AI', ['Turning a concept into clear tasks', 'Directing AI-driven implementation', 'Acceptance and quality control', 'Fast iteration from feedback', 'From idea to playable in days']],
      ['Game technology', ['TypeScript / JavaScript, Vite', 'Canvas 2D, WebGL, Three.js, Web Audio', 'Unity 6 (URP 2D, tests)', 'Godot (Android)', 'Web and portal builds']],
      ['Product & analytics', ['Hypotheses and A/B tests', 'Unit economics and ROI', 'Funnels and metrics', 'Leading a small team', 'Shipping and store presentation']],
    ],
  },
  bg: {
    num: '06', title: 'Experience',
    items: [
      ['AI Game Builder', '35+ game prototypes across puzzle, idle, arcade, defence and 3D — concept, GDD, design decisions, directing the AI-driven build, playtests and acceptance'],
      ['Game R&D', 'My own lab for generating and selecting game ideas; one of its picks grew into Solar Relay'],
      ['Unity', 'Unity 6 prototypes for mobile and PC with test-covered logic'],
      ['Since 2016 · Marketing', 'Performance marketing with ad budgets of $100k+ a month, a media-buying team of up to six people and my own digital products, including KDPie. In games I keep the same habits: every feature is a hypothesis with a metric, test fast, cut what doesn’t pay off — and look at a game the way players and stores see it.'],
    ],
  },
  contact: {
    num: '07', eyebrow: 'Open to AI Game Builder, Prototyper and Game R&D roles',
    title: 'Let’s build the next one',
    lead: 'I combine game design, fast AI-driven prototyping and a product mindset from ten years of measuring what works. Happy to walk you through any of the projects or take a test assignment.',
    tg: 'Message on Telegram', mail: 'Send an email', copy: 'copy', copied: 'copied ✓',
    footer: '© 2026 Pavel Dziubenko', top: 'Back to top ↑',
  },
  player: { videoHint: 'Real gameplay: UI and events come from the game itself.', demoHint: 'Playable prototype · game UI in Russian · Esc to close', newtab: 'Open in a new tab', close: 'Close' },
};

const ru = {
  lang: 'ru',
  meta: {
    title: 'Павел Дзюбенко — AI Game Builder',
    desc: 'Павел Дзюбенко: геймдизайн и прототипирование игр с AI. Играбельные прототипы и R&D игровых идей.',
  },
  nav: { games: 'Игры', workflow: 'Как я работаю', lab: 'Idea Lab', skills: 'Навыки', contact: 'Контакты', cta: 'Связаться' },
  loading: { video: 'Загружаю видео…', demo: 'Загружаю демо…' },
  hero: {
    eyebrow: 'AI Game Builder · AI Game Prototyper · Game R&D',
    l1: 'От идеи', l2: 'до игры',
    lead: 'Я <b>Павел Дзюбенко</b>. Придумываю игры и делаю их с помощью AI — от идеи до играбельного прототипа за дни, а не месяцы. Потом проверяю, отсекаю то, что не работает, и развиваю остальное.',
    primary: 'Играть в игры', secondary: 'Связаться',
    chip: ['35+', 'прототипов сделано'],
  },
  stats: [
    ['35', 'Игровых прототипов создано — четыре доступны прямо на сайте'],
    ['100+', 'Игровых идей сгенерировано и оценено в Game Idea Lab'],
    ['8752', 'Записи в базе знаний AI-агентов'],
    ['192+', 'Игровых механик в каталоге Game Idea Lab'],
  ],
  games: {
    num: '01', title: 'Игровые проекты',
    sub: 'Четыре прототипа — у каждого видео геймплея и играбельное демо',
    intro: 'В роликах — настоящая игра: её собственный интерфейс, реальный прогресс, никаких добавленных подписей. Демо открывается в рамке телефона.',
    labels: { task: 'Задача', role: 'Мой вклад', stack: 'Технологии', notes: 'Технические детали и статус', watch: 'Смотреть геймплей', play: 'Играть в демо', mb: 'МБ' },
  },
  workflow: {
    num: '02', title: 'Как я работаю',
    lead: 'Игра — моя ответственность: идея, дизайн и каждое решение о том, что остаётся. Реализацию под моим руководством выполняет AI — и ничего не идёт дальше, пока я сам не сыграю.',
    steps: [
      ['Идея', 'Выбрать гипотезу, которую стоит проверить'],
      ['Концепция и GDD', 'Core loop, цели, дизайн-решения'],
      ['Прототип', 'Сначала механика, полировка потом'],
      ['Проверки', 'Логика, баланс и производительность'],
      ['Мой плейтест', 'На телефоне: принять или вернуть с замечаниями'],
      ['Итерации', 'Исправить, перебалансировать, сыграть снова'],
      ['Арт и звук', 'Визуальный стиль, анимация и аудио'],
      ['Сборка', 'Веб, мобильная или Unity'],
    ],
  },
  lab: {
    num: '03', title: 'Game Idea Lab',
    lead: 'Моё R&D-направление для игровых идей: сгенерировать много, жёстко отфильтровать, сделать прототипы немногих выживших — и только потом решать, что заслуживает полноценной разработки.',
    nums: [['100+', 'Игровых идей сгенерировано и оценено'], ['12', 'Экспериментов по проверке игровых концепций'], ['4', 'Эксперимента прошли техническую проверку'], ['1', 'Концепция перешла в отдельный игровой проект']],
    link: {
      title: 'Из лаборатории — в игру: «Солнечная эстафета»',
      text: 'Эксперимент «Солнечная эстафета» прошёл проверку, 01.11.2026 ушёл в полноценную разработку и вырос в прототип, который показан выше.',
      cta: 'Смотреть игру',
    },
  },
  exp: {
    num: '04', title: 'Технические эксперименты в Unity',
    lead: 'Проекты на Unity 6 для мобильных и ПК, игровая логика покрыта тестами.',
    items: [
      {
        tag: 'Unity 6 · Android · вертикальный', title: 'Tavern Chef Puzzle',
        text: 'Мобильная головоломка с полностью процедурными уровнями: каждый уровень строится по профилю сложности, и его проходимость доказывается ещё до того, как игрок его увидит.',
        facts: ['Играбельный прототип на временной графике', 'EditMode-тесты 81/81, PlayMode 12/12', 'Android-сборка проверена на реальном телефоне'],
      },
      {
        tag: 'Unity 6 · URP 2D · ПК / Steam', title: 'Inkwell («Чернилка»)',
        text: '2D-платформер: герой с головой-чернильницей в реальном времени рисует физические конструкции и обесцвечивает мир.',
        facts: ['Этап: концепция готова, идёт вертикальный срез', 'EditMode 40/40, PlayMode 76/76 (02.10.2026)', 'Windows dev-сборка собирается и запускается'],
      },
    ],
  },
  skills: {
    num: '05', title: 'Навыки и технологии',
    groups: [
      ['Геймдизайн', ['Core loop и прогрессия', 'GDD и дизайн-решения', 'Баланс через данные и симуляцию', 'Мета и экономика для мобильных', 'Плейтесты и обратная связь']],
      ['Разработка игр с AI', ['Превращение концепции в понятные задачи', 'Руководство реализацией силами AI', 'Приёмка и контроль качества', 'Быстрые итерации по обратной связи', 'От идеи до играбельной версии за дни']],
      ['Игровые технологии', ['TypeScript / JavaScript, Vite', 'Canvas 2D, WebGL, Three.js, Web Audio', 'Unity 6 (URP 2D, тесты)', 'Godot (Android)', 'Веб-сборки и сборки под порталы']],
      ['Продукт и аналитика', ['Гипотезы и A/B-тесты', 'Юнит-экономика и окупаемость', 'Воронки и метрики', 'Руководство небольшой командой', 'Выпуск и подача в магазине']],
    ],
  },
  bg: {
    num: '06', title: 'Опыт работы',
    items: [
      ['AI Game Builder', '35+ прототипов игр: головоломки, idle, аркады, оборона, 3D — концепция, GDD, геймдизайн-решения, руководство реализацией силами AI, плейтесты и приёмка'],
      ['Game R&D', 'Своя лаборатория генерации и отбора игровых идей; одна из отобранных идей выросла в «Солнечную эстафету»'],
      ['Unity', 'Прототипы на Unity 6 для мобильных и ПК с логикой, покрытой тестами'],
      ['С 2016 · Маркетинг', 'Performance-маркетинг: рекламные бюджеты $100k+ в месяц, команда медиабаинга до шести человек и собственные цифровые продукты, включая KDPie. В играх применяю те же привычки: каждая фича — гипотеза с метрикой, быстрая проверка, отказ от того, что не окупается, и взгляд на игру глазами игрока и магазина.'],
    ],
  },
  contact: {
    num: '07', eyebrow: 'Открыт к ролям AI Game Builder, Prototyper и Game R&D',
    title: 'Давайте сделаем следующую',
    lead: 'Я соединяю геймдизайн, быстрое прототипирование с AI и продуктовое мышление из десяти лет измерения того, что работает. С радостью покажу любой проект или выполню тестовое задание.',
    tg: 'Написать в Telegram', mail: 'Написать на почту', copy: 'копировать', copied: 'скопировано ✓',
    footer: '© 2026 Павел Дзюбенко', top: 'Наверх ↑',
  },
  player: { videoHint: 'Реальный геймплей: интерфейс и события — из самой игры.', demoHint: 'Играбельный прототип · Esc — закрыть', newtab: 'Открыть в новой вкладке', close: 'Закрыть' },
};

export const content = { en, ru };
