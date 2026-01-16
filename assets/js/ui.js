/* =========================================================
   NESTORA – UI LAYER
   Handles:
   - Section navigation
   - Rendering helpers
   - Toast notifications
   - Global UI state sync
========================================================= */

import { appConfig, state } from "./data.js";
import { renderSearchResults, updateStats } from "./search.js";

/* ===============================
   SECTION NAVIGATION
================================ */

export function showSection(sectionId) {
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    section.classList.add("hidden");
  });

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (sectionId === "search") {
    renderSearchResults();
    updateStats();
  }
}

/* ===============================
   APPLY BRAND CONFIG
================================ */

export function applyConfig() {
  const navBrand = document.getElementById("nav-brand");
  const footerBrand = document.getElementById("footer-brand");
  const footerTagline = document.getElementById("footer-tagline");
  const heroTitle = document.getElementById("hero-title");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const ctaText = document.getElementById("cta-text");

  if (navBrand) navBrand.textContent = appConfig.brandName;
  if (footerBrand) footerBrand.textContent = appConfig.brandName;
  if (footerTagline) footerTagline.textContent = appConfig.tagline;

  if (heroTitle) {
    heroTitle.innerHTML = `
      ${appConfig.heroTitle.replace(
        "Student Home",
        `<span class="text-gradient block">Student Home</span>`
      )}
    `;
  }

  if (heroSubtitle) heroSubtitle.textContent = appConfig.heroSubtitle;
  if (ctaText) ctaText.textContent = appConfig.ctaText;
}

/* ===============================
   PROPERTY CARD (GRID)
================================ */

export function createPropertyCard(property) {
  return `
    <div class="property-card glass rounded-2xl overflow-hidden">
      <div class="h-44 relative">
        <img
          src="${property.image}"
          alt="${property.name}"
          class="w-full h-full object-cover"
          onerror="this.style.display='none'"
        />
        ${
          property.verified
            ? `<span class="absolute top-3 left-3 px-3 py-1 bg-[#6FFFE9]/20 backdrop-blur rounded-full text-xs text-[#6FFFE9]">✓ Verified</span>`
            : ""
        }
        <span class="absolute top-3 right-3 glass px-3 py-1 rounded-full text-xs">
          TrustScore™ ${property.trustScore}
        </span>
      </div>

      <div class="p-5">
        <div class="flex justify-between items-start mb-2">
          <h3 class="font-semibold text-lg">${property.name}</h3>
          <span class="text-sm text-yellow-400">★ ${property.rating}</span>
        </div>

        <p class="text-sm text-gray-400 mb-3">
          ${property.city} • ${property.distanceMiles} mi from ${property.university}
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          <span class="px-2 py-1 bg-[#1C2541] rounded-lg text-xs">
            ${property.type}
          </span>
          <span class="px-2 py-1 bg-[#1C2541] rounded-lg text-xs">
            ${property.bedrooms} bed • ${property.bathrooms} bath
          </span>
        </div>

        <div class="flex justify-between items-end">
          <div>
            <p class="text-xl font-bold text-gradient">
              $${property.price.toLocaleString()}
            </p>
            <p class="text-xs text-gray-400">
              TrueCost™ $${property.trueCost.toLocaleString()}/mo
            </p>
          </div>

          <button
            class="btn-primary px-4 py-2 rounded-xl text-sm text-[#0B132B] font-medium"
            onclick="window.showPropertyDetail(${property.id})"
          >
            View
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ===============================
   PROPERTY DETAILS (PLACEHOLDER)
================================ */

window.showPropertyDetail = function (id) {
  showToast("Property details page coming soon!");
};

/* ===============================
   TOAST NOTIFICATION
================================ */

export function showToast(message) {
  const toast = document.createElement("div");

  toast.className =
    "fixed bottom-24 right-6 glass rounded-xl px-6 py-4 z-50 max-w-sm animate-slide-up";

  toast.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-[#6FFFE9]/20 flex items-center justify-center">
        ✓
      </div>
      <p class="text-sm">${message}</p>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};

/* ===============================
   GLOBAL CLICK HELPERS
================================ */

window.showSection = showSection;

/* ===============================
   INITIAL UI BOOTSTRAP
================================ */

export function initUI() {
  applyConfig();

  // Hero CTA
  const heroCTA = document.getElementById("hero-cta");
  if (heroCTA) {
    heroCTA.addEventListener("click", () => showSection("search"));
  }
}
