import Vapi from "@vapi-ai/web";
import { brianaOptions } from "./briana.js";
import { lisaOptions } from "./lisa.js";

const statusDisplay = document.getElementById("status");
const speakerDisplay = document.getElementById("speaker");
const volumeDisplay = document.getElementById("volume");
const vapiTyping = document.getElementById("vapiTyping");
const vapiStatusMessage = document.getElementById("vapiStatusMessage");
const chatWindow = document.getElementById("chat");
const callWithLisa = document.getElementById("callWithLisa");
const callWithBriana = document.getElementById("callWithBriana");

const vapi = new Vapi("d555b32e-ab96-4a1f-be43-6a7afc43dd45");

let connected = false;
let assistantIsSpeaking = false;
let volumeLevel = 0;
let callActive = false;
let currentAssistant = null; // Track which assistant is currently active
const maxSpread = 30; // Maximum spread of the shadow in pixels

// Vapi Event Listeners
vapi.on("call-start", function () {
  connected = true;
  updateUI();
});

vapi.on("call-end", function () {
  connected = false;
  callActive = false;
  currentAssistant = null;
  updateUI();

  callWithLisa.style.boxShadow = `0 0 0px 0px rgba(58,25,250,0.7)`;
  callWithBriana.style.boxShadow = `0 0 0px 0px rgba(58,25,250,0.7)`;
});

vapi.on("speech-start", function () {
  assistantIsSpeaking = true;
  updateUI();
});

vapi.on("speech-end", function () {
  assistantIsSpeaking = false;
  updateUI();
});

vapi.on("message", (message) => {
  if (message.type === "function-call") {
    // If the ChangeColor function was called
    if (message.functionCall && message.functionCall.name === "ChangeColor") {
      // Don't forget to sanitize the values when building this in a real application
      if (currentAssistant === "lisa") {
        callWithLisa.style.backgroundColor = message.functionCall.parameters.ColorCode;
      } else if (currentAssistant === "briana") {
        callWithBriana.style.backgroundColor = message.functionCall.parameters.ColorCode;
      }
    }

    // If the WriteText function was called
    if (message.functionCall && message.functionCall.name === "WriteText") {
      // Don't forget to sanitize the values when building this in a real application
      vapiTyping.textContent = message.functionCall.parameters.Text;
    }
  }

  // Adds a message to the background chat
  if (message.type === "conversation-update") {
    updateChat(message);
  }
});

vapi.on("volume-level", function (level) {
  volumeLevel = level; // Level is from 0.0 to 1.0

  // Calculate the spread directly based on the volume level
  const spread = volumeLevel * maxSpread;

  volumeDisplay.textContent = `Volume: ${volumeLevel.toFixed(3)}`; // Display up to 3 decimal places for simplicity

  // Update the box shadow for the active button
  if (currentAssistant === "lisa") {
    callWithLisa.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(58,25,250,0.7)`;
  } else if (currentAssistant === "briana") {
    callWithBriana.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(58,25,250,0.7)`;
  }
});

vapi.on("error", function (error) {
  console.error("Vapi error:", error);
  connected = false;

  if (error.error && error.error.message) {
    vapiStatusMessage.textContent = error.error.message;
    console.error("Error message:", error.error.message);
  } else {
    vapiStatusMessage.textContent = "An error occurred";
    console.error("Unknown error format:", error);
  }

  updateUI();
});

callWithLisa.addEventListener("click", function () {
  if (!callActive) {
    callActive = true;
    currentAssistant = "lisa";
    callWithLisa.style.backgroundColor = "#007aff";
    callWithBriana.style.backgroundColor = "#858585";
    vapi.start(lisaOptions);
  } else if (currentAssistant === "lisa") {
    callActive = false;
    currentAssistant = null;
    callWithLisa.style.backgroundColor = "#858585";
    vapi.stop();
  }
});

callWithBriana.addEventListener("click", function () {
  if (!callActive) {
    callActive = true;
    currentAssistant = "briana";
    callWithBriana.style.backgroundColor = "#007aff";
    callWithLisa.style.backgroundColor = "#858585";
    vapi.start(brianaOptions);
  } else if (currentAssistant === "briana") {
    callActive = false;
    currentAssistant = null;
    callWithBriana.style.backgroundColor = "#858585";
    vapi.stop();
  }
});

// Initialize background with the correct color
callWithLisa.style.backgroundColor = "#858585";
callWithBriana.style.backgroundColor = "#858585";

function updateChat(conversationUpdate) {
  chatWindow.innerHTML = ""; // Clear the chat window before adding new messages

  conversationUpdate.conversation.forEach((message) => {
    var messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    // Add specific class based on the role
    switch (message.role) {
      case "assistant":
        messageDiv.classList.add("assistant");
        break;
      case "user":
        messageDiv.classList.add("user");
        break;
      case "tool": // You might want a different style for tool responses
        messageDiv.classList.add("tool");
        break;
    }

    // Set text content and handle tool calls if they exist
    if (message.content) {
      messageDiv.textContent = message.content;
    } else if (message.tool_calls && message.tool_calls.length > 0) {
      // Example: Append a generic message or handle differently
      messageDiv.textContent = "Processing request...";
    }

    chatWindow.appendChild(messageDiv);
  });

  // Scroll to the bottom of the chat window
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateUI() {
  // Update the status
  statusDisplay.textContent = `Status: ${connected ? "Connected" : "Disconnected"}`;

  // Update the speaker
  speakerDisplay.textContent = `Speaker: ${assistantIsSpeaking ? "Assistant" : "User"}`;
}
