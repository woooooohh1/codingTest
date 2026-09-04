const themeBtn = document.getElementById("themeBtn");

const syncThemeButton = () => {
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
};

syncThemeButton();

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  syncThemeButton();
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
