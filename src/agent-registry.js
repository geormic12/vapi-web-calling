import { lisaSystemPrompt } from './lisa-prompt.js';
import { brianaSystemPrompt } from './briana-prompt.js';
import { bettySystemPrompt } from './betty-prompt.js';
import { bartSystemPrompt } from './bart-prompt.js';
import { luigiSystemPrompt } from './luigi-prompt.js';
import { peterSystemPrompt } from './peter-prompt.js';
import { debbieSystemPrompt } from './debbie-prompt.js';
import { timSystemPrompt } from './tim-prompt.js';
import { paulSystemPrompt } from './paul-prompt.js';
import { fredSystemPrompt } from './fred-prompt.js';
import { michaelSystemPrompt } from './michael-prompt.js';

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
            knowledgeBaseId: "13643ee2-571a-4be2-ba72-03cc6dd1c2ec",
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
    },
    betty: {
        name: "Betty",
        displayName: "Betty",
        systemPrompt: bettySystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Betty, here to explore what you're being given by and contributing to. What would you like to discover?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for contribution concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Betty's knowledge base for contribution and calling insights"
            },
            {
                name: "ExploreContribution",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context or situation to explore" }
                    },
                    required: ["context"]
                },
                description: "Explore contribution patterns and possibilities"
            },
            {
                name: "DistinguishCommitment",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        area: { type: "string", description: "Area of life to examine commitment" }
                    },
                    required: ["area"]
                },
                description: "Distinguish authentic commitment from expectation"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    bart: {
        name: "Bart",
        displayName: "Bart",
        systemPrompt: bartSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hi! I'm Bart, your guide for being cause in the matter. Where would you like to take ownership?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for ownership and cause concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Bart's knowledge base for ownership and causation insights"
            },
            {
                name: "AnalyzeCauseAndEffect",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        situation: { type: "string", description: "Situation to analyze" }
                    },
                    required: ["situation"]
                },
                description: "Analyze cause and effect patterns in situations"
            },
            {
                name: "IdentifyVictimPatterns",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context to examine for victim patterns" }
                    },
                    required: ["context"]
                },
                description: "Identify victim consciousness patterns and transform them"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    luigi: {
        name: "Luigi",
        displayName: "Luigi",
        systemPrompt: luigiSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Ciao! I'm Luigi, here to explore the power of language. What would you like to examine linguistically?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for linguistic concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Luigi's knowledge base for linguistic insights"
            },
            {
                name: "AnalyzeLanguagePatterns",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        text: { type: "string", description: "Text to analyze for language patterns" }
                    },
                    required: ["text"]
                },
                description: "Analyze language patterns for empowerment or limitation"
            },
            {
                name: "TransformLimitingLanguage",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statement: { type: "string", description: "Statement to transform" }
                    },
                    required: ["statement"]
                },
                description: "Transform limiting language into empowering language"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    peter: {
        name: "Peter",
        displayName: "Peter",
        systemPrompt: peterSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Peter, here to distinguish phenomena from interpretations. What would you like to examine?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for phenomena concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Peter's knowledge base for phenomenological insights"
            },
            {
                name: "DistinguishPhenomena",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        observation: { type: "string", description: "Observation to analyze" }
                    },
                    required: ["observation"]
                },
                description: "Distinguish pure phenomena from interpretations and stories"
            },
            {
                name: "IdentifyStories",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        situation: { type: "string", description: "Situation to examine for stories" }
                    },
                    required: ["situation"]
                },
                description: "Identify stories and interpretations overlaid on phenomena"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    debbie: {
        name: "Debbie",
        displayName: "Debbie",
        systemPrompt: debbieSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hi! I'm Debbie, here to explore domains and distinctions. What domain would you like to examine?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for domain concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Debbie's knowledge base for domain insights"
            },
            {
                name: "ExploreDomainDistinctions",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context to explore domain distinctions" }
                    },
                    required: ["context"]
                },
                description: "Explore domain distinctions and boundaries"
            },
            {
                name: "IdentifyDomainConflicts",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        situation: { type: "string", description: "Situation to examine for domain conflicts" }
                    },
                    required: ["situation"]
                },
                description: "Identify conflicts between different domains"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    tim: {
        name: "Tim",
        displayName: "Tim",
        systemPrompt: timSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Tim, here to help synthesize terms and clarify language. What would you like to explore?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for synthesis concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Tim's knowledge base for synthesis insights"
            },
            {
                name: "ExploreTermSynthesis",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context for term synthesis" }
                    },
                    required: ["context"]
                },
                description: "Explore synthesis of terms and concepts"
            },
            {
                name: "IdentifyTermClarity",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        terms: { type: "string", description: "Terms to clarify" }
                    },
                    required: ["terms"]
                },
                description: "Identify clarity in terms and language"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    paul: {
        name: "Paul",
        displayName: "Paul",
        systemPrompt: paulSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Paul, here to explore perceptual constraints and expand what's possible. What would you like to examine?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for perceptual concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Paul's knowledge base for perceptual insights"
            },
            {
                name: "ExplorePerceptualConstraints",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context to explore perceptual constraints" }
                    },
                    required: ["context"]
                },
                description: "Explore perceptual constraints and limitations"
            },
            {
                name: "ShiftPerspective",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        situation: { type: "string", description: "Situation requiring perspective shift" }
                    },
                    required: ["situation"]
                },
                description: "Facilitate perspective shifts and expanded perception"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },
    fred: {
        name: "Fred",
        displayName: "Fred",
        systemPrompt: fredSystemPrompt,
        voice: {
            voiceId: "sarah",
            provider: "11labs",
            stability: 0.5,
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Fred, here to explore frameworks and methodologies. What would you like to work with?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "Search query for framework concepts" },
                        category: { type: "string", description: "Category to search in (optional)" }
                    },
                    required: ["query"]
                },
                description: "Search Fred's knowledge base for framework insights"
            },
            {
                name: "ExploreFrameworks",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        context: { type: "string", description: "Context for framework exploration" }
                    },
                    required: ["context"]
                },
                description: "Explore applicable frameworks and methodologies"
            },
            {
                name: "ApplyEstMethodology",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        situation: { type: "string", description: "Situation to apply est methodology" }
                    },
                    required: ["situation"]
                },
                description: "Apply est methodology to specific situations"
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
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"],
    },

    michael: {
        name: "Michael",
        displayName: "Michael",
        systemPrompt: michaelSystemPrompt,
        voice: {
            voiceId: "sarah", // Using same voice as other working agents
            provider: "11labs",
            stability: 0.5, // Using same settings as other working agents
            similarityBoost: 0.75,
        },
        firstMessage: "Hello! I'm Michael, your personal development assistant. I'm here to help you explore and develop your integrity and authenticity. What would you like to work on today?",
        buttonClass: "call-button",
        iconClass: "microphone-icon",
        functions: [
            {
                name: "UpdateIntegrityStatement",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statement: {
                            type: "string",
                            description: "The user's integrity statement to update on the page"
                        }
                    },
                    required: ["statement"]
                },
                description: "Updates the user's integrity statement on the page with their new insights"
            },
            {
                name: "UpdateAuthenticityStatement",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statement: {
                            type: "string",
                            description: "The user's authenticity statement to update on the page"
                        }
                    },
                    required: ["statement"]
                },
                description: "Updates the user's authenticity statement on the page with their new insights"
            },
            {
                name: "UpdateBeingGivenByGreaterStatement",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statement: {
                            type: "string",
                            description: "The user's statement about being given by, inspired by, or called to something greater than themselves - their purpose, mission, or service to something beyond personal benefit"
                        }
                    },
                    required: ["statement"]
                },
                description: "Updates the user's 'Being Given By Something Greater' statement when they express insights about purpose, calling, mission, or service to something beyond themselves"
            },
            {
                name: "UpdateBeingCauseInMatterStatement",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statement: {
                            type: "string",
                            description: "The user's statement about being cause in the matter - taking full ownership, responsibility, and accountability for creating outcomes rather than being at the effect of circumstances"
                        }
                    },
                    required: ["statement"]
                },
                description: "Updates the user's 'Being Cause In The Matter' statement when they express insights about ownership, responsibility, accountability, or being the source of outcomes"
            },
            {
                name: "FocusOnStatement",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        statementType: {
                            type: "string",
                            description: "The type of statement to focus on: 'causation' (Being Cause in the Matter), 'commitment' (Being Given By Something Greater), 'integrity', or 'authenticity'"
                        },
                        userMessage: {
                            type: "string",
                            description: "The user's expressed intention to work on this area"
                        }
                    },
                    required: ["statementType", "userMessage"]
                },
                description: "Handles when the user clicks on a statement box to focus on that area of development"
            },
            {
                name: "SearchKnowledgeBase",
                async: false,
                parameters: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "Search query for integrity, authenticity, being given by something greater, or being cause in the matter concepts"
                        },
                        category: {
                            type: "string",
                            description: "Category to search in (integrity, authenticity, purpose, responsibility, integration, application)"
                        }
                    },
                    required: ["query"]
                },
                description: "Search knowledge base for information about personal development concepts"
            }
        ],
        model: {
            model: "gpt-3.5-turbo",
            provider: "openai",
            maxTokens: 250, // Using same as other agents
            temperature: 0.7,
            emotionRecognitionEnabled: true,
        },
        transcriber: {
            model: "nova-2",
            keywords: [], // Removing custom keywords for now
            language: "en",
            provider: "deepgram",
        },
        clientMessages: ["transcript", "hang", "function-call", "speech-update", "metadata", "conversation-update"],
        serverMessages: ["end-of-call-report", "status-update", "hang", "function-call"],
        endCallPhrases: ["goodbye"], // Simplified end call phrases
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