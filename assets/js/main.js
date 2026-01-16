/* =========================================================
   NESTORA – MAIN ENTRY POINT
   Responsibilities:
   - Import all modules
   - Initialize UI, search & chat
   - Fetch backend data on load
========================================================= */

/* ===============================
   IMPORT MODULES
================================ */

import { initUI, showSection } from "./ui.js";
import { renderSearchResults, updateStats } from "./search.js";
import { initChat } from "./chat.js";
import { fetchProperties } from "./api.js";

/* ===============================
   APP INITIALIZATION
================================ */

async function initApp() {
  try {
    // Initialize UI (branding, CTA, navigation)
    initUI();

    // Initialize chat system
    initChat();

    // Default landing section
    showSection("home");

    // Fetch properties from backend (MongoDB)
    await fetchProperties();

    // Render data-driven UI
    renderSearchResults();
    updateStats();

    console.log("✅ Frontend successfully connected to backend");
  } catch (error) {
    console.error("❌ App initialization failed:", error);
  }
}

/* ===============================
   DOM READY
================================ */

document.addEventListener("DOMContentLoaded", initApp);
