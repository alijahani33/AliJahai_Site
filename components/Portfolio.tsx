"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Globe,
  Mail,
  MapPin,
  Award,
  CheckCircle2,
  Cpu,
  Shield,
  Activity,
  Send,
  Zap,
} from "lucide-react";
import RastarBPMSDemo from "./RastarBPMSDemo";
import TicketingDashboard from "./TicketingDashboard";
import NetworkRescue from "./NetworkRescue";
import AIQualityControl from "./AIQualityControl";

// Inline custom SVG icons to avoid missing imports in lucide-react versions
const GithubIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 24}
    height={props.size || 24}
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={props.size || 24}
    height={props.size || 24}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const dict = {
  en: {
    name: "Seyed Ali Jahani",
    title: "Assistant IT Director & Hybrid Systems Expert",
    sub_title: "Damavand Energy Assaluyeh (Petrochemical Industry)",
    about_nav: "About",
    experience_nav: "Experience",
    products_nav: "Products",
    projects_nav: "Projects",
    contact_nav: "Contact",
    about_pitch: "Architecting resilient, mission-critical network infrastructures by day, and engineering high-throughput AI & software frameworks by night. A hybrid expert bridging industrial networking (STP/RSTP topology, Zabbix monitoring, Cisco grid hardening) and scalable web systems.",
    about_p1: "I specialize in securing and maintaining critical infrastructure. At Damavand Energy Assaluyeh, I manage networks powering essential petrochemical systems, resolving critical outages (like a year-long broadcast loop) and establishing proactive real-time dashboard alerts. Simultaneously, I develop enterprise software pipelines to automate tasks and build custom AI-powered search vaults.",
    choose_path: "Choose Your Path",
    audience_desc: "Filter operational metrics and engineering strengths by your profile:",
    enterprises: "Enterprises",
    startups: "Startups",
    tech_peers: "Tech Peers",
    enterprises_desc: "Guaranteeing 99.9% uptime for mission-critical petrochemical networks. Securing infrastructure through switching core modernization, VLAN isolation, strict port security policies, and real-time syslog alerts.",
    startups_desc: "Building scalable on-premises software architectures (FastAPI, React, Docker). Designing visual workflow engines and IT ticketing platforms to automate organization-wide pipelines.",
    tech_peers_desc: "M.Sc. research in remote sensing scene classification using deep learning. Developed real-time CNN defect detection models running at 400 FPS with 99% accuracy.",
    skills_title: "Technical Stack",
    exp_title: "Professional Experience",
    edu_title: "Education",
    contact_title: "Let's Build Something Secure & Intelligent",
    contact_subtitle: "Drop a line for consulting on network security audits, enterprise workflow automation, or industrial AI integration.",
    form_name: "Your Name",
    form_email: "Your Email Address",
    form_msg: "Message Content",
    form_send: "Send Secure Message",
    form_success: "Your message has been sent successfully!",
    sending: "Sending...",
    loc_lbl: "Location",
    loc_val: "Bushehr, Jam",
    cert_lbl: "Certificates & Courses",
    thesis_lbl: "M.Sc. Thesis: Drone Image Scene Detection using Deep Learning (GPA: 18.5/20)",
  },
  fa: {
    name: "سید علی جهانی",
    title: "جانشین معاونت فناوری اطلاعات و ارتباطات",
    sub_title: "دماوند انرژی عسلویه (صنعت پتروشیمی)",
    about_nav: "درباره من",
    experience_nav: "سوابق شغلی",
    products_nav: "محصولات",
    projects_nav: "پروژه‌ها",
    contact_nav: "ارتباط با من",
    about_pitch: "معماری زیرساخت‌های حیاتی شبکه در صنایع پتروشیمی در روز، و مهندسی سیستم‌های نرم‌افزاری و مدل‌های هوش مصنوعی با کارایی بالا در شب. متخصص دووجهی (Hybrid) پل زننده میان شبکه‌های صنعتی عسلویه و توسعه میکروسرویس‌های خودمستقر.",
    about_p1: "من در تامین پایداری و امنیت بستر ارتباطی صنایع بزرگ فعالیت می‌کنم. در شرکت دماوند انرژی عسلویه، به عیب‌یابی پیچیده‌ترین مشکلات شبکه (از جمله ریشه‌یابی و رفع معضل لوپ‌های پخش یک‌ساله) و راه‌اندازی مانیتورینگ پیشگیرانه پرداختم. همزمان، سامانه‌های بومی فرم‌ساز و موتورهای گردش‌کار سازمانی مبتنی بر هوش مصنوعی را توسعه می‌دهم.",
    choose_path: "مسیر خود را انتخاب کنید",
    audience_desc: "متریک‌ها و توانمندی‌های مهندسی را متناسب با مشخصات خود فیلتر کنید:",
    enterprises: "سازمان‌های بزرگ",
    startups: "استارتاپ‌ها",
    tech_peers: "همکاران فنی",
    enterprises_desc: "تضمین پایداری ۹۹.۹ درصدی در شبکه‌های حساس صنعتی پتروشیمی. سخت‌سازی زیرساخت سوئیچینگ مرکزی، جداسازی ترافیکی VLANها، پیاده‌سازی Port Security و مانیتورینگ زبیکس.",
    startups_desc: "طراحی و توسعه سامانه‌های سازمانی خودمستقر با لود سریع (FastAPI, React 19). بهینه‌سازی کانتینرهای Docker و ایجاد اتوماسیون‌های سفارشی گردش‌کار جهت دیجیتالی‌سازی فرآیندها.",
    tech_peers_desc: "پژوهشگر ارشد هوش مصنوعی با معدل ۱۸.۵ در حوزه سنجش از دور. توسعه‌دهنده مدل‌های یادگیری عمیق بینایی ماشین (CNN) با سرعت پردازش تصویر ۴۰۰ فریم بر ثانیه.",
    skills_title: "مهارت‌ها و فناوری‌ها",
    exp_title: "سوابق شغلی",
    edu_title: "سوابق تحصیلی",
    contact_title: "همکاری در پروژه‌های صنعتی و توسعه فناوری",
    contact_subtitle: "آماده ارائه مشاوره در زمینه مانیتورینگ پیشگیرانه شبکه، مکانیزه کردن فرآیندهای سازمانی و پیاده‌سازی بینایی ماشین در صنعت.",
    form_name: "نام شما",
    form_email: "نشانی ایمیل",
    form_msg: "متن پیام شما",
    form_send: "ارسال پیام امن",
    form_success: "پیام شما با موفقیت ارسال شد!",
    sending: "در حال ارسال...",
    loc_lbl: "موقعیت",
    loc_val: "بوشهر، جم",
    cert_lbl: "دوره‌ها و گواهینامه‌ها",
    thesis_lbl: "پایان‌نامه ارشد: تشخیص صحنه تصاویر پهپادی با یادگیری عمیق (معدل: ۱۸.۵)",
  },
};

const audienceMetrics = {
  enterprises: [
    { labelEn: "Network Uptime", labelFa: "پایداری شبکه صنعتی", value: "99.9%" },
    { labelEn: "MTTR Reduction", labelFa: "کاهش زمان رفع خرابی", value: "-40%" },
    { labelEn: "Switch Security", labelFa: "سخت‌سازی سوئیچ‌ها", value: "Hardened" },
  ],
  startups: [
    { labelEn: "AI Form Creation", labelFa: "سرعت ساخت فرم گردش‌کار", value: "<10m" },
    { labelEn: "Digitalization Time", labelFa: "کاهش زمان توسعه فرآیند", value: "-60%" },
    { labelEn: "Stack Architecture", labelFa: "استقرار میکروسرویس", value: "Docker-Ready" },
  ],
  tech_peers: [
    { labelEn: "CNN Inference", labelFa: "سرعت پردازش تصویر", value: "400 FPS" },
    { labelEn: "Master's GPA", labelFa: "معدل ارشد (هوش مصنوعی)", value: "18.5/20" },
    { labelEn: "Code Quality", labelFa: "معماری تمیز و ایمن", value: "Prod-Grade" },
  ],
};

const experienceData = [
  {
    roleEn: "Senior IT Assistant Director",
    roleFa: "کارشناس ارشد فناوری اطلاعات (جانشین معاونت)",
    companyEn: "Damavand Energy Assaluyeh (Petrochemical Industry)",
    companyFa: "دماوند انرژی عسلویه (صنعت پتروشیمی)",
    dateEn: "Oct 2025 - Present",
    dateFa: "مهر ۱۴۰۴ - اکنون",
    achievementsEn: [
      "Led the visual smart workflow builder & BPMS (Rastar) project, enabling AI-powered organizational forms setup in less than 10 mins.",
      "Identified and permanently resolved a critical 12-month network loop (Broadcast Loop), restoring 100% stability to industrial operations.",
      "Managed switches hardware replacement and firmware updates, resulting in enhanced network traffic security hardening.",
      "Designed and deployed a custom internal ticketing system with real-time dashboards to optimize SLA request tracking.",
      "Engineered an AI-based semantic search engine (NLP) to index and retrieve legal/technical documents (patent pending).",
    ],
    achievementsFa: [
      "مدیریت پروژه فرم‌ساز هوشمند و گردش‌کار راستار (Rastar)، با امکان ایجاد فرم در کمتر از ۱۰ دقیقه با هوش مصنوعی.",
      "عیب‌یابی، شناسایی ریشه و رفع مشکل پیچیده لوپ شبکه (Broadcast Loop) که بیش از ۱ سال باعث ناپایداری‌های مقطعی شده بود.",
      "رهبری نوسازی سخت‌افزاری و ارتقای فریمور تجهیزات سوئیچینگ به منظور سخت‌سازی امنیت ترافیک شبکه (Security Hardening).",
      "طراحی و پیاده‌سازی سامانه تیکتینگ بومی پشتیبانی مجهز به داشبوردهای مدیریتی جهت افزایش شفافیت خدمات IT.",
      "توسعه موتور جستجوی هوشمند مبتنی بر NLP برای طبقه‌بندی و دسترسی سریع به اسناد حقوقی و فنی سازمان (در حال ثبت اختراع).",
    ],
  },
  {
    roleEn: "IT Specialist",
    roleFa: "کارشناس فناوری اطلاعات و ارتباطات",
    companyEn: "Damavand Energy Assaluyeh",
    companyFa: "پروژه دماوند انرژی عسلویه",
    dateEn: "May 2024 - Oct 2025",
    dateFa: "اردیبهشت ۱۴۰۳ - مهر ۱۴۰۴",
    achievementsEn: [
      "Implemented comprehensive Zabbix monitoring for servers and switches, cutting down resolution times (MTTR).",
      "Managed switch/router configurations (VLANs, Port Security), reducing network downtime incidents significantly.",
      "Provided key L2 network infrastructure support and assisted in physical/software server migrations.",
      "Created dynamic internal process tools (e.g., employee representative election system).",
    ],
    achievementsFa: [
      "راه‌اندازی سامانه جامع مانیتورینگ Zabbix برای پایش لحظه‌ای سرورها و سوئیچ‌ها و کاهش چشمگیر زمان تشخیص خرابی (MTTR).",
      "مدیریت پیکربندی‌های شبکه (VLANs و Port Security) و رفع عیوب زیرساختی، که منجر به کاهش شدید تیکت‌های قطعی شد.",
      "ارائه پشتیبانی فنی تخصصی لایه ۲ و همکاری کلیدی در مهاجرت سرورها و شبکه‌های فیزیکی و مجازی سازمان.",
      "طراحی نرم‌افزار بومی و اختصاصی جهت برگزاری انتخابات الکترونیکی نماینده کارگری.",
    ],
  },
];

const educationData = [
  {
    degreeEn: "M.Sc. in Computer Engineering - Artificial Intelligence",
    degreeFa: "کارشناسی ارشد مهندسی کامپیوتر - گرایش هوش مصنوعی",
    schoolEn: "Islamic Azad University, Khorasgan, Isfahan",
    schoolFa: "دانشگاه آزاد اسلامی واحد خوراسگان اصفهان",
    dateEn: "2021 - 2023",
    dateFa: "مهر ۱۴۰۰ - شهریور ۱۴۰۲",
    gpaEn: "GPA: 18.5 / 20",
    gpaFa: "معدل: ۱۸.۵",
  },
  {
    degreeEn: "B.Sc. in Computer Engineering - Software",
    degreeFa: "کارشناسی مهندسی کامپیوتر - گرایش نرم‌افزار",
    schoolEn: "Islamic Azad University, Khorasgan, Isfahan",
    schoolFa: "دانشگاه آزاد اسلامی واحد خوراسگان اصفهان",
    dateEn: "2016 - 2021",
    dateFa: "مهر ۱۳۹۵ - تیر ۱۴۰۰",
  },
];

const skills = {
  infra: {
    titleEn: "Network & Security",
    titleFa: "شبکه و امنیت زیرساخت",
    items: ["Cisco CCNA/CCNP", "STP/RSTP Optimization", "VLANs & Routing", "Port Security", "Zabbix Monitoring", "Network Hardening"],
  },
  software: {
    titleEn: "Software & AI Dev",
    titleFa: "توسعه نرم‌افزار و هوش مصنوعی",
    items: ["Python / FastAPI", "Next.js / React 19", "Tailwind CSS", "Docker / DevOps", "Deep Learning (CNN)", "NLP / Document OCR"],
  },
};

export default function Portfolio() {
  const [lang, setLang] = useState<"fa" | "en">("fa");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState<"enterprises" | "startups" | "tech_peers">("enterprises");
  const [activeSection, setActiveSection] = useState("about");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Movement tracking for Spotlight Glow
  useEffect(() => {
    const updateMousePos = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePos);
    return () => window.removeEventListener("mousemove", updateMousePos);
  }, []);

  // Sync state with HTML attributes
  useEffect(() => {
    document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Scrollspy detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "experience", "products", "projects", "contact"];
      const scrollPosition = window.scrollY + 200; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => setLang((prev) => (prev === "en" ? "fa" : "en"));
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const t = dict[lang];
  const isRtl = lang === "fa";

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  // Custom Spring Animation Config
  const springAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { type: "spring" as const, stiffness: 100, damping: 15 },
  };

  const navItems = [
    { id: "about", labelEn: "About", labelFa: "درباره من" },
    { id: "experience", labelEn: "Experience", labelFa: "سوابق شغلی" },
    { id: "products", labelEn: "Products", labelFa: "محصولات" },
    { id: "projects", labelEn: "Projects", labelFa: "پروژه‌ها" },
    { id: "contact", labelEn: "Contact", labelFa: "ارتباط با من" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-zinc-800 dark:text-zinc-300 transition-colors duration-300 antialiased selection:bg-tech-indigo/30 selection:text-white">
      
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-[0.03] dark:opacity-[0.05] radial-fade -z-10 pointer-events-none" />

      {/* Interactive mouse glow overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-colors duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${
            theme === "dark" ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.05)"
          }, transparent 80%)`,
        }}
      />

      {/* Main Container */}
      <div className="mx-auto max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          
          {/* LEFT SIDE PANEL (Fixed on Desktop) */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              {/* Profile Meta info */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-tech-indigo/10 text-tech-indigo border border-tech-indigo/20">
                  <Zap size={12} className="animate-pulse" />
                  <span>{t.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
                  {t.name}
                </h1>
                <h2 className="text-sm md:text-base font-semibold text-zinc-650 dark:text-zinc-400">
                  {t.sub_title}
                </h2>
                <p className="max-w-xs text-xs md:text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {t.about_pitch}
                </p>
              </div>

              {/* Scrollspy Navigation Menu */}
              <nav className="nav hidden lg:block mt-16 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="group flex items-center py-2.5 transition-all"
                    >
                      <span
                        className={`h-px transition-all duration-300 ${
                          isRtl ? "ml-4" : "mr-4"
                        } ${
                          isActive
                            ? "w-16 bg-tech-indigo"
                            : "w-8 bg-zinc-300 dark:bg-zinc-700 group-hover:w-16 group-hover:bg-zinc-500"
                        }`}
                      />
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                          isActive
                            ? "text-zinc-950 dark:text-white"
                            : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-800 dark:group-hover:text-zinc-300"
                        }`}
                      >
                        {isRtl ? item.labelFa : item.labelEn}
                      </span>
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Controls and Socials */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-6 mt-12 lg:mt-0">
              
              {/* Lang/Theme switch buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleLanguage}
                  className="p-2.5 rounded-xl border border-zinc-250 dark:border-zinc-850 hover:border-zinc-450 bg-white/50 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
                  title="Switch Language"
                >
                  <Globe size={16} />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl border border-zinc-250 dark:border-zinc-850 hover:border-zinc-450 bg-white/50 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-450 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer"
                  title="Toggle Theme"
                >
                  {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/alijahani33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-100 transition-all"
                  title="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/alijahani33"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-100 transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="mailto:alijahani919@gmail.com"
                  className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-450 dark:hover:text-zinc-100 transition-all"
                  title="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </header>

          {/* RIGHT SIDE PANEL (Scrolls on Desktop) */}
          <main className="pt-24 lg:w-1/2 lg:py-24 space-y-28">
            
            {/* ABOUT SECTION */}
            <section id="about" className="space-y-4 scroll-mt-24">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50 lg:hidden">
                {t.about_nav}
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.about_p1}
              </p>
            </section>

            {/* AUDIENCE SWITCHER */}
            <section id="path" className="space-y-6 scroll-mt-24">
              <div className="space-y-1.5">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-50">
                  {t.choose_path}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-450">{t.audience_desc}</p>
              </div>

              {/* Tab selector */}
              <div className="flex">
                <div className="inline-flex p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-850 relative">
                  {(["enterprises", "startups", "tech_peers"] as const).map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className="relative px-3.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer z-10 text-zinc-500 dark:text-zinc-400 data-[active=true]:text-zinc-900 dark:data-[active=true]:text-white"
                        data-active={isActive}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeTabPillSpot"
                            className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/10 shadow-sm -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        {tab === "enterprises" ? t.enterprises : tab === "startups" ? t.startups : t.tech_peers}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab metrics info */}
              <div className="glass-card rounded-2xl p-6 border border-zinc-200/40 dark:border-zinc-850 shadow-sm space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-4"
                  >
                    <p className="text-xs leading-relaxed text-zinc-650 dark:text-zinc-400">
                      {activeTab === "enterprises"
                        ? t.enterprises_desc
                        : activeTab === "startups"
                        ? t.startups_desc
                        : t.tech_peers_desc}
                    </p>

                    <div className="grid grid-cols-3 gap-3">
                      {audienceMetrics[activeTab].map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-900 rounded-xl p-3"
                        >
                          <span className="text-[9px] text-zinc-500 block mb-0.5">
                            {isRtl ? metric.labelFa : metric.labelEn}
                          </span>
                          <span className="text-sm font-bold text-emerald-green font-mono">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* EXPERIENCE TIMELINE */}
            <section id="experience" className="space-y-8 scroll-mt-24">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                {t.exp_title}
              </h2>

              <div className="space-y-6">
                {experienceData.map((exp, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-2xl border border-zinc-150 dark:border-zinc-850/60 bg-white/30 dark:bg-zinc-900/10 hover:border-tech-indigo/40 hover:bg-white/50 dark:hover:bg-zinc-900/20 transition-all duration-300 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h3 className="font-bold text-zinc-900 dark:text-white text-sm">
                        {isRtl ? exp.roleFa : exp.roleEn}
                      </h3>
                      <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-450 border border-zinc-200/20">
                        {isRtl ? exp.dateFa : exp.dateEn}
                      </span>
                    </div>
                    
                    <p className="text-xs font-semibold text-tech-indigo mt-0.5">
                      {isRtl ? exp.companyFa : exp.companyEn}
                    </p>

                    <ul className="list-disc list-inside text-xs text-zinc-650 dark:text-zinc-400 space-y-1.5 pl-2 mt-4 leading-relaxed">
                      {(isRtl ? exp.achievementsFa : exp.achievementsEn).map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* PRODUCTS SHOWCASE */}
            <section id="products" className="space-y-8 scroll-mt-24">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                {t.products_nav}
              </h2>
              
              <div className="space-y-12">
                <RastarBPMSDemo lang={lang} />
                <TicketingDashboard lang={lang} />
              </div>
            </section>

            {/* PROJECTS AND CASE STUDIES */}
            <section id="projects" className="space-y-8 scroll-mt-24">
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                {t.projects_nav}
              </h2>

              <div className="space-y-12">
                <NetworkRescue lang={lang} />
                <AIQualityControl lang={lang} />
              </div>
            </section>

            {/* EDUCATION AND CERTIFICATIONS */}
            <section className="space-y-12">
              
              {/* Education */}
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                  {t.edu_title}
                </h2>
                
                <div className="space-y-4">
                  {educationData.map((edu, i) => (
                    <div key={i} className="bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl p-5 border border-zinc-150 dark:border-zinc-850">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm text-zinc-900 dark:text-white">
                          {isRtl ? edu.degreeFa : edu.degreeEn}
                        </h3>
                        <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500">
                          {isRtl ? edu.dateFa : edu.dateEn}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-tech-indigo mt-1">
                        {isRtl ? edu.schoolFa : edu.schoolEn}
                      </p>
                      {edu.gpaEn && (
                        <span className="inline-block text-[9px] font-mono bg-emerald-green/10 text-emerald-green px-2 py-0.5 rounded mt-2">
                          {isRtl ? edu.gpaFa : edu.gpaEn}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack Details */}
              <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                  {t.skills_title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Network Stack */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      {isRtl ? skills.infra.titleFa : skills.infra.titleEn}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.infra.items.map((item, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dev Stack */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-mono">
                      {isRtl ? skills.software.titleFa : skills.software.titleEn}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.software.items.map((item, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 text-zinc-800 dark:text-zinc-300">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </section>

            {/* CONTACT FORM */}
            <section id="contact" className="space-y-6 scroll-mt-24">
              <div className="space-y-1.5">
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-50">
                  {t.contact_nav}
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-450 leading-relaxed">
                  {t.contact_subtitle}
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-semibold text-zinc-450 uppercase tracking-wider">{t.form_name}</label>
                    <input
                      type="text"
                      required
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/30 focus:outline-none focus:border-tech-indigo transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-semibold text-zinc-450 uppercase tracking-wider">{t.form_email}</label>
                    <input
                      type="email"
                      required
                      className="w-full text-xs px-3.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/30 focus:outline-none focus:border-tech-indigo transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-semibold text-zinc-450 uppercase tracking-wider">{t.form_msg}</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full text-xs px-3.5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-black/30 focus:outline-none focus:border-tech-indigo transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold bg-tech-indigo text-white hover:bg-tech-indigo/90 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-tech-indigo/20 disabled:opacity-50"
                >
                  <Send size={12} />
                  <span>{isSubmitting ? t.sending : t.form_send}</span>
                </button>

                {formSubmitted && (
                  <div className="flex items-center gap-2 text-xs text-emerald-green bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20 animate-fade-in">
                    <CheckCircle2 size={14} />
                    <span>{t.form_success}</span>
                  </div>
                )}
              </form>
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-250/50 dark:border-zinc-850/50 pt-8 pb-16 text-[9px] text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4">
              <span>© 2026 Seyed Ali Jahani. All rights reserved.</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-green"></span>
                {isRtl ? "امنیت زیرساخت و نوآوری نرم‌افزاری" : "Bilingual Enterprise Dev Portfolio"}
              </span>
            </footer>

          </main>

        </div>
      </div>
    </div>
  );
}
