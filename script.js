const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const releaseList = document.querySelector("[data-release-list]");
const releaseToggle = document.querySelector("[data-release-toggle]");
const releaseFilters = document.querySelectorAll("[data-release-filter]");

document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link) return;

  const url = new URL(link.href);
  if (!["http:", "https:"].includes(url.protocol) || url.origin === window.location.origin) return;

  link.target = "_blank";
  link.rel = "noopener noreferrer";
});

const syncHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});


const clearReleaseFilters = () => {
  releaseFilters.forEach((button) => button.classList.remove("is-active"));
  releaseList?.querySelectorAll(".release-card").forEach((card) => {
    card.classList.remove("is-filtered-out");
  });
};

releaseFilters.forEach((button) => {
  button.addEventListener("click", () => {
    if (!releaseList) return;

    const filter = button.dataset.releaseFilter;
    releaseList.classList.remove("is-collapsed");
    releaseToggle.textContent = "Voir toutes les sorties";

    releaseFilters.forEach((item) => item.classList.toggle("is-active", item === button));
    releaseList.querySelectorAll(".release-card").forEach((card) => {
      card.classList.toggle("is-filtered-out", card.dataset.style !== filter);
    });

    window.requestAnimationFrame(() => {
      releaseList.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

releaseToggle?.addEventListener("click", () => {
  if (!releaseList) return;

  clearReleaseFilters();
  const isOpening = releaseList.classList.toggle("is-collapsed") === false;
  releaseToggle.textContent = isOpening ? "Reduire les sorties" : "Voir toutes les sorties";
});
