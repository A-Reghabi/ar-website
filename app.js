"use strict";

const translations = {
  en: {
    skip: "Skip to content", name: "Alireza Reghabi", navAbout: "About", navWork: "Experience", navSkills: "Skills", navContact: "Contact", letsTalk: "Let's talk", scrollHint: "Scroll to explore",
    role: "AI engineer · Tehran, Iran", heroLine1: "Curious mind.", heroLine2: "Practical AI", heroDescription: "I'm Alireza. I work with Python, machine learning, and language models, with an eye for the people who use them.", explore: "Explore my work", resume: "Download CV", heroNote: "M.Sc. student in AI & Robotics at Kharazmi University", portraitCaption: "Engineer. Student. Builder.", toolStrip: "Tools I work with",
    aboutLabel: "A little about me", aboutTitle: "Engineering with a human perspective.", aboutLead: "I enjoy the space where AI engineering meets useful, well-designed software.", aboutBody: "I'm pursuing a master's in Artificial Intelligence and Robotics at Kharazmi University. During my internship at MegaChat, I applied LangChain and AI development skills in a production setting. Alongside programming, I work with Figma for UI/UX design and have experience creating social media content.",
    workLabel: "Experience & exploration", workTitle: "Learning by building.", allRepos: "Explore my GitHub", internship: "Internship", internshipDate: "Sep – Nov 2025", megachatTitle: "AI engineering at MegaChat", megachatDescription: "Hands-on AI development in a production team, applying LangChain and Python to real engineering work.", aiDevelopment: "AI development", readResume: "Read my experience", repositories: "Repositories", publicCode: "Public code", githubTitle: "An open notebook of code", githubDescription: "Visit my GitHub for public repositories, programming exercises, and the code I share as I learn.", programming: "Programming", browseRepos: "Browse repositories",
    skillsLabel: "My toolkit", skillsTitle: "The tools behind the work.", skillsDescription: "A Python foundation, an AI toolkit, and an interest in how software looks and works.", skillAI: "Language models & AI", prompt: "Prompt engineering", skillML: "Machine learning", skillData: "Programming & data", skillDesign: "Design & communication", content: "Content creation",
    educationLabel: "Education & credentials", educationTitle: "A foundation for what's next.", mastersDate: "2024 – Present", kharazmi: "Kharazmi University", masters: "M.Sc. in AI & Robotics", mastersDescription: "Admitted through the university's gifted student program.", bachelors: "B.Sc. in Computer Engineering", bachelorsDescription: "Graduated among the top 10 students of my entry year.", certifications: "Continued learning", coursera: "Supervised Machine Learning: Regression and Classification", pythonCourse: "Python",
    contactLabel: "Get in touch", contactTitle1: "Have an idea?", contactTitle2: "Let's talk about it.", contactDescription: "For AI engineering opportunities, collaborations, or a conversation about something you're building.", emailMe: "Send me an email", copyEmail: "Copy email", copied: "Email copied.", copyFailed: "Select the email address above to copy it.", backToTop: "Back to top",
    menuOpen: "Open navigation", menuClose: "Close navigation", portraitAlt: "Portrait of Alireza Reghabi", title: "Alireza Reghabi | AI Engineer", description: "Alireza Reghabi, AI engineer and AI & Robotics master's student at Kharazmi University. Python, machine learning, LangChain, and RAG."
  },
  fa: {
    skip: "رفتن به محتوای اصلی", name: "علیرضا رقابی", navAbout: "دربارهٔ من", navWork: "تجربه‌ها", navSkills: "مهارت‌ها", navContact: "تماس", letsTalk: "گفت‌وگو کنیم", scrollHint: "برای کشف بیشتر اسکرول کنید",
    role: "مهندس هوش مصنوعی · تهران، ایران", heroLine1: "ذهن کنجکاو.", heroLine2: "هوش مصنوعی کاربردی.", heroDescription: "من علیرضا هستم. با پایتون، یادگیری ماشین و مدل‌های زبانی کار می‌کنم و به تجربهٔ افرادی که از آن‌ها استفاده می‌کنند اهمیت می‌دهم.", explore: "آشنایی با کارهای من", resume: "دریافت رزومه", heroNote: "دانشجوی کارشناسی ارشد هوش مصنوعی و رباتیک دانشگاه خوارزمی", portraitCaption: "مهندس. دانشجو. علاقه‌مند به ساختن.", toolStrip: "ابزارهایی که با آن‌ها کار می‌کنم",
    aboutLabel: "کمی دربارهٔ من", aboutTitle: "مهندسی با توجه به آدم‌ها.", aboutLead: "به ساخت نرم‌افزارهای کاربردی با هوش مصنوعی و طراحی خوب علاقه دارم.", aboutBody: "در مقطع کارشناسی ارشد هوش مصنوعی و رباتیک دانشگاه خوارزمی تحصیل می‌کنم. در دورهٔ کارآموزی MegaChat، از LangChain و مهارت‌های توسعهٔ هوش مصنوعی در محیط عملیاتی استفاده کردم. در کنار برنامه‌نویسی، با Figma طراحی رابط و تجربهٔ کاربری انجام می‌دهم و در تولید محتوای شبکه‌های اجتماعی هم تجربه دارم.",
    workLabel: "تجربه و یادگیری", workTitle: "یادگیری با ساختن.", allRepos: "مشاهدهٔ گیت‌هاب من", internship: "کارآموزی", internshipDate: "سپتامبر تا نوامبر ۲۰۲۵", megachatTitle: "مهندسی هوش مصنوعی در MegaChat", megachatDescription: "تجربهٔ عملی توسعهٔ هوش مصنوعی در یک تیم محصول، با استفاده از LangChain و پایتون در محیط عملیاتی.", aiDevelopment: "توسعهٔ هوش مصنوعی", readResume: "مطالعهٔ سوابق من", repositories: "مخازن کد", publicCode: "کدهای عمومی", githubTitle: "دفتر یادگیری من با کد", githubDescription: "مخازن عمومی، تمرین‌های برنامه‌نویسی و کدهایی که در مسیر یادگیری به اشتراک می‌گذارم را در گیت‌هاب ببینید.", programming: "برنامه‌نویسی", browseRepos: "دیدن مخازن کد",
    skillsLabel: "ابزارهای من", skillsTitle: "ابزارهایی برای ساختن.", skillsDescription: "برنامه‌نویسی با پایتون، ابزارهای هوش مصنوعی و توجه به طراحی و عملکرد نرم‌افزار.", skillAI: "مدل‌های زبانی و هوش مصنوعی", prompt: "مهندسی پرامپت", skillML: "یادگیری ماشین", skillData: "برنامه‌نویسی و داده", skillDesign: "طراحی و ارتباطات", content: "تولید محتوا",
    educationLabel: "تحصیلات و گواهی‌ها", educationTitle: "پایه‌ای برای ادامهٔ مسیر.", mastersDate: "۲۰۲۴ تاکنون", kharazmi: "دانشگاه خوارزمی", masters: "کارشناسی ارشد هوش مصنوعی و رباتیک", mastersDescription: "پذیرش از طریق برنامهٔ استعدادهای درخشان دانشگاه.", bachelors: "کارشناسی مهندسی کامپیوتر", bachelorsDescription: "فارغ‌التحصیل در میان ۱۰ دانشجوی برتر ورودی خود.", certifications: "ادامهٔ یادگیری", coursera: "یادگیری ماشین نظارت‌شده، رگرسیون و دسته‌بندی", pythonCourse: "پایتون",
    contactLabel: "در ارتباط باشیم", contactTitle1: "ایده‌ای دارید؟", contactTitle2: "درباره‌اش صحبت کنیم.", contactDescription: "برای فرصت‌های مهندسی هوش مصنوعی، همکاری یا گفت‌وگو دربارهٔ پروژه‌ای که در حال ساخت آن هستید.", emailMe: "ارسال ایمیل", copyEmail: "کپی ایمیل", copied: "ایمیل کپی شد.", copyFailed: "برای کپی، آدرس ایمیل بالا را انتخاب کنید.", backToTop: "بازگشت به بالا",
    menuOpen: "باز کردن منو", menuClose: "بستن منو", portraitAlt: "عکس علیرضا رقابی", title: "علیرضا رقابی | مهندس هوش مصنوعی", description: "علیرضا رقابی، مهندس هوش مصنوعی و دانشجوی کارشناسی ارشد هوش مصنوعی و رباتیک دانشگاه خوارزمی. پایتون، یادگیری ماشین، LangChain و RAG."
  }
};

let currentLanguage = "en";
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.getElementById("mobile-nav");

function setLanguage(language) {
  currentLanguage = language === "fa" ? "fa" : "en";
  const text = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(element => {
    if (text[element.dataset.i18n]) element.textContent = text[element.dataset.i18n];
  });
  document.querySelectorAll("[data-lang]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === currentLanguage));
  });
  document.title = text.title;
  document.querySelector('meta[name="description"]').content = text.description;
  document.querySelector('meta[property="og:title"]').content = text.title;
  document.querySelector('meta[property="og:description"]').content = text.description;
  document.querySelector(".portrait-frame img").alt = text.portraitAlt;
  menuButton.setAttribute("aria-label", text[mobileNav.hidden ? "menuOpen" : "menuClose"]);
  document.getElementById("copy-status").textContent = "";
  try { localStorage.setItem("portfolio-language", currentLanguage); } catch { /* Language still works when storage is unavailable. */ }
}

document.querySelectorAll("[data-lang]").forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", translations[currentLanguage].menuOpen);
}

menuButton.addEventListener("click", () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", translations[currentLanguage][opening ? "menuClose" : "menuOpen"]);
});
mobileNav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
window.matchMedia("(min-width: 761px)").addEventListener("change", event => { if (event.matches) closeMenu(); });

document.getElementById("copy-email").addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText("a.reghabi1380@gmail.com");
    status.textContent = translations[currentLanguage].copied;
  } catch {
    status.textContent = translations[currentLanguage].copyFailed;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
let savedLanguage;
try { savedLanguage = localStorage.getItem("portfolio-language"); } catch { /* Use the default language. */ }
setLanguage(savedLanguage === "fa" || savedLanguage === "en" ? savedLanguage : "en");

if ("IntersectionObserver" in window) {
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    });
  }, { rootMargin: "-15% 0px -55% 0px", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
}
