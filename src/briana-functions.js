export class BrianaFunctionHandler {
    constructor() {
        this.assistantData = new Map();
        this.conversationHistory = [];
    }

    handleFunctionCall(functionCall) {
        switch (functionCall.name) {
            case 'ChangeColor':
                return this.changeColor(functionCall.parameters);
            case 'WriteText':
                return this.writeText(functionCall.parameters);
            case 'BrianaSpecificFunction':
                return this.handleBrianaFunction(functionCall.parameters);
            default:
                console.warn(`Unknown function: ${functionCall.name}`);
                return null;
        }
    }

    changeColor(parameters) {
        const { ColorCode } = parameters;
        console.log(`Briana changing color to: ${ColorCode}`);

        // Apply color change to Briana's button
        const brianaButton = document.getElementById('callWithBriana');
        if (brianaButton) {
            brianaButton.style.backgroundColor = ColorCode;
        }

        return {
            success: true,
            colorCode: ColorCode,
            agent: 'Briana',
            message: `Briana changed color to ${ColorCode}`
        };
    }

    writeText(parameters) {
        const { Text } = parameters;
        console.log(`Briana writing text: ${Text}`);

        const textArea = document.getElementById('vapiTyping');
        if (textArea) {
            textArea.textContent = `Briana: ${Text}`;
        }

        return {
            success: true,
            text: Text,
            agent: 'Briana',
            message: `Briana wrote: ${Text}`
        };
    }

    handleBrianaFunction(parameters) {
        const { action } = parameters;
        console.log('Briana specific function called with action:', action);

        // Example Briana-specific functionality
        switch (action) {
            case 'greeting':
                return { success: true, message: 'Briana says hello!', agent: 'Briana' };
            case 'help':
                return { success: true, message: 'Briana is here to help you with any questions!', agent: 'Briana' };
            default:
                return { success: false, message: 'Unknown action for Briana', agent: 'Briana' };
        }
    }

    logConversation(message) {
        this.conversationHistory.push({
            timestamp: new Date().toISOString(),
            message: message,
            agent: 'Briana'
        });
    }

    getConversationHistory() {
        return this.conversationHistory;
    }
}