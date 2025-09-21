import { timKnowledgeBase, getTimKnowledgeBaseStats } from './tim-knowledge-base.js';

export class TimFunctionHandler {
    constructor() {
        this.knowledgeBase = timKnowledgeBase;
        console.log('Tim Function Handler initialized');
        getTimKnowledgeBaseStats();
    }

    handleFunctionCall(functionCall) {
        try {
            switch (functionCall.name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(functionCall.parameters);
                case 'ExploreTermSynthesis':
                    return this.exploreTermSynthesis(functionCall.parameters);
                case 'IdentifyTermClarity':
                    return this.identifyTermClarity(functionCall.parameters);
                default:
                    return null;
            }
        } catch (error) {
            console.error('Error in Tim function call:', error);
            return {
                success: false,
                data: null,
                agent: 'Tim',
                message: `Error processing function call: ${error.message}`
            };
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        console.log(`Tim searching knowledge base for: "${query}"`);

        const results = [];
        const lowerQuery = query.toLowerCase();

        for (const [key, value] of this.knowledgeBase) {
            let relevance = 0;

            // Category filter
            if (category && value.category !== category) {
                continue;
            }

            // Calculate relevance score
            if (key.toLowerCase() === lowerQuery) {
                relevance = 100;
            } else if (key.toLowerCase().includes(lowerQuery)) {
                relevance = 80;
            } else if (value.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery))) {
                relevance = 70;
            } else if (value.content.toLowerCase().includes(lowerQuery)) {
                relevance = 60;
            }

            if (relevance > 0) {
                results.push({
                    key,
                    ...value,
                    relevance
                });
            }
        }

        results.sort((a, b) => b.relevance - a.relevance);
        const topResults = results.slice(0, 5);

        return {
            success: true,
            data: topResults,
            agent: 'Tim',
            message: `Found ${topResults.length} term synthesis insights for "${query}"`
        };
    }

    exploreTermSynthesis(parameters) {
        const { context = '' } = parameters;
        console.log(`Tim exploring term synthesis for context: "${context}"`);

        const synthesisEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'synthesis' || key.includes('synthesize') || key.includes('integration')) {
                synthesisEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: synthesisEntries,
            agent: 'Tim',
            message: `Explored ${synthesisEntries.length} term synthesis approaches for your context`
        };
    }

    identifyTermClarity(parameters) {
        const { terms = '' } = parameters;
        console.log(`Tim identifying term clarity for: "${terms}"`);

        const clarityEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'clarity' || key.includes('clear') || key.includes('precise')) {
                clarityEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: clarityEntries,
            agent: 'Tim',
            message: `Identified ${clarityEntries.length} clarity insights for your terms`
        };
    }
}