/* =========================================================
   API SERVICE – FRONTEND
   Handles all backend communication
========================================================= */

import { API_BASE_URL, state } from "./data.js";

export async function fetchProperties() {
  try {
    const res = await fetch(`${API_BASE_URL}/properties`);
    if (!res.ok) throw new Error("Failed to fetch properties");

    const data = await res.json();
    state.properties = data;
    state.filteredProperties = [...data];

    return data;
  } catch (error) {
    console.error("❌ API Error:", error.message);
    return [];
  }
}
