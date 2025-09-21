import { debbieKnowledgeBase, getDebbieKnowledgeBaseStats } from './debbie-knowledge-base.js';

export class DebbieFunctionHandler {
    constructor() {
        this.knowledgeBase = debbieKnowledgeBase;
        console.log('Debbie Function Handler initialized');
        getDebbieKnowledgeBaseStats();
    }

    handleFunctionCall(functionCall) {
        try {
            switch (functionCall.name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(functionCall.parameters);
                case 'ExploreDomainDistinctions':
                    return this.exploreDomainDistinctions(functionCall.parameters);
                case 'IdentifyDomainConflicts':
                    return this.identifyDomainConflicts(functionCall.parameters);
                default:
                    return null;
            }
        } catch (error) {
            console.error('Error in Debbie function call:', error);
            return {
                success: false,
                data: null,
                agent: 'Debbie',
                message: `Error processing function call: ${error.message}`
            };
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        console.log(`Debbie searching knowledge base for: "${query}"`);

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
            agent: 'Debbie',
            message: `Found ${topResults.length} domain-related insights for "${query}"`
        };
    }

    exploreDomainDistinctions(parameters) {
        const { context = '' } = parameters;
        console.log(`Debbie exploring domain distinctions for context: "${context}"`);

        const domainEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'domains' || key.includes('domain')) {
                domainEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: domainEntries,
            agent: 'Debbie',
            message: `Explored ${domainEntries.length} domain distinctions for your context`
        };
    }

    identifyDomainConflicts(parameters) {
        const { situation = '' } = parameters;
        console.log(`Debbie identifying domain conflicts in situation: "${situation}"`);

        const conflictEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'conflicts' || key.includes('conflict') || key.includes('tension')) {
                conflictEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: conflictEntries,
            agent: 'Debbie',
            message: `Identified ${conflictEntries.length} potential domain conflicts in your situation`
        };
    }
}