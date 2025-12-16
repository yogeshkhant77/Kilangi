const searchInput = document.querySelector("#searchInput");
const clearSearch = document.querySelector("#clearSearch");
const navLinks = document.querySelectorAll(".nav a");
const cartBadge = document.querySelector("#cartBadge");
const heart = document.querySelector('[alt="Favorites"]');
const cta = document.querySelector(".cta");
const filterPills = document.querySelectorAll(".filter-pill");

function toggleClearButton() {
  clearSearch.style.opacity = searchInput.value ? 1 : 0;
}

function setActiveNav(event) {
  navLinks.forEach((link) => link.classList.remove("active"));
  event.target.classList.add("active");
}

function bumpBadge(badge) {
  badge.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.2)" },
      { transform: "scale(1)" },
    ],
    {
      duration: 180,
      easing: "ease-in-out",
    }
  );
}

if (searchInput) {
  searchInput.addEventListener("input", toggleClearButton);
  searchInput.addEventListener("focus", () =>
    searchInput.classList.add("focused")
  );
  searchInput.addEventListener("blur", () =>
    searchInput.classList.remove("focused")
  );
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const term = searchInput.value.trim();
      if (term) {
        alert(`Searching for “${term}”`);
      }
    }
  });
}

if (clearSearch) {
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    toggleClearButton();
    searchInput.focus();
  });
}

navLinks.forEach((link) => link.addEventListener("click", setActiveNav));

if (cta && cartBadge) {
  cta.addEventListener("click", () => {
    const current = parseInt(cartBadge.textContent || "0", 10);
    cartBadge.textContent = current + 1;
    bumpBadge(cartBadge);
  });
}

if (heart) {
  heart.addEventListener("click", () => {
    const current = parseInt(heart.dataset.counter || "0", 10);
    const next = current + 1;
    heart.dataset.counter = String(next);
    heart.classList.toggle("hearted");
    bumpBadge(heart);
  });
}

if (filterPills.length) {
  filterPills.forEach((pill) =>
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    })
  );
}

const swatches = document.querySelectorAll(".swatch");
swatches.forEach((swatch) => {
  swatch.addEventListener("click", (e) => {
    const swatchGroup = swatch.parentElement;
    const allSwatches = swatchGroup.querySelectorAll(".swatch");
    const productImage = swatch
      .closest(".product-card")
      .querySelector(".product-image img");
    const variant = swatch.dataset.variant;

    allSwatches.forEach((s) => s.classList.remove("active"));

    swatch.classList.add("active");

    if (productImage) {
      const imageSrc = productImage.dataset[variant];
      if (imageSrc) {
        productImage.style.opacity = "0";
        setTimeout(() => {
          productImage.src = imageSrc;
          productImage.style.opacity = "1";
        }, 200);
      }
    }
  });
});

toggleClearButton();

document.addEventListener("DOMContentLoaded", () => {
  const autoSelectors = [
    ".hero-content",
    ".bestseller",
    ".gifts-celebrate",
    ".lab-grown",
    ".testimonials",
    ".footer-top",
  ];
  autoSelectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el && !el.classList.contains("animate-on-scroll")) {
      el.classList.add("animate-on-scroll");
    }
  });

  const staggerTargets = document.querySelectorAll(
    ".features-grid, .benefit-cards, .testimonials-grid, .product-grid"
  );
  staggerTargets.forEach((t) => t.classList.add("animate-stagger"));

  const primary = document.querySelector(".cta");
  if (primary) primary.classList.add("shimmer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.add("in-view");

          if (el.classList.contains("animate-stagger")) {
            Array.from(el.children).forEach((child, i) => {
              const delay = i * 80; // ms
              child.style.transitionDelay = `${delay}ms`;
            });
          }

          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );

  document
    .querySelectorAll(".animate-on-scroll, .animate-stagger")
    .forEach((el) => {
      observer.observe(el);
    });

  window.setTimeout(() => {
    document.body.classList.add("preload-done");
  }, 250);
});
