/* =========================================================
   NESTORA – SEARCH & FILTER LAYER
   Handles:
   - Filtering
   - Sorting
   - Rendering search results
   - Stats calculation
========================================================= */

import { state } from "./data.js";
import { createPropertyCard, showToast } from "./ui.js";

/* ===============================
   APPLY FILTERS
================================ */

export function applyFilters(filters = {}) {
  state.activeFilters = filters;

  state.filteredProperties = state.properties.filter(p => {
    // University
    if (filters.university && p.university !== filters.university) {
      return false;
    }

    // Property Type
    if (filters.type && p.type !== filters.type) {
      return false;
    }

    // Trust Score
    if (filters.trustScore && p.trustScore < filters.trustScore) {
      return false;
    }

    // Amenity
    if (filters.amenity && !p.amenities.includes(filters.amenity)) {
      return false;
    }

    // Price Range (TrueCost)
    if (filters.priceRange) {
      const cost = p.trueCost;

      switch (filters.priceRange) {
        case "$500 - $800":
          if (cost < 500 || cost > 800) return false;
          break;
        case "$800 - $1,200":
          if (cost < 800 || cost > 1200) return false;
          break;
        case "$1,200 - $1,800":
          if (cost < 1200 || cost > 1800) return false;
          break;
        case "$1,800 - $2,500":
          if (cost < 1800 || cost > 2500) return false;
          break;
        case "$2,500+":
          if (cost < 2500) return false;
          break;
      }
    }

    return true;
  });

  renderSearchResults();
  updateStats();
}

/* ===============================
   CLEAR FILTERS
================================ */

export function clearFilters() {
  state.activeFilters = {};
  state.filteredProperties = [...state.properties];

  renderSearchResults();
  updateStats();

  showToast("All filters cleared");
}

/* ===============================
   SORTING
================================ */

export function applySorting(sortBy) {
  switch (sortBy) {
    case "price-low":
      state.filteredProperties.sort((a, b) => a.trueCost - b.trueCost);
      break;

    case "price-high":
      state.filteredProperties.sort((a, b) => b.trueCost - a.trueCost);
      break;

    case "trust":
      state.filteredProperties.sort((a, b) => b.trustScore - a.trustScore);
      break;

    case "distance":
      state.filteredProperties.sort(
        (a, b) => a.distanceMiles - b.distanceMiles
      );
      break;

    case "rating":
      state.filteredProperties.sort((a, b) => b.rating - a.rating);
      break;

    default:
      // AI Recommended (weighted score)
      state.filteredProperties.sort((a, b) => {
        const scoreA =
          a.trustScore * 0.4 +
          (5 - a.distanceMiles) * 0.3 +
          a.rating * 20 * 0.3;

        const scoreB =
          b.trustScore * 0.4 +
          (5 - b.distanceMiles) * 0.3 +
          b.rating * 20 * 0.3;

        return scoreB - scoreA;
      });
  }

  renderSearchResults();
}

/* ===============================
   RENDER SEARCH RESULTS
================================ */

export function renderSearchResults() {
  const container = document.getElementById("search-results");
  const noResults = document.getElementById("no-results");

  if (!container) return;

  if (state.filteredProperties.length === 0) {
    container.innerHTML = "";
    if (noResults) noResults.classList.remove("hidden");
    return;
  }

  if (noResults) noResults.classList.add("hidden");

  container.innerHTML = state.filteredProperties
    .map(property => createPropertyCard(property))
    .join("");
}

/* ===============================
   UPDATE STATS (SIDEBAR)
================================ */

export function updateStats() {
  const countEl = document.getElementById("results-count");
  const propsCountEl = document.getElementById("properties-count");
  const avgTrustEl = document.getElementById("avg-trust");
  const avgPriceEl = document.getElementById("avg-price");
  const distanceRangeEl = document.getElementById("distance-range");

  const list = state.filteredProperties;

  if (countEl) countEl.textContent = list.length;
  if (propsCountEl) propsCountEl.textContent = list.length;

  if (list.length === 0) return;

  const avgTrust = Math.round(
    list.reduce((sum, p) => sum + p.trustScore, 0) / list.length
  );

  const avgPrice = Math.round(
    list.reduce((sum, p) => sum + p.trueCost, 0) / list.length
  );

  const minDistance = Math.min(...list.map(p => p.distanceMiles));
  const maxDistance = Math.max(...list.map(p => p.distanceMiles));

  if (avgTrustEl) avgTrustEl.textContent = avgTrust;
  if (avgPriceEl)
    avgPriceEl.textContent = `$${avgPrice.toLocaleString()}/mo`;
  if (distanceRangeEl)
    distanceRangeEl.textContent = `${minDistance} - ${maxDistance} mi`;
}

/* ===============================
   GLOBAL FILTER HELPERS (HTML)
================================ */

window.applyFilters = function () {
  const filters = {
    university: document.getElementById("filter-location")?.value || "",
    priceRange: document.getElementById("filter-price")?.value || "",
    type: document.getElementById("filter-type")?.value || "",
    trustScore:
      parseInt(document.getElementById("filter-trust")?.value) || null,
    amenity: document.getElementById("filter-amenities")?.value || ""
  };

  // Remove empty filters
  Object.keys(filters).forEach(
    key => !filters[key] && delete filters[key]
  );

  applyFilters(filters);
};

window.clearFilters = clearFilters;

window.applySorting = function () {
  const value = document.getElementById("sort-select")?.value;
  applySorting(value);
};
