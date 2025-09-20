export const brianaOptions = {
    name: "Briana",
    voice: {
        voiceId: "sarah", // Different voice for Briana
        provider: "11labs",
        stability: 0.5,
        similarityBoost: 0.75,
    },
    model: {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are Briana, a friendly and helpful AI assistant. You provide clear, concise answers and are always ready to help with any questions or tasks. Keep your responses engaging and positive.`,
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
    firstMessage: "Hello, this is Briana.",
    voicemailMessage:
        "You've reached Briana's voicemail. Please leave a message after the beep.",
    endCallFunctionEnabled: false,
    endCallMessage: "Thank you for calling. Goodbye!",
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