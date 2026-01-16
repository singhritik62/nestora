/* =========================================================
   NESTORA – DATA LAYER
   This file contains ONLY data & shared state
   No DOM manipulation here
========================================================= */

/* ===============================
   API CONFIG
================================ */

export const API_BASE_URL = "http://localhost:5001/api";

/* ===============================
   BRAND / APP CONFIG
================================ */

export const appConfig = {
  brandName: "NESTORA",
  tagline: "Find Home. Before You Land.",
  heroTitle: "Find Your Perfect Student Home",
  heroSubtitle:
    "AI-powered housing that understands you. Find trusted, affordable accommodations near your university in just 60 seconds.",
  ctaText: "Start Your Search",
  chat: {
    assistantName: "RITIK AI",
    greeting: "Hi! I'm RITIK AI, your AI housing advisor.",
    subtext:
      "Ask me anything about finding trusted student housing near your university."
  }
};

/* ===============================
   SHARED APPLICATION STATE
   (LIVE BACKEND DATA)
================================ */

export const state = {
  /** All properties fetched from backend (MongoDB) */
  properties: [],

  /** Properties after applying filters & sorting */
  filteredProperties: [],

  /** Active filters selected by user */
  activeFilters: {},

  /** Chat UI state */
  chatOpen: false,
  chatInitialized: false
};

/* ===============================
   FILTER OPTIONS (STATIC UI DATA)
================================ */

export const filterOptions = {
  universities: [
    "MIT",
    "Harvard",
    "Stanford",
    "UC Berkeley",
    "Boston University",
    "NYU"
  ],

  priceRanges: [
    "$500 - $800",
    "$800 - $1,200",
    "$1,200 - $1,800",
    "$1,800 - $2,500",
    "$2,500+"
  ],

  propertyTypes: [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "Shared Room"
  ],

  amenities: [
    "WiFi",
    "Gym",
    "Laundry",
    "Parking",
    "Pool",
    "Rooftop",
    "Doorman"
  ],

  trustScores: [
    { label: "90+ Excellent", value: 90 },
    { label: "80+ Very Good", value: 80 },
    { label: "70+ Good", value: 70 }
  ]
};
