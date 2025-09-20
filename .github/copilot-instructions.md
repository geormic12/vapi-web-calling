# Vapi Web SDK Multi-Agent Integration Guidelines

## Architecture Overview

This repository demonstrates a sophisticated multi-agent Vapi SDK integration pattern:

- **Modular Architecture**: Component-based system with agent registry, function handlers, and UI components
- **Webpack/npm build** (`index.html` + `src/index.js`) - ES6 modules with Babel transpilation
- **Agent Registry System**: Dynamic agent management with per-agent configurations and functions
- **Function Handler Registry**: Centralized function call routing per agent

## Core System Components

### 1. VapiCallManager (`src/index.js`)
Main orchestrator class that manages:
- Vapi SDK instance and call lifecycle
- Agent switching and state management
- Event handling and UI updates
- Function call routing

```javascript
class VapiCallManager {
  constructor() {
    this.vapi = new Vapi("your-public-api-key");
    this.currentAgent = null;
    this.functionHandlers = new FunctionHandlerRegistry();
    // ... state management
  }
}
```

### 2. Agent Registry (`src/agent-registry.js`)
Centralized agent configuration management:

```javascript
export const agentRegistry = {
  agentId: {
    name: "AgentName",
    displayName: "Display Name", 
    systemPrompt: systemPromptVariable,
    voice: { voiceId: "sarah", provider: "11labs" },
    firstMessage: "Hello! I'm...",
    functions: [/* agent-specific functions */],
    model: { model: "gpt-3.5-turbo", /* config */ },
    // ... full assistant config
  }
};

export function buildAssistantOptions(agentConfig) {
  // Transforms registry config to Vapi assistant options
}
```

### 3. Agent Components (`src/agent-component.js`)
Dynamic UI generation and management:

```javascript
export function createAgentsGrid(agentRegistry) {
  // Renders all agents as interactive buttons
}

export function attachAgentListeners(agentRegistry, callManager) {
  // Attaches click handlers for agent selection
}

export function updateAgentUI(agentId, isActive, isCurrentAgent) {
  // Updates visual state based on call status
}
```

### 4. Function Handler Registry (`src/function-handler-registry.js`)
Routes function calls to agent-specific handlers:

```javascript
export class FunctionHandlerRegistry {
  constructor() {
    this.handlers = new Map([
      ['agentId', new AgentFunctionHandler()],
    ]);
  }

  handleFunctionCall(agentId, functionCall) {
    const handler = this.getHandler(agentId);
    return handler.handleFunctionCall(functionCall);
  }
}
```

## Agent Development Patterns

### Creating New Agents

1. **Create Agent Prompt File** (`src/{agent-name}-prompt.js`):
```javascript
export const agentNameSystemPrompt = `Your detailed system prompt...`;
```

2. **Create Function Handler** (`src/{agent-name}-functions.js`):
```javascript
export class AgentNameFunctionHandler {
  handleFunctionCall(functionCall) {
    switch (functionCall.name) {
      case 'CustomFunction':
        return this.handleCustomFunction(functionCall.parameters);
      default:
        return null;
    }
  }
}
```

3. **Register in Agent Registry**:
```javascript
import { agentNameSystemPrompt } from './agent-name-prompt.js';

export const agentRegistry = {
  agentname: {
    name: "AgentName",
    systemPrompt: agentNameSystemPrompt,
    functions: [
      {
        name: "CustomFunction",
        parameters: { /* OpenAPI schema */ },
        description: "Function description"
      }
    ],
    // ... rest of config
  }
};
```

4. **Register Function Handler**:
```javascript
import { AgentNameFunctionHandler } from './agent-name-functions.js';

// In FunctionHandlerRegistry constructor:
this.handlers = new Map([
  ['agentname', new AgentNameFunctionHandler()],
]);
```

### Agent Template Usage

Use `src/agent-template.js` as a starting point:
- Copy and rename to `{agent-name}-functions.js`
- Replace `{AgentName}` and `{agentId}` placeholders
- Implement custom functions
- Follow the detailed integration steps in the template comments

## Event-Driven Architecture

### Core Vapi Event Handlers

```javascript
this.vapi.on("call-start", () => this.handleCallStart());
this.vapi.on("call-end", () => this.handleCallEnd());
this.vapi.on("speech-start", () => this.handleSpeechStart());
this.vapi.on("speech-end", () => this.handleSpeechEnd());
this.vapi.on("message", (message) => this.handleMessage(message));
this.vapi.on("volume-level", (level) => this.handleVolumeLevel(level));
this.vapi.on("error", (error) => this.handleError(error));
```

### Function Call Processing

Handles both `conversation-update` and direct `function-call` messages:

```javascript
handleMessage(message) {
  if (message.type === "conversation-update") {
    // Extract tool_calls from conversation messages
    message.conversation.forEach((msg) => {
      if (msg.tool_calls && msg.tool_calls.length > 0) {
        msg.tool_calls.forEach((toolCall) => {
          const functionCall = {
            name: toolCall.function?.name,
            parameters: JSON.parse(toolCall.function.arguments)
          };
          this.handleFunctionCall(functionCall);
        });
      }
    });
  }
  
  // Legacy function-call support
  if (message.type === "function-call") {
    this.handleFunctionCall(message.functionCall);
  }
}
```

## UI State Management

### Multi-Agent UI State

```javascript
updateUIForCall(isActive) {
  Object.keys(agentRegistry).forEach(agentId => {
    updateAgentUI(config.name, isActive, agentId === this.currentAgent);
    
    const button = document.getElementById(`callWith${config.name}`);
    if (button) {
      button.style.backgroundColor = isActive && agentId === this.currentAgent 
        ? "#007aff" : "#858585";
    }
  });
}
```

### Volume Visualization

Real-time volume feedback with box-shadow effects:

```javascript
handleVolumeLevel(level) {
  const spread = level * this.maxSpread;
  if (this.currentAgent) {
    const button = document.getElementById(`callWith${agentRegistry[this.currentAgent].name}`);
    if (button) {
      button.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(58,25,250,0.7)`;
    }
  }
}
```

## Development Workflow

### Building and Running

```bash
npm install
npm run build  # Creates bundle.js via webpack
# Serve locally (Python example):
python -m http.server 8000
```

### Key Files Structure

```
src/
├── index.js                    # Main VapiCallManager class
├── agent-registry.js          # Central agent configuration
├── agent-component.js         # UI generation and management
├── function-handler-registry.js # Function call routing
├── agent-template.js          # Template for new agents
├── {agent}-prompt.js          # Agent system prompts
└── {agent}-functions.js       # Agent function handlers
```

## Code Organization Standards

### File Organization
- **Maximum 500 lines per file** - split complex logic into modules
- **Maximum 30 lines per function** - maintain readability
- **Separation of concerns**: prompts, functions, and configs in separate files
- **Template-driven development**: use `agent-template.js` for consistency

### Agent Naming Conventions
- **File names**: `{agent-name}-functions.js`, `{agent-name}-prompt.js`
- **Class names**: `{AgentName}FunctionHandler`
- **Registry keys**: lowercase agent identifier
- **Display names**: Human-readable agent names

### Function Call Patterns
- **Consistent return format**: `{ success: boolean, data: any, agent: string, message: string }`
- **Error handling**: Try-catch with structured error responses
- **Parameter validation**: Validate all function parameters before processing
- **DOM safety**: Sanitize all parameters before DOM manipulation

## Advanced Patterns

### Agent Switching
- Only one agent active at a time
- Automatic UI state updates when switching
- Clean state reset on call end
- Visual feedback for active/inactive agents

### Chat Integration
- Real-time conversation display
- Support for user, assistant, and tool messages
- Auto-scrolling chat window
- Tool call visualization ("Processing request...")

### Error Handling
- Graceful degradation on function call failures
- User-friendly error messages
- Console logging for debugging
- State cleanup on errors

## Best Practices

1. **Agent Development**: Use the template system for consistency
2. **Function Safety**: Validate all parameters and handle edge cases
3. **UI Feedback**: Provide immediate visual feedback for all interactions
4. **State Management**: Clean up state on call end to prevent stale UI
5. **Error Handling**: Log errors but show user-friendly messages
6. **Performance**: Use event delegation and efficient DOM updates
7. **Modularity**: Keep agents and functions decoupled and testable</content>
  <parameter name="filePath">c:\Users\mikeg\Documents\AI\vapi-web-calling\.github\copilot-instructions.md
