// Template for creating new agent function handlers
// Copy this file and rename it to {agent-name}-functions.js

export class NewAgentFunctionHandler {
  constructor() {
    // Initialize any agent-specific data structures
    this.agentData = new Map();
    this.specialCapabilities = [];
  }

  handleFunctionCall(functionCall) {
    switch (functionCall.name) {
      case 'ChangeColor':
        return this.changeColor(functionCall.parameters);
      case 'WriteText':
        return this.writeText(functionCall.parameters);
      case 'YourCustomFunction':
        return this.handleCustomFunction(functionCall.parameters);
      default:
        console.warn(`Unknown function: ${functionCall.name}`);
        return null;
    }
  }

  changeColor(parameters) {
    const { ColorCode } = parameters;
    console.log(`{AgentName} changing color to: ${ColorCode}`);
    
    // Apply color change to this agent's button
    const button = document.getElementById('callWith{AgentName}');
    if (button) {
      button.style.backgroundColor = ColorCode;
    }

    return {
      success: true,
      colorCode: ColorCode,
      agent: '{AgentName}',
      message: `{AgentName} changed color to ${ColorCode}`
    };
  }

  writeText(parameters) {
    const { Text } = parameters;
    console.log(`{AgentName} writing text: ${Text}`);
    
    const textArea = document.getElementById('vapiTyping');
    if (textArea) {
      textArea.textContent = `{AgentName}: ${Text}`;
    }

    return {
      success: true,
      text: Text,
      agent: '{AgentName}',
      message: `{AgentName} wrote: ${Text}`
    };
  }

  handleCustomFunction(parameters) {
    // Implement your custom function logic here
    console.log('{AgentName} custom function called with:', parameters);
    
    // Example implementation
    return {
      success: true,
      data: parameters,
      agent: '{AgentName}',
      message: '{AgentName} executed custom function'
    };
  }

  // Add more agent-specific methods as needed
}

/*
TO ADD THIS AGENT TO THE SYSTEM:

1. Rename this file to {agent-name}-functions.js
2. Replace all instances of {AgentName} with your agent's actual name
3. Replace {agent-name} with your agent's lowercase name

4. Create {agent-name}-prompt.js:
   export const {agentName}SystemPrompt = `Your agent's system prompt here...`;

5. Add to agent-registry.js:
   Import your prompt:
   import { {agentName}SystemPrompt } from './{agent-name}-prompt.js';
   
   Add to agentRegistry object:
   {agentId}: {
     name: "{AgentName}",
     displayName: "{Agent Display Name}",
     systemPrompt: {agentName}SystemPrompt,
     voice: { voiceId: "voice-id", provider: "11labs" },
     firstMessage: "Hello! I'm {Agent Display Name}.",
     buttonClass: "call-button",
     iconClass: "microphone-icon",
     functions: [
       {
         name: "YourCustomFunction",
         async: false,
         parameters: {
           type: "object",
           properties: {
             param1: { type: "string", description: "Description" }
           },
           required: ["param1"]
         },
         description: "Description of your custom function"
       },
       // Include ChangeColor and WriteText if needed
     ],
     // ... other standard config
   }

6. Add to function-handler-registry.js:
   Import your handler:
   import { NewAgentFunctionHandler } from './{agent-name}-functions.js';
   
   Add to the handlers Map in constructor:
   ['{agentId}', new NewAgentFunctionHandler()],

7. Run: npm run build

The system will automatically:
- Render the new agent in the UI
- Route function calls to your handler
- Handle all Vapi events for your agent
*/