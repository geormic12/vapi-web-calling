# Vapi Web SDK Integration Guidelines

## Architecture Overview

This repository demonstrates one Vapi SDK integration pattern:

- Webpack/npm build (`index.html` + `src/index.js`) - full control with module bundling

## Core Patterns

### Vapi Instance Management

```javascript
// Always initialize with public API key
const vapi = new Vapi("your-public-api-key");

// For script tag approach, use window.vapiSDK.run()
vapiInstance = window.vapiSDK.run({
  apiKey: apiKey,
  assistant: assistantId,
  config: buttonConfig,
});
```

### Event-Driven Architecture

Handle all Vapi events through listeners:

```javascript
vapi.on("call-start", () => {
  /* connection established */
});
vapi.on("call-end", () => {
  /* cleanup state */
});
vapi.on("speech-start", () => {
  /* visual feedback */
});
vapi.on("speech-end", () => {
  /* reset indicators */
});
vapi.on("message", handleMessage);
vapi.on("volume-level", (level) => {
  /* 0.0-1.0 scale */
});
vapi.on("error", (error) => {
  /* handle gracefully */
});
```

### Function Calling Integration

Define functions in assistant config for dynamic UI updates:

```javascript
functions: [
  {
    name: "ChangeColor",
    parameters: {
      type: "object",
      properties: { ColorCode: { type: "string" } },
    },
    description: "Changes HTML element color",
  },
];
```

Handle function calls in message event:

```javascript
if (message.type === "function-call") {
  if (message.functionCall.name === "ChangeColor") {
    element.style.backgroundColor = message.functionCall.parameters.ColorCode;
  }
}
```

### Assistant Configuration Structure

```javascript
const assistantOptions = {
  name: "Assistant Name",
  voice: { voiceId: "sarah", provider: "11labs" },
  model: {
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "..." }],
    functions: [...],
    temperature: 0.7
  },
  firstMessage: "Hello, how can I help?",
  transcriber: { model: "nova-2", provider: "deepgram" }
};
```

## Development Workflow

### Building Advanced Integration

```bash
npm install
npm run build  # Creates bundle.js via webpack
```

### Key Files

- `src/index.js`: Main application logic with event handlers
- `webpack.config.js`: Babel transpilation for ES6+ support
- `index.html`: Entry point loading bundled JavaScript

### UI State Management

Track call state manually:

```javascript
let connected = false;
let assistantIsSpeaking = false;
let callActive = false;
let volumeLevel = 0;
```

Update UI in dedicated function called from event handlers:

```javascript
function updateUI() {
  statusDisplay.textContent = `Status: ${
    connected ? "Connected" : "Disconnected"
  }`;
  speakerDisplay.textContent = `Speaker: ${
    assistantIsSpeaking ? "Assistant" : "User"
  }`;
}
```

### Chat Interface Updates

Process conversation updates for message display:

```javascript
function updateChat(conversationUpdate) {
  chatWindow.innerHTML = "";
  conversationUpdate.conversation.forEach((message) => {
    const div = document.createElement("div");
    div.classList.add("message", message.role); // "user", "assistant", "tool"
    div.textContent = message.content || "Processing...";
    chatWindow.appendChild(div);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}
```

## Integration Decision Guide

- **Simple websites**: Use basic script tag approach (`index2.html`)
- **Custom UI/UX**: Extend with custom event handlers (`index3.html`)
- **Complex apps**: Use Webpack build system (`index.html` + `src/index.js`)

## Common Patterns

- Sanitize all function call parameters before DOM manipulation
- Handle errors gracefully with user-friendly messages
- Update visual feedback immediately on speech/volume events
- Clean up state on call-end to prevent stale UI
- Use conversation-update events for chat history display

## Code Organization Guidelines

- Maintain each agent in its own separate file
- Keep large texts in separate files that are called via variables
- Keep all files to less than 500 lines
- Keep all functions to less than 30 lines
- Maintain readability and human readability via having multiple files that clearly outline different functional components when necessary</content>
  <parameter name="filePath">c:\Users\mikeg\Documents\AI\vapi-web-calling\.github\copilot-instructions.md
