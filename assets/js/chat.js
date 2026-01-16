/* =========================================================
   NESTORA – CHAT MODULE
   Handles:
   - Chat open / close
   - Message rendering
   - Typing indicator
   - Mock AI responses
========================================================= */

import { appConfig, state } from "./data.js";
import { showToast } from "./ui.js";

/* ===============================
   DOM ELEMENTS
================================ */

const chatWindow = document.getElementById("chat-window");
const chatFab = document.getElementById("chat-fab");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");

/* ===============================
   TOGGLE CHAT
================================ */

export function toggleChat() {
  state.chatOpen = !state.chatOpen;

  if (state.chatOpen) {
    chatWindow.classList.remove("hidden");
    chatFab.classList.add("hidden");

    if (!state.chatInitialized) {
      initializeChat();
      state.chatInitialized = true;
    }

    setTimeout(() => chatInput?.focus(), 100);
  } else {
    chatWindow.classList.add("hidden");
    chatFab.classList.remove("hidden");
  }
}

window.toggleChat = toggleChat;

/* ===============================
   INITIAL CHAT MESSAGES
================================ */

function initializeChat() {
  addMessage("ai", appConfig.chat.greeting);
  setTimeout(() => {
    addMessage("ai", appConfig.chat.subtext);
  }, 600);

  setTimeout(() => {
    addMessage(
      "ai",
      "I can help you with:\n\n🏠 Finding student housing\n💰 Understanding TrueCost™\n⭐ TrustScore™ ratings\n📍 Distance & commute\n🔍 Filtering by budget"
    );
  }, 1200);
}

/* ===============================
   SEND MESSAGE
================================ */

export function sendMessage(event) {
  event.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage("user", message);
  chatInput.value = "";

  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      hideTypingIndicator();
      handleAIResponse(message);
    }, 1000);
  }, 300);
}

window.sendMessage = sendMessage;

/* ===============================
   QUICK MESSAGE (BUTTONS)
================================ */

window.quickMessage = function (text) {
  chatInput.value = text;
  chatInput.focus();
  setTimeout(() => {
    chatInput.closest("form").dispatchEvent(new Event("submit"));
  }, 100);
};

/* ===============================
   MESSAGE RENDERING
================================ */

function addMessage(sender, text) {
  const wrapper = document.createElement("div");
  wrapper.className =
    sender === "user"
      ? "flex justify-end chat-message"
      : "flex justify-start chat-message";

  if (sender === "ai") {
    wrapper.innerHTML = `
      <div class="flex gap-2 max-w-[85%]">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#6FFFE9] to-[#5BC0BE] flex items-center justify-center text-[#0B132B] font-bold">
          R
        </div>
        <div class="glass rounded-2xl rounded-tl-none px-4 py-3">
          <p class="text-sm whitespace-pre-line">${escapeHtml(text)}</p>
        </div>
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="max-w-[85%]">
        <div class="bg-gradient-to-br from-[#6FFFE9] to-[#5BC0BE] rounded-2xl rounded-tr-none px-4 py-3">
          <p class="text-sm text-[#0B132B] font-medium">${escapeHtml(text)}</p>
        </div>
      </div>
    `;
  }

  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* ===============================
   TYPING INDICATOR
================================ */

function showTypingIndicator() {
  const typing = document.createElement("div");
  typing.id = "typing-indicator";
  typing.className = "flex justify-start chat-message";
  typing.innerHTML = `
    <div class="flex gap-2">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#6FFFE9] to-[#5BC0BE] flex items-center justify-center text-[#0B132B] font-bold">
        R
      </div>
      <div class="glass rounded-2xl rounded-tl-none px-4 py-3">
        <div class="typing-indicator flex gap-1">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  document.getElementById("typing-indicator")?.remove();
}

/* ===============================
   AI RESPONSE LOGIC (MOCK)
================================ */

function handleAIResponse(message) {
  const msg = message.toLowerCase();

  if (msg.includes("mit")) {
    addMessage(
      "ai",
      "I found great properties near MIT:\n\n🏠 Kendall Residences\n💰 $1,450/mo\n⭐ TrustScore™ 94\n\nWant to see them in detail?"
    );
  } else if (msg.includes("budget") || msg.includes("under")) {
    addMessage(
      "ai",
      "Tell me your monthly budget and university — I’ll narrow down the best matches for you 💡"
    );
  } else if (msg.includes("truecost")) {
    addMessage(
      "ai",
      "TrueCost™ shows the REAL monthly cost:\n\nRent + utilities + internet + seasonal expenses.\n\nNo hidden fees — full transparency."
    );
  } else if (msg.includes("trust")) {
    addMessage(
      "ai",
      "TrustScore™ is our AI verification system.\n\n90+ = Excellent\n80+ = Very Good\n70+ = Good\n\nOnly verified listings appear on NESTORA 🛡️"
    );
  } else if (msg.includes("hello") || msg.includes("hi")) {
    addMessage(
      "ai",
      "Hey 👋 I’m here to help you find your perfect student home. What are you looking for?"
    );
  } else if (msg.includes("thank")) {
    addMessage("ai", "You’re welcome 😊 Happy to help!");
  } else {
    addMessage(
      "ai",
      "I can help you with housing search, budgets, TrustScore™, or university-specific listings.\n\nWhat would you like to know?"
    );
  }
}

/* ===============================
   UTIL
================================ */

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/* ===============================
   INIT HOOK
================================ */

export function initChat() {
  // Reserved for future real AI initialization
}
