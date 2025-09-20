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
        maxTokens: 250,
        temperature: 0.7,
        emotionRecognitionEnabled: true,
    },
    recordingEnabled: true,
    firstMessage: "Hello, this is Lisa.",
    voicemailMessage:
        "You've reached our voicemail. Please leave a message after the beep, and we'll get back to you as soon as possible.",
    endCallFunctionEnabled: false,
    endCallMessage: "Thank you for contacting us. Have a great day!",
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
    dialKeypadFunctionEnabled: false,
    endCallPhrases: ["goodbye"],
    hipaaEnabled: false,
    voicemailDetectionEnabled: false,
};