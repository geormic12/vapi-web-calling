import { fredKnowledgeBase, getFredKnowledgeBaseStats } from './fred-knowledge-base.js';

export class FredFunctionHandler {
    constructor() {
        this.knowledgeBase = fredKnowledgeBase;
        console.log('Fred Function Handler initialized');
        getFredKnowledgeBaseStats();
    }

    handleFunctionCall(functionCall) {
        try {
            switch (functionCall.name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(functionCall.parameters);
                case 'ExploreFrameworks':
                    return this.exploreFrameworks(functionCall.parameters);
                case 'ApplyEstMethodology':
                    return this.applyEstMethodology(functionCall.parameters);
                default:
                    return null;
            }
        } catch (error) {
            console.error('Error in Fred function call:', error);
            return {
                success: false,
                data: null,
                agent: 'Fred',
                message: `Error processing function call: ${error.message}`
            };
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        console.log(`Fred searching knowledge base for: "${query}"`);

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
            agent: 'Fred',
            message: `Found ${topResults.length} framework and methodology insights for "${query}"`
        };
    }

    exploreFrameworks(parameters) {
        const { context = '' } = parameters;
        console.log(`Fred exploring frameworks for context: "${context}"`);

        const frameworkEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'frameworks' || value.category === 'methodology' || key.includes('framework')) {
                frameworkEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: frameworkEntries,
            agent: 'Fred',
            message: `Explored ${frameworkEntries.length} applicable frameworks for your context`
        };
    }

    applyEstMethodology(parameters) {
        const { situation = '' } = parameters;
        console.log(`Fred applying est methodology to situation: "${situation}"`);

        const estEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (key.includes('est') || value.content.includes('est') || key.includes('methodology')) {
                estEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: estEntries,
            agent: 'Fred',
            message: `Applied ${estEntries.length} est methodology principles to your situation`
        };
    }
}