const themeBtn = document.getElementById("themeBtn");
const THEME_STORAGE_KEY = "code-prep-theme";

const applyTheme = (theme, animate = false) => {
  const isDark = theme === "dark";

  if (animate) {
    const animationClass = isDark ? "to-dark" : "to-light";

    // Start the orbit from the CURRENT visual state first. Previously the body
    // theme changed before the animation class was attached, which could make
    // the icon briefly jump/pop for one frame (especially while hovered).
    themeBtn.classList.remove("to-dark", "to-light");
    themeBtn.classList.add("is-animating", animationClass);

    document.body.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = theme;

    const finishAnimation = (event) => {
      // Two animations run at once, but the incoming icon starts 80ms later.
      // Wait for THAT final animation to finish. Removing the state when the
      // outgoing icon ends makes the incoming icon snap to its resting point.
      if (event.animationName !== "theme-rise-from-west") return;

      themeBtn.classList.remove("to-dark", "to-light", "is-animating");
      themeBtn.removeEventListener("animationend", finishAnimation);
    };

    themeBtn.addEventListener("animationend", finishAnimation);
  } else {
    document.body.classList.toggle("dark", isDark);
    document.documentElement.dataset.theme = theme;
  }

  themeBtn.setAttribute("aria-pressed", String(isDark));
  themeBtn.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
};

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

themeBtn.addEventListener("click", () => {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme, true);
});

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".tab-panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => panel.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

const complexityItems = document.querySelectorAll(".complexity-item");
const complexityNote = document.getElementById("complexityNote");

complexityItems.forEach((item) => {
  item.addEventListener("click", () => {
    complexityNote.innerHTML = `<b>${item.querySelector("strong").textContent}</b> · ${item.dataset.note}`;
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));


const updateMobileState = () => {
  document.documentElement.classList.toggle("is-mobile", window.innerWidth <= 760);
};

updateMobileState();
window.addEventListener("resize", updateMobileState);
