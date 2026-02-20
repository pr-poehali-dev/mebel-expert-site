import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/583cf412-072c-4a3a-9de7-3813f25afd70.jpg";
const LIVING_IMAGE = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/dd24106b-345a-48b5-a29d-d7a903d2da82.jpg";
const KITCHEN_IMAGE = "https://cdn.poehali.dev/projects/df75d54c-3f10-415f-a50d-a4a74369f6fb/files/1aa711c8-7b6a-4c66-a096-93447eda7de6.jpg";

const TICKER_ITEMS = [
  "Скидка 15% на кухни до конца февраля",
  "Бесплатный выезд замерщика в Москве и МО",
  "Шкафы-купе от 45 000 ₽",
  "Срок изготовления от 14 рабочих дней",
  "Рассрочка 0% на 12 месяцев",
  "Более 500 реализованных проектов",
];

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Кухня в стиле лофт", category: "Кухни", material: "Массив дуба + матовый МДФ", size: "3.8 × 2.4 м", price: "от 380 000 ₽", img: KITCHEN_IMAGE },
  { id: 2, title: "Гостиная с нишей", category: "Гостиные", material: "Шпон венге + стекло", size: "5.2 × 3.1 м", price: "от 290 000 ₽", img: LIVING_IMAGE },
  { id: 3, title: "Спальный гарнитур", category: "Спальни", material: "Массив ясень", size: "4.0 × 3.2 м", price: "от 210 000 ₽", img: HERO_IMAGE },
  { id: 4, title: "Минималистичная кухня", category: "Кухни", material: "Акрил + металл", size: "2.8 × 2.0 м", price: "от 260 000 ₽", img: KITCHEN_IMAGE },
  { id: 5, title: "Библиотека-кабинет", category: "Гостиные", material: "Дуб беленый + кожа", size: "6.0 × 2.8 м", price: "от 450 000 ₽", img: LIVING_IMAGE },
  { id: 6, title: "Шкаф-купе Premium", category: "Шкафы-купе", material: "ЛДСП + зеркало", size: "3.6 × 2.2 м", price: "от 120 000 ₽", img: HERO_IMAGE },
];

const CATEGORIES = ["Все", "Кухни", "Гостиные", "Спальни", "Шкафы-купе"];

const PROCESS_STEPS = [
  { num: "01", title: "Замер", desc: "Бесплатный выезд замерщика в удобное для вас время. Точные размеры — залог идеальной посадки мебели." },
  { num: "02", title: "Проект", desc: "3D-визуализация вашего будущего интерьера. Согласуем каждую деталь до начала производства." },
  { num: "03", title: "Производство", desc: "Изготовление на немецком оборудовании с контролем качества на каждом этапе." },
  { num: "04", title: "Доставка", desc: "Доставляем по Москве, МО и регионам. Упаковываем каждую деталь для сохранности." },
  { num: "05", title: "Монтаж", desc: "Профессиональная сборка и установка. Оставим идеальный порядок после завершения работ." },
];

const MATERIALS = [
  { icon: "Trees", title: "Массив дерева", desc: "Дуб, ясень, орех, бук. Экологично, долговечно, эксклюзивно." },
  { icon: "Layers", title: "ЛДСП и МДФ", desc: "Сотни цветов и текстур. Оптимальное соотношение цены и качества." },
  { icon: "Sparkles", title: "Шпон и акрил", desc: "Натуральный шпон и глянцевый акрил для премиального вида." },
  { icon: "Shield", title: "Фурнитура Blum", desc: "Австрийская фурнитура с гарантией до 30 лет. Тихое и плавное движение." },
  { icon: "Cpu", title: "ЧПУ-оборудование", desc: "Немецкие станки с точностью до 0.1 мм. Идеальные стыки и формы." },
  { icon: "Paintbrush", title: "Покрытия", desc: "Стойкие краски, лаки и эмали с антибактериальными свойствами." },
];

const REVIEWS = [
  { name: "Анна Смирнова", city: "Москва", rating: 5, text: "Заказала кухню под нестандартный размер. Результат превзошёл все ожидания! Всё идеально подошло, монтаж прошёл быстро и чисто.", project: "Кухня, 4.2 м" },
  { name: "Дмитрий Козлов", city: "Красногорск", rating: 5, text: "Делали гостиную с большим книжным шкафом. Менеджер был на связи на каждом этапе. Рекомендую без сомнений.", project: "Гостиная со шкафом" },
  { name: "Елена Петрова", city: "Подольск", rating: 5, text: "Шкаф-купе во всю стену. Красиво, вместительно. Спустя год — ни одной проблемы. Качество на высоте.", project: "Шкаф-купе 3.6 м" },
  { name: "Игорь Васильев", city: "Химки", rating: 5, text: "Сложная угловая кухня с островом. Дизайнер учёл всё, от розеток до освещения. Теперь готовить — одно удовольствие!", project: "Кухня с островом" },
];

const FAQ_ITEMS = [
  { q: "Сколько стоит выезд замерщика?", a: "Замер абсолютно бесплатный по Москве и Московской области. Для регионов уточняйте у менеджера." },
  { q: "Какой срок изготовления мебели?", a: "Стандартный срок — от 14 до 30 рабочих дней в зависимости от сложности проекта и загруженности производства." },
  { q: "Можно ли заказать мебель под нестандартный размер?", a: "Именно в этом наша специализация! Мы производим мебель точно по вашим размерам без каких-либо ограничений." },
  { q: "Есть ли гарантия на мебель?", a: "Мы даём гарантию 3 года на конструкцию и 1 год на фурнитуру. Австрийская фурнитура Blum гарантирует 30 лет безотказной работы." },
  { q: "Возможна ли рассрочка?", a: "Да, предоставляем рассрочку 0% на 6 и 12 месяцев. Первоначальный взнос — 50% стоимости заказа." },
  { q: "Как происходит согласование дизайна?", a: "Наш дизайнер готовит 3D-визуализацию, вы согласуете детали, материалы и цвета. Производство начинается только после вашего одобрения." },
];

function useSectionFade() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function SectionTitle({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-12">
      <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-montserrat">{label}</p>
      <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white gold-underline">
        {title}
      </h2>
    </div>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  const heroRef = useSectionFade();
  const portfolioRef = useSectionFade();
  const processRef = useSectionFade();
  const materialsRef = useSectionFade();
  const reviewsRef = useSectionFade();
  const contactRef = useSectionFade();
  const promoRef = useSectionFade();
  const faqRef = useSectionFade();

  const filtered = activeCategory === "Все"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category === activeCategory);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-montserrat overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-cormorant text-2xl text-gold font-medium tracking-widest">
            МЕБЕЛЕКС
          </div>
          <div className="hidden md:flex items-center gap-8">
            {[
              ["portfolio", "Портфолио"],
              ["process", "Процесс"],
              ["materials", "Материалы"],
              ["reviews", "Отзывы"],
              ["promo", "Акции"],
              ["faq", "FAQ"],
              ["contact", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:block bg-gold text-white px-5 py-2 text-xs tracking-widest uppercase font-medium hover:bg-gold-light transition-colors duration-300"
          >
            Заказать
          </button>
          <button className="md:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-dark border-t border-border px-6 py-4 flex flex-col gap-4">
            {[
              ["portfolio", "Портфолио"],
              ["process", "Процесс"],
              ["materials", "Материалы"],
              ["reviews", "Отзывы"],
              ["promo", "Акции"],
              ["faq", "FAQ"],
              ["contact", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors text-left"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="bg-gold text-white px-5 py-3 text-xs tracking-widest uppercase font-medium"
            >
              Заказать
            </button>
          </div>
        )}
      </nav>

      {/* TICKER */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-gold/10 border-b border-gold/20 overflow-hidden h-9 flex items-center">
        <div className="flex animate-slide-left whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-gold text-xs tracking-[0.15em] uppercase mx-10">
              ✦ {item}
            </span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div ref={heroRef} className="section-fade relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-6 font-montserrat">
            Производство мебели с 2008 года
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl font-light text-white leading-none mb-6">
            Мебель по<br />
            <span className="italic text-gold">вашему</span> проекту
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto mb-10">
            Создаём кухни, шкафы, гостиные и спальни точно по вашим размерам и дизайну. Без компромиссов.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-gold text-dark px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.4)]"
            >
              Рассчитать стоимость
            </button>
            <button
              onClick={() => scrollTo("portfolio")}
              className="border border-gold/40 text-gold px-8 py-4 text-xs tracking-[0.2em] uppercase hover:border-gold hover:bg-gold/10 transition-all duration-300"
            >
              Смотреть портфолио
            </button>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-8 border-t border-border/40 pt-10">
            {[
              ["500+", "Проектов"],
              ["15", "Лет опыта"],
              ["98%", "Довольных клиентов"],
            ].map(([num, label]) => (
              <div key={label}>
                <div className="font-cormorant text-4xl md:text-5xl text-gold font-light">{num}</div>
                <div className="text-muted-foreground text-xs tracking-widest uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-gold/50" />
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {[
              { icon: "Ruler", title: "Любые размеры", desc: "Точный обмер и производство под ваш интерьер" },
              { icon: "Clock", title: "От 14 дней", desc: "Быстрое производство без потери качества" },
              { icon: "Award", title: "Гарантия 3 года", desc: "На всю продукцию и монтажные работы" },
              { icon: "Truck", title: "Доставка и монтаж", desc: "По Москве, МО и всей России" },
            ].map((item) => (
              <div key={item.title} className="bg-dark p-8 flex flex-col gap-3 hover:bg-dark-100 transition-colors duration-300 group">
                <Icon name={item.icon} size={28} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-montserrat text-sm font-semibold text-foreground tracking-wide">{item.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={portfolioRef} className="section-fade">
            <SectionTitle label="Наши работы" title="Портфолио проектов" />
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-gold text-white font-semibold"
                      : "border border-border text-muted-foreground hover:border-gold hover:text-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
              {filtered.map((item) => (
                <div key={item.id} className="group relative overflow-hidden bg-dark cursor-pointer">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.category}</p>
                    <h3 className="text-white font-cormorant text-2xl font-light mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-xs mb-1">{item.material}</p>
                    <p className="text-muted-foreground text-xs mb-2">{item.size}</p>
                    <p className="text-gold font-semibold text-sm">{item.price}</p>
                  </div>
                  <div className="p-5 group-hover:opacity-0 transition-opacity duration-300">
                    <p className="text-gold text-xs tracking-widest uppercase mb-1">{item.category}</p>
                    <h3 className="text-foreground font-cormorant text-xl font-light">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={processRef} className="section-fade">
            <SectionTitle label="Как мы работаем" title="Процесс сотрудничества" />
            <div className="relative">
              <div className="hidden md:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={step.num} className="relative flex flex-col gap-4">
                    <div className="flex flex-col items-start md:items-center">
                      <div className="w-24 h-24 border border-gold/30 flex items-center justify-center bg-background">
                        <span className="font-cormorant text-4xl text-gold/60 font-light">{step.num}</span>
                      </div>
                    </div>
                    <div className="md:text-center">
                      <h3 className="text-foreground font-montserrat text-sm font-semibold tracking-wide mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{step.desc}</p>
                    </div>
                    {i < PROCESS_STEPS.length - 1 && (
                      <div className="md:hidden absolute left-12 top-24 bottom-0 w-px bg-gold/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-16 bg-gold/8 border border-gold/25 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Специальное предложение</p>
                <h3 className="font-cormorant text-3xl text-foreground font-light">Бесплатная 3D-визуализация</h3>
                <p className="text-muted-foreground text-sm mt-2">при заказе на сумму от 150 000 ₽</p>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="bg-gold text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-all duration-300 whitespace-nowrap"
              >
                Получить предложение
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MATERIALS */}
      <section id="materials" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={materialsRef} className="section-fade">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div>
                <SectionTitle label="Из чего мы делаем" title="Материалы и технологии" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Работаем только с сертифицированными материалами от проверенных поставщиков. Немецкое оборудование с точностью до 0.1 мм гарантирует идеальную подгонку каждой детали.
                </p>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={LIVING_IMAGE} alt="Производство" className="w-full h-full object-cover hover-scale" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-px bg-border">
                {MATERIALS.map((mat) => (
                  <div key={mat.title} className="bg-background p-6 flex gap-5 items-start hover:bg-dark transition-colors duration-300 group">
                    <div className="mt-1 shrink-0">
                      <Icon name={mat.icon} size={22} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-foreground text-sm font-semibold tracking-wide mb-1">{mat.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{mat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 bg-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={reviewsRef} className="section-fade">
            <SectionTitle label="Что говорят клиенты" title="Отзывы" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {REVIEWS.map((review, i) => (
                <div key={i} className="bg-dark p-8 hover:bg-dark-100 transition-colors duration-300">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <span key={j} className="text-gold text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-foreground text-sm leading-relaxed mb-6 font-light italic">
                    «{review.text}»
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-foreground text-sm font-semibold">{review.name}</p>
                      <p className="text-muted-foreground text-xs">{review.city}</p>
                    </div>
                    <p className="text-gold text-xs tracking-widest">{review.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={promoRef} className="section-fade">
            <SectionTitle label="Актуальные предложения" title="Акции и скидки" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {[
                {
                  tag: "До 28 февраля",
                  title: "Скидка 15% на кухни",
                  desc: "При заказе кухни до конца февраля получите скидку 15% на весь заказ, включая монтаж.",
                  cta: "Заказать кухню",
                  highlight: true,
                },
                {
                  tag: "Постоянно",
                  title: "Рассрочка 0%",
                  desc: "Оформите рассрочку без переплат на 6 или 12 месяцев. Первый взнос от 50%.",
                  cta: "Узнать подробнее",
                  highlight: false,
                },
                {
                  tag: "При заказе от 150 000 ₽",
                  title: "Бесплатный дизайн",
                  desc: "Профессиональная 3D-визуализация вашего интерьера совершенно бесплатно.",
                  cta: "Получить дизайн",
                  highlight: false,
                },
              ].map((promo, i) => (
                <div
                  key={i}
                  className={`p-8 flex flex-col gap-4 ${promo.highlight ? "bg-gold/10 border-l-2 border-gold" : "bg-dark"}`}
                >
                  <span className="text-gold text-xs tracking-[0.2em] uppercase">{promo.tag}</span>
                  <h3 className="font-cormorant text-3xl text-foreground font-light">{promo.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{promo.desc}</p>
                  <button
                    onClick={() => scrollTo("contact")}
                    className={`px-6 py-3 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                      promo.highlight
                        ? "bg-gold text-white hover:bg-gold-light"
                        : "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10"
                    }`}
                  >
                    {promo.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div ref={faqRef} className="section-fade">
            <SectionTitle label="Вопросы и ответы" title="Часто спрашивают" />
            <div className="space-y-px">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="bg-background border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-dark transition-colors duration-300"
                  >
                    <span className="text-foreground text-sm font-medium tracking-wide pr-4">{item.q}</span>
                    <Icon
                      name={openFaq === i ? "Minus" : "Plus"}
                      size={18}
                      className="text-gold shrink-0"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 animate-fade-in">
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div ref={contactRef} className="section-fade">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <SectionTitle label="Свяжитесь с нами" title="Оставить заявку" />
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  Оставьте заявку — наш менеджер свяжется с вами в течение 30 минут и ответит на все вопросы.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
                    setFormData({ name: "", phone: "", message: "" });
                  }}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Александр"
                      className="w-full bg-dark border border-border text-foreground px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-dark border border-border text-foreground px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs tracking-widest uppercase text-muted-foreground mb-2 block">Описание проекта</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Расскажите о вашем проекте: что хотите заказать, размеры, пожелания..."
                      className="w-full bg-dark border border-border text-foreground px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gold text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(184,145,58,0.4)]"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-muted-foreground text-xs">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-gold text-xs tracking-[0.3em] uppercase mb-6">Контактная информация</p>
                  <div className="space-y-5">
                    {[
                      { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                      { icon: "Mail", label: "Email", value: "info@mebelex.ru" },
                      { icon: "MapPin", label: "Адрес производства", value: "Москва, ул. Производственная, 1" },
                      { icon: "Clock", label: "Режим работы", value: "Пн–Сб: 9:00–20:00, Вс: 10:00–18:00" },
                    ].map((item) => (
                      <div key={item.label} className="flex gap-4 items-start">
                        <div className="w-10 h-10 border border-gold/30 flex items-center justify-center shrink-0">
                          <Icon name={item.icon} size={16} className="text-gold" />
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs tracking-widest uppercase mb-1">{item.label}</p>
                          <p className="text-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Социальные сети</p>
                  <div className="flex gap-3">
                    {[
                      { icon: "MessageCircle", label: "VK" },
                      { icon: "Send", label: "Telegram" },
                      { icon: "Share2", label: "Instagram" },
                      { icon: "Youtube", label: "YouTube" },
                    ].map((soc) => (
                      <button
                        key={soc.label}
                        className="w-10 h-10 border border-border flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 group"
                        title={soc.label}
                      >
                        <Icon name={soc.icon} size={16} className="text-muted-foreground group-hover:text-gold transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-dark border border-border p-6">
                  <p className="text-foreground font-cormorant text-2xl font-light mb-2">Онлайн-консультант</p>
                  <p className="text-muted-foreground text-xs mb-4">Ответим на все вопросы прямо сейчас</p>
                  <button className="flex items-center gap-2 text-gold text-xs tracking-widest uppercase hover:text-gold-light transition-colors">
                    <Icon name="MessageSquare" size={16} />
                    Начать чат
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-cormorant text-2xl text-gold font-medium tracking-widest">МЕБЕЛЕКС</div>
          <p className="text-muted-foreground text-xs">© 2024 Мебелекс. Все права защищены.</p>
          <div className="flex gap-6">
            {["Политика конфиденциальности", "Оферта"].map((link) => (
              <button key={link} className="text-muted-foreground text-xs hover:text-gold transition-colors">
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <button
        onClick={() => scrollTo("contact")}
        className="fixed bottom-6 right-6 z-50 bg-gold text-dark w-14 h-14 flex items-center justify-center shadow-[0_4px_30px_rgba(201,169,110,0.5)] hover:bg-gold-light hover:scale-110 transition-all duration-300"
        title="Оставить заявку"
      >
        <Icon name="Phone" size={22} />
      </button>
    </div>
  );
}