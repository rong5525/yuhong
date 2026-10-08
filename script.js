const languageButton = document.getElementById("language-switch");
const translatableElements = document.querySelectorAll("[data-zh][data-en]");
const languageOptions = document.querySelectorAll("[data-language-option]");
const navigationLinks = document.querySelectorAll('.main-nav a[href^="#"]');
const sections = document.querySelectorAll(".section-anchor");

function applyLanguage(language) {
  const isChinese = language === "zh";

  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.title = isChinese
    ? "李羽弘 · 个人主页"
    : "Yuhong Li · Personal Homepage";

  translatableElements.forEach((element) => {
    element.textContent = element.dataset[language];
  });

  languageOptions.forEach((option) => {
    option.classList.toggle("is-active", option.dataset.languageOption === language);
  });

  languageButton.dataset.language = language;
  languageButton.setAttribute("aria-label", isChinese ? "Switch to English" : "切换到中文");
  localStorage.setItem("yuhong-language", language);
}

const savedLanguage = localStorage.getItem("yuhong-language");
applyLanguage(savedLanguage === "en" ? "en" : "zh");

languageButton.addEventListener("click", () => {
  applyLanguage(languageButton.dataset.language === "zh" ? "en" : "zh");
});

document.getElementById("print-resume").addEventListener("click", () => {
  window.print();
});

document.getElementById("current-year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    navigationLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visibleEntry.target.id}`);
    });
  },
  { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] },
);

sections.forEach((section) => observer.observe(section));
