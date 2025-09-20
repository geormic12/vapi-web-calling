import Vapi from "@vapi-ai/web";
import { agentRegistry, buildAssistantOptions } from './agent-registry.js';
import { createAgentsGrid, attachAgentListeners, updateAgentUI, resetAllAgentUI } from './agent-component.js';
import { FunctionHandlerRegistry } from './function-handler-registry.js';

class VapiCallManager {
  constructor() {
    this.vapi = new Vapi("d555b32e-ab96-4a1f-be43-6a7afc43dd45");
    this.currentCall = null;
    this.currentAgent = null;
    this.functionHandlers = new FunctionHandlerRegistry();
    this.connected = false;
    this.assistantIsSpeaking = false;
    this.volumeLevel = 0;
    this.maxSpread = 30;
    this.callEndedNaturally = false; // Track natural call endings
    this.processedToolCalls = new Set(); // Track processed tool calls to prevent duplicates

    // UI elements
    this.statusDisplay = document.getElementById("status");
    this.speakerDisplay = document.getElementById("speaker");
    this.volumeDisplay = document.getElementById("volume");
    this.vapiTyping = document.getElementById("vapiTyping");
    this.vapiStatusMessage = document.getElementById("vapiStatusMessage");
    this.chatWindow = document.getElementById("chat");

    this.setupEventListeners();
    this.renderAgents();
  }

  renderAgents() {
    const container = document.getElementById('agents-container');
    if (!container) {
      console.warn('No agents-container found in DOM');
      return;
    }

    container.innerHTML = createAgentsGrid(agentRegistry);
    this.attachAgentListeners();
  }

  attachAgentListeners() {
    attachAgentListeners(agentRegistry, this);
  }

  async handleAgentCall(agentId) {
    const config = agentRegistry[agentId];
    if (!config) {
      console.error(`No configuration found for agent: ${agentId}`);
      return;
    }

    if (this.currentCall) {
      await this.endCall();
      return;
    }

    this.currentAgent = agentId;
    await this.startCall(config);
  }

  async startCall(agentConfig) {
    const assistantOptions = buildAssistantOptions(agentConfig);

    // Show loading state with helpful message
    this.updateUIForCall(true);
    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.textContent = 'Connecting... Please allow microphone access when prompted.';
    }

    try {
      this.currentCall = await this.vapi.start(assistantOptions);
      console.log(`Started call with ${agentConfig.displayName}`);
    } catch (error) {
      console.error("Call failed:", error);
      this.handleError(error);
      this.currentAgent = null;
      this.currentCall = null;
      this.updateUIForCall(false);
    }
  }

  setupEventListeners() {
    this.vapi.on("call-start", () => this.handleCallStart());
    this.vapi.on("call-end", () => this.handleCallEnd());
    this.vapi.on("speech-start", () => this.handleSpeechStart());
    this.vapi.on("speech-end", () => this.handleSpeechEnd());
    this.vapi.on("message", (message) => this.handleMessage(message));
    this.vapi.on("volume-level", (level) => this.handleVolumeLevel(level));
    this.vapi.on("error", (error) => this.handleError(error));
  }

  handleCallStart() {
    console.log("Call started");
    this.connected = true;
    this.updateUI();
  }

  handleCallEnd() {
    console.log("Call ended");
    this.connected = false;
    this.currentCall = null;
    this.assistantIsSpeaking = false;
    this.volumeLevel = 0;
    this.callEndedNaturally = true; // Mark that call ended through proper channel
    this.processedToolCalls.clear(); // Clear processed tool calls for next call
    
    // Clear the pulsing animation from the active button
    if (this.currentAgent) {
      const button = document.getElementById(`callWith${agentRegistry[this.currentAgent].name}`);
      if (button) {
        button.style.boxShadow = '';
      }
    }
    
    this.currentAgent = null;
    this.updateUI();
    this.updateUIForCall(false);
    resetAllAgentUI(agentRegistry);

    // Reset the flag after a brief delay to catch any delayed error events
    setTimeout(() => {
      this.callEndedNaturally = false;
    }, 1000);
  }

  handleSpeechStart() {
    console.log("Assistant started speaking");
    this.assistantIsSpeaking = true;
    this.updateUI();
  }

  handleSpeechEnd() {
    console.log("Assistant stopped speaking");
    this.assistantIsSpeaking = false;
    this.updateUI();
  }

  handleMessage(message) {
    console.log("Message received:", message);

    // Check for tool calls in conversation-update messages
    if (message.type === "conversation-update") {
      // Look for tool calls in the conversation
      if (message.conversation) {
        message.conversation.forEach((msg) => {
          if (msg.tool_calls && msg.tool_calls.length > 0) {
            console.log("Found tool_calls:", msg.tool_calls);

            msg.tool_calls.forEach((toolCall) => {
              // Create a unique identifier for this tool call
              const toolCallId = toolCall.id || `${toolCall.function?.name}-${JSON.stringify(toolCall.function?.arguments)}-${msg.timestamp || Date.now()}`;

              // Skip if we've already processed this tool call
              if (this.processedToolCalls.has(toolCallId)) {
                console.log("Skipping already processed tool call:", toolCallId);
                return;
              }

              // Mark this tool call as processed
              this.processedToolCalls.add(toolCallId);

              // Convert tool call to function call format
              const functionCall = {
                name: toolCall.function?.name,
                parameters: toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments) : {}
              };

              console.log("Executing function:", functionCall.name, "with parameters:", functionCall.parameters);

              if (this.currentAgent && functionCall.name) {
                this.handleFunctionCall(functionCall);
              }
            });
          }
        });
      }

      this.updateChat(message);
    }

    // Keep the original function-call handler as backup
    if (message.type === "function-call" && this.currentAgent) {
      console.log("Direct function-call message received");
      this.handleFunctionCall(message.functionCall);
    }
  }

  handleVolumeLevel(level) {
    this.volumeLevel = level;
    const spread = this.volumeLevel * this.maxSpread;

    if (this.volumeDisplay) {
      this.volumeDisplay.textContent = `Volume: ${this.volumeLevel.toFixed(3)}`;
    }

    // Update the box shadow for the active button
    if (this.currentAgent) {
      const button = document.getElementById(`callWith${agentRegistry[this.currentAgent].name}`);
      if (button) {
        button.style.boxShadow = `0 0 ${spread}px ${spread / 2}px rgba(58,25,250,0.7)`;
      }
    }
  }

  handleFunctionCall(functionCall) {
    if (!this.currentAgent) {
      console.warn("⚠️ Function call received but no current agent");
      return;
    }

    console.log(`🚀 FUNCTION CALL EXECUTION:`, {
      functionName: functionCall.name,
      agent: this.currentAgent,
      parameters: functionCall.parameters,
      timestamp: new Date().toISOString()
    });

    // Special logging for knowledge base access
    if (functionCall.name === 'SearchIntegrityKnowledgeBase') {
      console.log(`📚 LISA KNOWLEDGE BASE ACCESS DETECTED!`, {
        query: functionCall.parameters?.query,
        category: functionCall.parameters?.category,
        agent: this.currentAgent
      });
    }

    const result = this.functionHandlers.handleFunctionCall(
      this.currentAgent,
      functionCall
    );

    if (result) {
      console.log(`✅ FUNCTION EXECUTED SUCCESSFULLY:`, {
        functionName: functionCall.name,
        agent: this.currentAgent,
        resultMessage: result.message || 'Function completed',
        resultData: result,
        timestamp: new Date().toISOString()
      });

      // Additional logging for knowledge base results
      if (functionCall.name === 'SearchIntegrityKnowledgeBase' && result.results) {
        console.log(`📖 KNOWLEDGE BASE RESULTS:`, {
          totalResults: result.totalResults,
          returnedResults: result.results.length,
          query: result.query,
          results: result.results.map(r => ({ key: r.key, relevance: r.relevanceScore }))
        });
      }
    } else {
      console.warn(`❌ FUNCTION EXECUTION FAILED:`, {
        functionName: functionCall.name,
        agent: this.currentAgent,
        timestamp: new Date().toISOString()
      });
    }
  }

  handleError(error) {
    // Check if this is a natural call termination based on error content
    const isNaturalTermination =
      error.errorMsg === "Meeting has ended" ||
      (error.error && error.error.message === "Meeting has ended") ||
      (error.error && error.error.msg === "Meeting has ended");

    // If we just ended a call naturally, ignore subsequent WebRTC cleanup errors
    if (this.callEndedNaturally || isNaturalTermination) {
      console.log("Call ended naturally (WebRTC cleanup)");
      return;
    }

    console.error("Vapi error:", error);
    this.connected = false;
    
    // Clear the pulsing animation on error as well
    if (this.currentAgent) {
      const button = document.getElementById(`callWith${agentRegistry[this.currentAgent].name}`);
      if (button) {
        button.style.boxShadow = '';
      }
    }

    if (this.vapiStatusMessage) {
      if (error.error && error.error.message) {
        this.vapiStatusMessage.textContent = error.error.message;
      } else {
        this.vapiStatusMessage.textContent = "An error occurred";
      }
    }

    this.updateUI();
    this.updateUIForCall(false);
  }

  updateUIForCall(isActive) {
    Object.keys(agentRegistry).forEach(agentId => {
      const config = agentRegistry[agentId];
      updateAgentUI(config.name, isActive, agentId === this.currentAgent);

      // Update button background color
      const button = document.getElementById(`callWith${config.name}`);
      if (button) {
        if (isActive && agentId === this.currentAgent) {
          button.style.backgroundColor = "#007aff";
        } else {
          button.style.backgroundColor = "#858585";
        }
      }
    });

    const statusText = isActive && this.currentAgent
      ? `Connected to ${agentRegistry[this.currentAgent]?.displayName || 'agent'}`
      : 'Click a microphone to start a call. You may need to allow microphone access twice for security.';

    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.textContent = statusText;
    }
  }

  updateChat(conversationUpdate) {
    if (!this.chatWindow) return;

    this.chatWindow.innerHTML = "";

    conversationUpdate.conversation.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");

      switch (message.role) {
        case "assistant":
          messageDiv.classList.add("assistant");
          break;
        case "user":
          messageDiv.classList.add("user");
          break;
        case "tool":
          messageDiv.classList.add("tool");
          break;
      }

      if (message.content) {
        messageDiv.textContent = message.content;
      } else if (message.tool_calls && message.tool_calls.length > 0) {
        messageDiv.textContent = "Processing request...";
      }

      this.chatWindow.appendChild(messageDiv);
    });

    this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
  }

  updateUI() {
    if (this.statusDisplay) {
      this.statusDisplay.textContent = `Status: ${this.connected ? "Connected" : "Disconnected"}`;
    }

    if (this.speakerDisplay) {
      this.speakerDisplay.textContent = `Speaker: ${this.assistantIsSpeaking ? "Assistant" : "User"}`;
    }
  }

  async endCall() {
    if (this.currentCall) {
      await this.vapi.stop();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new VapiCallManager();
});
