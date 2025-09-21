import { lisaSystemPrompt } from './lisa-prompt.js';
import { brianaSystemPrompt } from './briana-prompt.js';

export const agentRegistry = {
    lisa: {
        name: "Lisa",
        displayName: "Lisa",
        systemPrompt: lisaSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello, I'm your ontological integrity coach. What area of your life would you like to explore today?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchIntegrityKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "Search query for integrity concepts"
                        },
                        category: {
                            type: "string",
                            description: "Category to search in (integrity, coaching, philosophy)"
                        }
                    },
                    required: ["query"]
                },
                description: "Search integrity knowledge base for specific information about integrity concepts"
            },
            {
                name: "ChangeColor",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        ColorCode: {
                            type: "string",
                            description: "The HEX color code including the #",
                        },
                    },
                },
                description: "Changes the color of a HTML element",
            },
            {
                name: "WriteText",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        Text: {
                            type: "string",
                            description: "The text to write",
                        },
                    },
                },
                description: "Writes text on a website on user request",
            }
        ],
        model: {
            model: "gpt-3.5-turbo",
            provider: "openai",
            maxTokens: 250,
            temperature: 0.7,
            emotionRecognitionEnabled: true,
        },
        transcriber: {
            model: "nova-2",
            keywords: [],
            language: "en",
            provider: "deepgram",
        },
        clientMessages: [
            "transcript",
            "hang",
            "function-call",
            "speech-update",
            "metadata",
            "conversation-update",
        ],
        serverMessages: [
            "end-of-call-report",
            "status-update",
            "hang",
            "function-call",
        ],
        endCallPhrases: ["goodbye"],
    },
    briana: {
        name: "Briana",
        displayName: "Briana",
        systemPrompt: brianaSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hi there! I'm Briana, ready to help you today.",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "Search query for knowledge base concepts"
                        },
                        category: {
                            type: "string",
                            description: "Category to search in (optional)"
                        }
                    },
                    required: ["query"]
                },
                description: "Search Briana's knowledge base for specific information"
            },
            {
                name: "ChangeColor",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        ColorCode: {
                            type: "string",
                            description: "The HEX color code including the #",
                        },
                    },
                },
                description: "Changes the color of a HTML element",
            },
            {
                name: "WriteText",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        Text: {
                            type: "string",
                            description: "The text to write",
                        },
                    },
                },
                description: "Writes text on a website on user request",
            },
            {
                name: "BrianaSpecificFunction",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        action: {
                            type: "string",
                            description: "Action to perform (greeting, help, etc.)"
                        }
                    },
                    required: ["action"]
                },
                description: "Briana-specific function for custom actions"
            }
        ],
        model: {
            model: "gpt-3.5-turbo",
            provider: "openai",
            maxTokens: 250,
            temperature: 0.7,
            emotionRecognitionEnabled: true,
        },
        transcriber: {
            model: "nova-2",
            keywords: [],
            language: "en",
            provider: "deepgram",
        },
        clientMessages: [
            "transcript",
            "hang",
            "function-call",
            "speech-update",
            "metadata",
            "conversation-update",
        ],
        serverMessages: [
            "end-of-call-report",
            "status-update",
            "hang",
            "function-call",
        ],
        endCallPhrases: ["goodbye"],
    }
    // Add more agents here as needed
};

export function getAgentConfig(agentId) {
    return agentRegistry[agentId];
}

export function getAllAgents() {
    return Object.keys(agentRegistry);
}

export function buildAssistantOptions(agentConfig) {
    return {
        name: agentConfig.name,
        voice: agentConfig.voice,
        model: {
            ...agentConfig.model,
            messages: [
                {
                    role: "system",
                    content: agentConfig.systemPrompt,
                },
            ],
            functions: agentConfig.functions || [],
        },
        firstMessage: agentConfig.firstMessage,
        transcriber: agentConfig.transcriber,
        recordingEnabled: true,
        voicemailMessage: `You've reached ${agentConfig.displayName}'s voicemail. Please leave a message after the beep.`,
        endCallFunctionEnabled: false,
        endCallMessage: `Thank you for calling ${agentConfig.displayName}. Have a great day!`,
        clientMessages: agentConfig.clientMessages,
        serverMessages: agentConfig.serverMessages,
        dialKeypadFunctionEnabled: false,
        endCallPhrases: agentConfig.endCallPhrases,
        hipaaEnabled: false,
        voicemailDetectionEnabled: false,
    };
}