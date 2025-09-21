import { lisaSystemPrompt } from "./lisa-prompt.js";

export const lisaOptions = {
    name: "Lisa",
    voice: {
        voiceId: "sarah",
        provider: "11labs",
        stability: 0.5,
        similarityBoost: 0.75,
    },
    model: {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: lisaSystemPrompt,
            },
        ],
        provider: "openai",
        functions: [
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
        ],
        // Knowledge base ID from Vapi API
        knowledgeBaseId: "13643ee2-571a-4be2-ba72-03cc6dd1c2ec",
        maxTokens: 250,
        temperature: 0.7,
        emotionRecognitionEnabled: true,
    },
    recordingEnabled: true,
    firstMessage: "Hello, I'm Lisa, your integrity coach. How can I support you in creating more workability and alignment in your life?",
    voicemailMessage:
        "You've reached Lisa's voicemail. Please leave a message about what you'd like to explore regarding integrity or personal development, and I'll get back to you.",
    endCallFunctionEnabled: false,
    endCallMessage: "Thank you for our conversation. Remember, integrity is always available to you!",
    transcriber: {
        model: "nova-2",
        keywords: ["integrity", "coaching", "development", "workability", "being", "ontological"],
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
    dialKeypadFunctionEnabled: false,
    endCallPhrases: ["goodbye", "thank you", "that's all"],
    hipaaEnabled: false,
    voicemailDetectionEnabled: false,
};