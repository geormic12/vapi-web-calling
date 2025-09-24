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
      return;
    }

    // Check if we're on the refined page by looking for the integrity/authenticity statements
    const isRefinedPage = document.getElementById('integrityStatement') && document.getElementById('authenticityStatement');

    let agentsToRender = agentRegistry;
    if (isRefinedPage) {
      // Only render Michael on the refined page
      agentsToRender = { michael: agentRegistry.michael };

      // Add click listeners for the statement boxes
      this.setupStatementClickListeners();
    }

    container.innerHTML = createAgentsGrid(agentsToRender);
    this.attachAgentListeners(agentsToRender);
  }

  attachAgentListeners(agentsToRender = agentRegistry) {
    attachAgentListeners(agentsToRender, this);
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
    this.assistantIsSpeaking = true;
    this.updateUI();
  }

  handleSpeechEnd() {
    this.assistantIsSpeaking = false;
    this.updateUI();
  }

  handleMessage(message) {
    // Check for tool calls in conversation-update messages
    if (message.type === "conversation-update") {
      // Look for tool calls in the conversation
      if (message.conversation) {
        message.conversation.forEach((msg) => {
          if (msg.tool_calls && msg.tool_calls.length > 0) {
            msg.tool_calls.forEach((toolCall) => {
              // Create a unique identifier for this tool call
              const toolCallId = toolCall.id || `${toolCall.function?.name}-${JSON.stringify(toolCall.function?.arguments)}-${msg.timestamp || Date.now()}`;

              // Skip if we've already processed this tool call
              if (this.processedToolCalls.has(toolCallId)) {
                return;
              }

              // Mark this tool call as processed
              this.processedToolCalls.add(toolCallId);

              // Convert tool call to function call format
              const functionCall = {
                name: toolCall.function?.name,
                parameters: toolCall.function?.arguments ? JSON.parse(toolCall.function.arguments) : {}
              };

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
      console.warn("Function call received but no current agent");
      return;
    }

    console.log(`Function called: ${functionCall.name} by ${this.currentAgent}`);

    const result = this.functionHandlers.handleFunctionCall(
      this.currentAgent,
      functionCall
    );

    if (result) {
      console.log(`Function ${functionCall.name} executed successfully`);
    } else {
      console.warn(`Function ${functionCall.name} execution failed`);
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

  setupStatementClickListeners() {
    // Add click listener for "Being Cause In The Matter" box
    const causationCard = document.getElementById('causationStatement')?.closest('.statement-card');
    if (causationCard) {
      causationCard.classList.add('clickable');
      causationCard.addEventListener('click', () => {
        this.handleStatementBoxClick('causation');
      });
    }

    // Add click listeners for other boxes too for future functionality
    const integrityCard = document.getElementById('integrityStatement')?.closest('.statement-card');
    if (integrityCard) {
      integrityCard.classList.add('clickable');
      integrityCard.addEventListener('click', () => {
        this.handleStatementBoxClick('integrity');
      });
    }

    const authenticityCard = document.getElementById('authenticityStatement')?.closest('.statement-card');
    if (authenticityCard) {
      authenticityCard.classList.add('clickable');
      authenticityCard.addEventListener('click', () => {
        this.handleStatementBoxClick('authenticity');
      });
    }

    const commitmentCard = document.getElementById('commitmentStatement')?.closest('.statement-card');
    if (commitmentCard) {
      commitmentCard.classList.add('clickable');
      commitmentCard.addEventListener('click', () => {
        this.handleStatementBoxClick('commitment');
      });
    }
  }

  handleStatementBoxClick(statementType) {
    console.log(`Statement box clicked: ${statementType}`);

    // Add visual feedback
    const cardId = statementType === 'causation' ? 'causationStatement' :
      statementType === 'commitment' ? 'commitmentStatement' :
        statementType === 'integrity' ? 'integrityStatement' : 'authenticityStatement';

    const card = document.getElementById(cardId)?.closest('.statement-card');
    if (card) {
      // Add clicked animation
      card.style.transform = 'scale(0.98)';
      card.style.transition = 'all 0.1s ease';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 100);
    }

    // If we have an active call with Michael, send a simulated user message to VAPI
    if (this.connected && this.currentAgent === 'michael') {
      const userMessage = this.getStatementFocusMessage(statementType);
      console.log(`Sending simulated user message to VAPI: "${userMessage}"`);

      // Send the message to VAPI (this triggers the agent's response and potential tool call)
      this.vapi.send({
        type: "add-message",
        message: {
          role: "user",
          content: userMessage
        }
      });

      // Optional: Update UI to show the simulated message in the chat window for transparency
      const chatMessages = document.getElementById('chatMessages');
      if (chatMessages) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", "user");
        messageDiv.textContent = `🖱️ Clicked: ${userMessage}`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Show the chat window if it's hidden
        const chatWindow = document.getElementById('chat');
        if (chatWindow) {
          chatWindow.style.display = 'block';
        }
      }
    } else {
      // Show a message encouraging them to start a call
      const instructionsElement = document.getElementById('instructions');
      if (instructionsElement) {
        const originalText = instructionsElement.textContent;
        instructionsElement.textContent = `Start a conversation with Michael first, then click on the "${this.getStatementDisplayName(statementType)}" box to focus on that area.`;
        instructionsElement.style.color = '#ff9800';

        setTimeout(() => {
          instructionsElement.textContent = originalText;
          instructionsElement.style.color = '';
        }, 3000);
      }
    }
  }

  getStatementFocusMessage(statementType) {
    const messages = {
      causation: "I want to work on Being Cause in the Matter - taking full ownership and responsibility for my outcomes instead of being at the effect of circumstances.",
      commitment: "I want to work on Being Given By Something Greater - exploring my purpose, calling, and service to something beyond myself.",
      integrity: "I want to work on my integrity - aligning my actions with my values and being whole and complete.",
      authenticity: "I want to work on my authenticity - being true to myself and expressing who I really am."
    };
    return messages[statementType] || "I want to work on this area of personal development.";
  }

  getStatementDisplayName(statementType) {
    const names = {
      causation: "Being Cause In The Matter",
      commitment: "Being Given By Something Greater",
      integrity: "Integrity Statement",
      authenticity: "Authenticity Statement"
    };
    return names[statementType] || statementType;
  }

  async endCall() {
    if (this.currentCall) {
      await this.vapi.stop();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const callManager = new VapiCallManager();
  // Expose globally for Framework-with-Agents.html
  window.vapiCallManager = callManager;
});
