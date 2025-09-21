import { paulKnowledgeBase, getPaulKnowledgeBaseStats } from './paul-knowledge-base.js';

export class PaulFunctionHandler {
    constructor() {
        this.knowledgeBase = paulKnowledgeBase;
        console.log('Paul Function Handler initialized');
        getPaulKnowledgeBaseStats();
    }

    handleFunctionCall(functionCall) {
        try {
            switch (functionCall.name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(functionCall.parameters);
                case 'ExplorePerceptualConstraints':
                    return this.explorePerceptualConstraints(functionCall.parameters);
                case 'ShiftPerspective':
                    return this.shiftPerspective(functionCall.parameters);
                default:
                    return null;
            }
        } catch (error) {
            console.error('Error in Paul function call:', error);
            return {
                success: false,
                data: null,
                agent: 'Paul',
                message: `Error processing function call: ${error.message}`
            };
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        console.log(`Paul searching knowledge base for: "${query}"`);

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
            agent: 'Paul',
            message: `Found ${topResults.length} perceptual constraint insights for "${query}"`
        };
    }

    explorePerceptualConstraints(parameters) {
        const { context = '' } = parameters;
        console.log(`Paul exploring perceptual constraints for context: "${context}"`);

        const constraintEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'core_concepts' || key.includes('constraint') || key.includes('limitation')) {
                constraintEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: constraintEntries,
            agent: 'Paul',
            message: `Explored ${constraintEntries.length} perceptual constraints in your context`
        };
    }

    shiftPerspective(parameters) {
        const { situation = '' } = parameters;
        console.log(`Paul facilitating perspective shift for situation: "${situation}"`);

        const perspectiveEntries = [];
        for (const [key, value] of this.knowledgeBase) {
            if (value.category === 'skills' || key.includes('perspective') || key.includes('flexibility')) {
                perspectiveEntries.push({ key, ...value });
            }
        }

        return {
            success: true,
            data: perspectiveEntries,
            agent: 'Paul',
            message: `Facilitated ${perspectiveEntries.length} perspective shifts for your situation`
        };
    }
}