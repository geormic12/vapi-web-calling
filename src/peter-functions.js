import { peterKnowledgeBase, getPeterKnowledgeBaseStats, getPeterAvailableCategories } from './peter-knowledge-base.js';

export class PeterFunctionHandler {
    constructor() {
        this.knowledgeBase = peterKnowledgeBase;
        this.agentName = "Peter";
        console.log(`${this.agentName} Function Handler initialized`);
        getPeterKnowledgeBaseStats();
    }

    handleFunctionCall(functionCall) {
        const { name, parameters } = functionCall;

        try {
            switch (name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(parameters);
                case 'DistinguishPhenomena':
                    return this.distinguishPhenomena(parameters);
                case 'IdentifyStories':
                    return this.identifyStories(parameters);
                case 'ChangeColor':
                    return this.changeColor(parameters);
                case 'WriteText':
                    return this.writeText(parameters);
                default:
                    return { success: false, error: `Unknown function: ${name}`, agent: this.agentName };
            }
        } catch (error) {
            return { success: false, error: error.message, agent: this.agentName };
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        if (!query) return { success: false, error: 'Query required', agent: this.agentName };

        const results = [];
        const queryLower = query.toLowerCase();

        for (const [key, entry] of this.knowledgeBase) {
            if (category && entry.category !== category) continue;

            let relevance = 0;
            if (key === queryLower) relevance = 100;
            else if (key.includes(queryLower)) relevance = 80;
            else if (entry.keywords.some(k => k.toLowerCase().includes(queryLower))) relevance = 70;
            else if (entry.content.toLowerCase().includes(queryLower)) relevance = 60;

            if (relevance > 0) {
                results.push({ key, ...entry, relevance });
            }
        }

        results.sort((a, b) => b.relevance - a.relevance);
        return {
            success: true,
            data: { query, results: results.slice(0, 5), availableCategories: getPeterAvailableCategories() },
            agent: this.agentName,
            message: `Found ${results.length} concept(s) about "${query}" in phenomenological knowledge base.`
        };
    }

    distinguishPhenomena(parameters) {
        const { description } = parameters;
        return {
            success: true,
            data: {
                analysis: 'Distinguishing between phenomena and interpretation',
                questions: [
                    'What exactly happened, without interpretation?',
                    'What story are you telling yourself about what that means?',
                    'What would a video camera have recorded?',
                    'How does that story affect your experience?'
                ]
            },
            agent: this.agentName,
            message: 'Helping distinguish phenomena from interpretation for greater clarity.'
        };
    }

    identifyStories(parameters) {
        const { situation } = parameters;
        return {
            success: true,
            data: {
                guidance: 'Identifying stories vs direct experience',
                indicators: [
                    'When you add meaning to facts',
                    'When you interpret others\' actions',
                    'When you predict future outcomes',
                    'When you connect unrelated events'
                ]
            },
            agent: this.agentName,
            message: 'Identifying stories and interpretations that may be creating suffering.'
        };
    }

    changeColor(parameters) {
        const { ColorCode } = parameters;
        if (!ColorCode) return { success: false, error: 'ColorCode required', agent: this.agentName };

        try {
            document.body.style.backgroundColor = ColorCode.replace(/[^#a-fA-F0-9]/g, '');
            return { success: true, data: { colorCode: ColorCode }, agent: this.agentName, message: `Changed color to ${ColorCode}` };
        } catch (error) {
            return { success: false, error: error.message, agent: this.agentName };
        }
    }

    writeText(parameters) {
        const { Text } = parameters;
        if (!Text) return { success: false, error: 'Text required', agent: this.agentName };

        try {
            let displayArea = document.getElementById('agent-text-output') || (() => {
                const area = document.createElement('div');
                area.id = 'agent-text-output';
                area.style.cssText = 'margin: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;';
                document.body.appendChild(area);
                return area;
            })();

            const sanitizedText = Text.replace(/[<>]/g, '');
            const timestamp = new Date().toLocaleTimeString();
            displayArea.innerHTML += `<p><strong>[${timestamp}] ${this.agentName}:</strong> ${sanitizedText}</p>`;

            return { success: true, data: { text: sanitizedText }, agent: this.agentName, message: `${this.agentName} wrote: "${sanitizedText}"` };
        } catch (error) {
            return { success: false, error: error.message, agent: this.agentName };
        }
    }
}