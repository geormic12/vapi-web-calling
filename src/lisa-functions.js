export class LisaFunctionHandler {
    constructor() {
        console.log(`🚀 Initializing Lisa's Function Handler...`);

        this.stats = {
            colorChanges: 0,
            textWrites: 0,
            totalCalls: 0
        };

        console.log(`✅ Lisa is ready with simplified functions (Vapi handles knowledge base)`);
    }

    handleFunctionCall(functionCall) {
        this.stats.totalCalls++;

        console.log(`🎯 Lisa Function Call:`, {
            function: functionCall.name,
            parameters: functionCall.parameters,
            timestamp: new Date().toISOString()
        });

        try {
            switch (functionCall.name) {
                case 'ChangeColor':
                    return this.changeColor(functionCall.parameters);
                case 'WriteText':
                    return this.writeText(functionCall.parameters);
                default:
                    return {
                        success: false,
                        message: `Unknown function: ${functionCall.name}`,
                        agent: 'lisa'
                    };
            }
        } catch (error) {
            console.error("Function call error:", error);
            return {
                success: false,
                message: "Function execution failed",
                agent: 'lisa',
                error: error.message
            };
        }
    }

    changeColor(parameters) {
        this.stats.colorChanges++;
        const { ColorCode } = parameters;

        console.log(`� Lisa changing color to: ${ColorCode}`);

        if (!ColorCode || !ColorCode.startsWith('#')) {
            return {
                success: false,
                message: "Invalid color code. Please provide a valid HEX color code starting with #",
                agent: 'lisa'
            };
        }

        try {
            // Apply color change to body background
            document.body.style.backgroundColor = ColorCode;

            // Also apply to Lisa's button if it exists
            const lisaButton = document.getElementById('callWithLisa');
            if (lisaButton) {
                lisaButton.style.backgroundColor = ColorCode;
            }

            return {
                success: true,
                data: { colorCode: ColorCode },
                message: `Background color changed to ${ColorCode}`,
                agent: 'lisa'
            };
        } catch (error) {
            return {
                success: false,
                message: "Failed to change color",
                agent: 'lisa',
                error: error.message
            };
        }
    }

    writeText(parameters) {
        this.stats.textWrites++;
        const { Text } = parameters;

        console.log(`✍️ Lisa writing: "${Text}"`);

        if (!Text || Text.trim() === '') {
            return {
                success: false,
                message: "No text provided to write",
                agent: 'lisa'
            };
        }

        try {
            // Try multiple elements for text output
            const textElement = document.getElementById('function-output') ||
                document.getElementById('vapiTyping');

            if (textElement) {
                textElement.textContent = Text;
                return {
                    success: true,
                    data: { text: Text },
                    message: `Text written: "${Text}"`,
                    agent: 'lisa'
                };
            } else {
                return {
                    success: false,
                    message: "Text output element not found",
                    agent: 'lisa'
                };
            }
        } catch (error) {
            return {
                success: false,
                message: "Failed to write text",
                agent: 'lisa',
                error: error.message
            };
        }
    }

    getStats() {
        return {
            ...this.stats,
            knowledgeBaseNote: "Knowledge base handled by Vapi automatically"
        };
    }
}