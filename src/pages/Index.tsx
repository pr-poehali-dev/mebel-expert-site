import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO    = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/6c1e89a3-9407-40df-9f88-3c0b681e162b.jpg";
const IMG_KITCHEN = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/2a41059c-25e8-4591-9072-285a3e4562fb.jpg";
const IMG_BEDROOM = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/8c784e79-e2f3-41a1-aa02-41a8a574b4d8.jpg";
const IMG_LIVING  = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/2ed6f23e-6d15-464f-a0cc-6404bcd1207b.jpg";

const NAV_LINKS = [
  ["portfolio","Портфолио"],["process","Процесс"],["materials","Материалы"],
  ["reviews","Отзывы"],["promo","Акции"],["faq","FAQ"],["contact","Контакты"],
];

const TICKER = [
  "Скидка 15% на кухни — февраль 2026","Бесплатный замер по Москве и МО",
  "Рассрочка 0% · 12 месяцев","Изготовление от 14 дней",
  "Немецкое ЧПУ-оборудование","500+ реализованных проектов",
];

const PORTFOLIO = [
  { id:1, cat:"Кухни",    title:"Кухня Loft White",  sub:"Матовый МДФ · Интеграция техники · 4.2 м", price:"от 380 000 ₽", img:IMG_KITCHEN },
  { id:2, cat:"Гостиные", title:"Гостиная Scandia",  sub:"Шпон дуба · Плавающие полки · 5.4 м",      price:"от 290 000 ₽", img:IMG_LIVING  },
  { id:3, cat:"Спальни",  title:"Спальня Nordic",    sub:"Массив ясень · Встроенные ниши",            price:"от 220 000 ₽", img:IMG_BEDROOM },
  { id:4, cat:"Кухни",    title:"Кухня Mono",        sub:"Акрил белый · Остров · 3.6 × 2.8 м",       price:"от 310 000 ₽", img:IMG_KITCHEN },
  { id:5, cat:"Гостиные", title:"Шоурум-интерьер",   sub:"Комплексное решение · 3 зоны",             price:"от 550 000 ₽", img:IMG_HERO    },
  { id:6, cat:"Шкафы",    title:"Гардеробная Room",  sub:"ЛДСП · Зеркало · 3.6 м",                  price:"от 110 000 ₽", img:IMG_BEDROOM },
];

const CATS = ["Все","Кухни","Гостиные","Спальни","Шкафы"];

const STEPS = [
  { n:"1", icon:"Ruler",    title:"Замер",       desc:"Бесплатный выезд специалиста. Точные размеры и пожелания — на месте." },
  { n:"2", icon:"PenTool",  title:"Проект",      desc:"3D-визуализация. Согласуем материалы и конструкцию до производства." },
  { n:"3", icon:"Settings", title:"Производство",desc:"ЧПУ-оборудование, точность 0.1 мм. Контроль качества на каждом этапе." },
  { n:"4", icon:"Truck",    title:"Доставка",    desc:"По Москве, МО и регионам в согласованный день и время." },
  { n:"5", icon:"Wrench",   title:"Монтаж",      desc:"Профессиональная сборка с гарантией. После — порядок и чистота." },
];

const MATERIALS = [
  { icon:"Layers",   title:"МДФ и ЛДСП",      desc:"Сотни цветов и текстур. Влагостойкие варианты для кухни." },
  { icon:"TreePine", title:"Массив и шпон",   desc:"Дуб, ясень, орех. Текстура, которая красивеет с годами." },
  { icon:"Sparkles", title:"Акрил и стекло",  desc:"Глянцевые поверхности, стойкие к царапинам." },
  { icon:"Shield",   title:"Фурнитура Blum",  desc:"30-летняя гарантия. Тихое и мягкое движение каждый раз." },
  { icon:"Cpu",      title:"ЧПУ-производство",desc:"Немецкие станки, точность 0.1 мм — идеальная подгонка деталей." },
  { icon:"Zap",      title:"Встройка техники",desc:"Духовки, холодильники, вытяжки, стиральные машины под заказ." },
];

const REVIEWS = [
  { name:"Анна М.", city:"Москва",     stars:5, text:"Кухня под нестандартный проём. Всё точно в срок, монтаж — безупречный. Сразу видно профессионалов.", tag:"Кухня 4.2 м" },
  { name:"Дмитрий К.", city:"Красногорск", stars:5, text:"Гостиная с книжным шкафом. Трижды менял детали — всё терпеливо переделывали без доплат.",    tag:"Гостиная" },
  { name:"Елена В.", city:"Подольск",  stars:5, text:"Гардеробная во всю стену — мечта. Полтора года — ни скрипа, ни зазора.",                          tag:"Гардеробная 3.6 м" },
  { name:"Игорь С.", city:"Химки",     stars:5, text:"Угловая кухня с островом. Дизайнер учёл розетки, подсветку, вентиляцию. Теперь кухня — любимое место.", tag:"Кухня с островом" },
];

const FAQ = [
  { q:"Сколько стоит выезд замерщика?",       a:"Замер бесплатный по всей Москве и Подмосковью. Для регионов — уточняйте у менеджера." },
  { q:"Какие сроки изготовления?",             a:"От 14 до 30 рабочих дней. Точный срок фиксируем в договоре." },
  { q:"Работаете с нестандартными размерами?", a:"Именно для этого мы и существуем — производим под любые размеры и конфигурации." },
  { q:"Какая гарантия на мебель?",             a:"3 года на конструкцию, 1 год на фурнитуру. Blum — 30 лет заводской гарантии." },
  { q:"Есть рассрочка?",                       a:"0% на 6 и 12 месяцев. Первый взнос от 50%. Оформляем сразу у нас." },
  { q:"Как согласовывается дизайн?",           a:"Дизайнер делает 3D-модель, вы её утверждаете. Производство — только после вашего «окей»." },
];

function useFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("visible"); },
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return ref;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-ink-light text-xs font-inter uppercase tracking-[0.25em] mb-2">{children}</p>;
}

function H2({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 className={`text-3xl md:text-4xl font-golos font-bold text-ink leading-tight ${center ? "text-center" : ""}`}>
      {children}
    </h2>
  );
}

export default function Index() {
  const [cat, setCat]         = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm]       = useState({ name:"", phone:"", msg:"" });
  const [menuOpen, setMenuOpen] = useState(false);

  const rHero = useFade(), rAdv = useFade(), rPort = useFade();
  const rProc = useFade(), rMat = useFade(), rRev  = useFade();
  const rPromo = useFade(), rFaq = useFade(), rCont = useFade();

  const filtered = cat === "Все" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === cat);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-background text-ink font-golos min-h-screen overflow-x-hidden">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 bg-warm-50/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
          <a href="#hero" onClick={e => { e.preventDefault(); go("hero"); }}
            className="font-golos font-bold text-[1.6rem] tracking-tight text-ink shrink-0 leading-none hover:text-terra transition-colors">
            Мебелекс
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                className="text-sm text-ink-soft hover:text-ink transition-colors font-inter">
                {label}
              </button>
            ))}
          </nav>
          <button onClick={() => go("contact")}
            className="hidden md:block shrink-0 bg-ink text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-ink-soft transition-colors shadow-btn">
            Получить расчёт
          </button>
          <button className="md:hidden p-2 text-ink" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-surface-100 border-t border-border px-5 py-5 flex flex-col gap-3">
            {NAV_LINKS.map(([id, label]) => (
              <button key={id} onClick={() => go(id)}
                className="text-sm text-ink-soft hover:text-ink text-left py-1">{label}</button>
            ))}
            <button onClick={() => go("contact")}
              className="bg-ink text-white px-5 py-3 rounded-xl text-sm font-semibold mt-2">
              Получить расчёт
            </button>
          </div>
        )}
      </header>

      {/* ─── TICKER ─── */}
      <div className="fixed top-16 inset-x-0 z-40 h-8 bg-surface-100 border-b border-border flex items-center overflow-hidden">
        <div className="flex animate-slide-left whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="text-[11px] text-ink-light uppercase tracking-widest mx-8 font-inter">· {t}</span>
          ))}
        </div>
      </div>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-24">
        {/* Фото на правой половине */}
        <div className="absolute inset-0">
          <img src={IMG_HERO} alt="Мебелекс" className="w-full h-full object-cover object-center" />
          {/* Светлый градиент слева — текст читается, фото видно справа */}
          <div className="absolute inset-0 bg-gradient-to-r from-warm-50 via-warm-100/90 to-warm-100/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-50/40 via-transparent to-warm-50/60" />
        </div>

        <div ref={rHero} className="section-fade relative z-10 w-full max-w-7xl mx-auto px-5 py-20">
          <div className="max-w-[560px]">
            <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-ink-soft text-xs font-inter uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 border border-border shadow-sm">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Производство с 2008 года
            </span>
            <h1 className="font-golos font-bold text-5xl md:text-6xl lg:text-[4.25rem] text-ink leading-[1.05] mb-5">
              Мебель<br />по вашему<br />
              <span className="text-ink-soft">проекту</span>
            </h1>
            <p className="text-ink-soft text-lg font-inter font-light leading-relaxed mb-10 max-w-md">
              Кухни, шкафы, гостиные и спальни точно по вашим размерам. Современное ЧПУ-производство и 15 лет опыта.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go("contact")}
                className="bg-ink text-white px-7 py-4 rounded-xl font-semibold text-sm hover:bg-ink-soft transition-colors shadow-btn">
                Рассчитать стоимость
              </button>
              <button onClick={() => go("portfolio")}
                className="bg-white/80 backdrop-blur-sm border border-border text-ink px-7 py-4 rounded-xl font-semibold text-sm hover:bg-white transition-colors shadow-sm">
                Смотреть работы
              </button>
            </div>
            <div className="flex gap-10 mt-14 pt-8 border-t border-border/60">
              {[["500+","проектов"],["15","лет опыта"],["98%","довольны"]].map(([n,l]) => (
                <div key={l}>
                  <div className="text-3xl font-golos font-bold text-ink">{n}</div>
                  <div className="text-xs text-ink-light uppercase tracking-wider mt-0.5 font-inter">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-ink-light" />
        </div>
      </section>

      {/* ─── ADVANTAGES ─── */}
      <section className="py-14 bg-warm-200">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rAdv} className="section-fade grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon:"Ruler",       title:"Любой размер",    desc:"Производим под точные обмеры" },
              { icon:"Clock",       title:"От 14 дней",      desc:"Срок фиксируем в договоре" },
              { icon:"ShieldCheck", title:"Гарантия 3 года", desc:"На конструкцию и монтаж" },
              { icon:"Truck",       title:"Доставка·монтаж", desc:"Москва, МО и вся Россия" },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-5 shadow-card hover-lift">
                <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={20} className="text-ink-soft" />
                </div>
                <p className="font-semibold text-sm text-ink mb-1">{item.title}</p>
                <p className="text-xs text-ink-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rPort} className="section-fade">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <SectionLabel>Наши работы</SectionLabel>
                <H2>Портфолио проектов</H2>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATS.map(c => (
                  <button key={c} onClick={() => setCat(c)}
                    className={`px-4 py-2 rounded-xl text-sm font-inter transition-all ${
                      cat === c ? "bg-ink text-white shadow-btn" : "bg-white border border-border text-ink-soft hover:border-ink-soft"
                    }`}>{c}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(item => (
                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-card hover-lift cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-inter uppercase tracking-widest text-ink-light">{item.cat}</span>
                    <h3 className="font-golos font-semibold text-base text-ink mt-1 mb-1">{item.title}</h3>
                    <p className="text-xs text-ink-light mb-3 leading-relaxed">{item.sub}</p>
                    <p className="text-sm font-semibold text-ink">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section id="process" className="py-20 bg-warm-200">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rProc} className="section-fade">
            <div className="text-center mb-14">
              <SectionLabel>Как мы работаем</SectionLabel>
              <H2 center>5 шагов от идеи до результата</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
              {STEPS.map((s, i) => (
                <div key={s.n} className="relative bg-white rounded-2xl p-6 shadow-card flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-ink rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={s.icon} size={16} className="text-white" />
                    </div>
                    <span className="text-xs text-ink-light font-inter">Шаг {s.n}</span>
                  </div>
                  <h3 className="font-golos font-semibold text-base text-ink">{s.title}</h3>
                  <p className="text-xs text-ink-light leading-relaxed">{s.desc}</p>
                  {i < STEPS.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-6 h-6 items-center justify-center shadow-sm border border-border">
                      <Icon name="ChevronRight" size={12} className="text-ink-light" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* CTA Banner */}
            <div className="mt-10 bg-white rounded-2xl p-8 md:p-10 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-border">
              <div>
                <p className="text-ink-light text-xs font-inter uppercase tracking-widest mb-2">Специальное предложение</p>
                <h3 className="text-ink font-golos font-bold text-2xl">Бесплатная 3D-визуализация</h3>
                <p className="text-ink-light text-sm mt-1">при заказе от 150 000 ₽</p>
              </div>
              <button onClick={() => go("contact")}
                className="shrink-0 bg-ink text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-ink-soft transition-colors shadow-btn">
                Получить предложение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MATERIALS ─── */}
      <section id="materials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rMat} className="section-fade">
            <div className="grid md:grid-cols-2 gap-14 items-start">
              <div>
                <SectionLabel>Из чего делаем</SectionLabel>
                <H2>Материалы и технологии</H2>
                <p className="text-ink-soft text-base font-inter leading-relaxed mt-4 mb-8">
                  Только сертифицированные материалы от проверенных поставщиков. ЧПУ-оборудование гарантирует точность до 0.1 мм и идеальную подгонку.
                </p>
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img src={IMG_LIVING} alt="Материалы" className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
              <div className="grid gap-3 md:mt-14">
                {MATERIALS.map(m => (
                  <div key={m.title} className="flex gap-4 items-start bg-white rounded-2xl p-5 shadow-card hover-lift border border-border/60">
                    <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={m.icon} size={18} className="text-ink-soft" />
                    </div>
                    <div>
                      <p className="font-golos font-semibold text-sm text-ink mb-0.5">{m.title}</p>
                      <p className="text-xs text-ink-light leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section id="reviews" className="py-20 bg-warm-200">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rRev} className="section-fade">
            <div className="text-center mb-12">
              <SectionLabel>Отзывы клиентов</SectionLabel>
              <H2 center>Что говорят о нас</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-card hover-lift border border-border/60">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: r.stars }).map((_,j) => (
                      <span key={j} className="text-amber-400 text-base">★</span>
                    ))}
                  </div>
                  <p className="text-ink text-sm leading-relaxed mb-5">«{r.text}»</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-semibold text-sm text-ink">{r.name}</p>
                      <p className="text-xs text-ink-light">{r.city}</p>
                    </div>
                    <span className="bg-surface-100 text-ink-soft text-xs px-3 py-1 rounded-full font-inter border border-border">{r.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROMO ─── */}
      <section id="promo" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rPromo} className="section-fade">
            <div className="mb-12">
              <SectionLabel>Актуальные предложения</SectionLabel>
              <H2>Акции и скидки</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { tag:"До 28 февраля", title:"−15% на кухни",    desc:"Скидка на весь заказ при оформлении до конца месяца. Включая монтаж.", cta:"Заказать кухню",    accent:true },
                { tag:"Постоянно",     title:"Рассрочка 0%",     desc:"На 6 или 12 месяцев без переплат. Первый взнос от 50%.",              cta:"Оформить рассрочку",accent:false },
                { tag:"От 150 000 ₽",  title:"Бесплатный 3D",    desc:"Дизайнер сделает визуализацию интерьера совершенно бесплатно.",       cta:"Получить проект",  accent:false },
              ].map((p,i) => (
                <div key={i} className={`rounded-2xl p-7 flex flex-col gap-4 border ${
                  p.accent ? "bg-surface-200 border-surface-300 shadow-card" : "bg-white border-border shadow-card"
                }`}>
                  <span className="text-[11px] font-inter uppercase tracking-widest text-ink-light">{p.tag}</span>
                  <h3 className="font-golos font-bold text-2xl text-ink">{p.title}</h3>
                  <p className="text-sm leading-relaxed flex-1 text-ink-soft">{p.desc}</p>
                  <button onClick={() => go("contact")}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      p.accent ? "bg-ink text-white hover:bg-ink-soft shadow-btn" : "bg-surface text-ink hover:bg-surface-200 border border-border"
                    }`}>{p.cta}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 bg-warm-200">
        <div className="max-w-3xl mx-auto px-5">
          <div ref={rFaq} className="section-fade">
            <div className="text-center mb-12">
              <SectionLabel>Вопросы и ответы</SectionLabel>
              <H2 center>Часто спрашивают</H2>
            </div>
            <div className="flex flex-col gap-3">
              {FAQ.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-card border border-border/60">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-surface-100 transition-colors">
                    <span className="text-sm font-semibold text-ink">{item.q}</span>
                    <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      openFaq === i ? "bg-ink" : "bg-surface"
                    }`}>
                      <Icon name={openFaq === i ? "Minus" : "Plus"} size={13}
                        className={openFaq === i ? "text-white" : "text-ink-soft"} />
                    </div>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <p className="text-sm text-ink-soft leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-5">
          <div ref={rCont} className="section-fade">
            <div className="grid md:grid-cols-2 gap-14">
              <div>
                <SectionLabel>Оставить заявку</SectionLabel>
                <H2>Свяжитесь с нами</H2>
                <p className="text-ink-soft text-sm font-inter mt-3 mb-8 leading-relaxed">
                  Менеджер перезвонит в течение 30 минут, ответит на вопросы и предложит удобное время замера.
                </p>
                <form onSubmit={e => {
                  e.preventDefault();
                  alert("Заявка отправлена! Мы скоро перезвоним.");
                  setForm({ name:"", phone:"", msg:"" });
                }} className="flex flex-col gap-4">
                  {[
                    { label:"Ваше имя", key:"name",  ph:"Александр",        type:"text" },
                    { label:"Телефон",  key:"phone", ph:"+7 (999) 000-00-00",type:"tel" },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-ink-light font-inter uppercase tracking-widest mb-1.5 block">{f.label}</label>
                      <input type={f.type} required placeholder={f.ph}
                        value={form[f.key as "name"|"phone"]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-terra/30 transition shadow-sm" />
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-ink-light font-inter uppercase tracking-widest mb-1.5 block">Описание проекта</label>
                    <textarea rows={4} placeholder="Что хотите заказать, размеры, пожелания..."
                      value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                      className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder:text-ink-light focus:outline-none focus:ring-2 focus:ring-terra/30 transition resize-none shadow-sm" />
                  </div>
                  <button type="submit"
                    className="bg-ink text-white py-4 rounded-xl font-semibold text-sm hover:bg-ink-soft transition-colors shadow-btn">
                    Отправить заявку
                  </button>
                  <p className="text-[11px] text-ink-light">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
                </form>
              </div>

              <div className="flex flex-col gap-5 md:mt-16">
                {[
                  { icon:"Phone",  label:"Телефон",       val:"+7 (495) 000-00-00" },
                  { icon:"Mail",   label:"Email",          val:"info@mebelex.ru" },
                  { icon:"MapPin", label:"Адрес",          val:"Москва, ул. Производственная, 1" },
                  { icon:"Clock",  label:"Режим работы",   val:"Пн–Сб 9:00–20:00 · Вс 10:00–18:00" },
                ].map(c => (
                  <div key={c.label} className="flex gap-4 items-start bg-white rounded-2xl p-4 shadow-card border border-border/60">
                    <div className="w-10 h-10 bg-surface-100 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={17} className="text-ink-soft" />
                    </div>
                    <div>
                      <p className="text-[11px] text-ink-light font-inter uppercase tracking-widest mb-0.5">{c.label}</p>
                      <p className="text-sm font-semibold text-ink">{c.val}</p>
                    </div>
                  </div>
                ))}

                <div>
                  <p className="text-xs text-ink-light font-inter uppercase tracking-widest mb-3">Мы в соцсетях</p>
                  <div className="flex gap-3">
                    {[{icon:"MessageCircle",label:"VK"},{icon:"Send",label:"Telegram"},{icon:"Share2",label:"Instagram"},{icon:"Youtube",label:"YouTube"}].map(s => (
                      <button key={s.label} title={s.label}
                        className="w-11 h-11 bg-white rounded-xl flex items-center justify-center hover:bg-surface-100 transition-colors shadow-card border border-border/60 group">
                        <Icon name={s.icon} size={17} className="text-ink-soft group-hover:text-ink transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-surface rounded-2xl p-6 flex items-center justify-between gap-4 border border-border shadow-card">
                  <div>
                    <p className="text-ink font-semibold text-base mb-1">Онлайн-консультант</p>
                    <p className="text-ink-light text-xs">Ответим прямо сейчас</p>
                  </div>
                  <button className="bg-ink text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-ink-soft transition-colors shrink-0">
                    Написать
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-warm-200 border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-golos font-bold text-xl text-ink">Мебелекс</span>
          <p className="text-xs text-ink-light font-inter">© 2024 Мебелекс. Все права защищены.</p>
          <div className="flex gap-5">
            {["Политика конфиденциальности","Оферта"].map(l => (
              <button key={l} className="text-xs text-ink-light hover:text-ink transition-colors font-inter">{l}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* ─── Floating CTA ─── */}
      <button onClick={() => go("contact")}
        className="fixed bottom-6 right-6 z-50 bg-ink text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:bg-ink-soft hover:scale-105 transition-all duration-200"
        title="Получить расчёт">
        <Icon name="Phone" size={20} />
      </button>
    </div>
  );
}