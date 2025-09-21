export const debbieKnowledgeBase = new Map([
    ['domain definition', {
        category: 'core_concepts',
        content: 'A domain is a distinct area or realm of human experience with its own rules, context, and appropriate responses. Examples include professional domain, personal domain, family domain, etc.',
        keywords: ['domain', 'distinct area', 'rules', 'context', 'appropriate responses']
    }],
    ['domain collapse', {
        category: 'problems',
        content: 'When people apply the rules, expectations, or approaches of one domain to a different domain, creating confusion and ineffectiveness.',
        keywords: ['domain collapse', 'apply rules', 'wrong domain', 'confusion', 'ineffectiveness']
    }],
    ['contextual appropriateness', {
        category: 'solutions',
        content: 'Different domains require different responses, communication styles, and ways of being. What works in one domain may be inappropriate in another.',
        keywords: ['contextual appropriateness', 'different responses', 'communication styles', 'domain specific']
    }]
]);

export function getDebbieKnowledgeBaseStats() {
    console.log('Debbie Knowledge Base: 3 entries on domain distinctions');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, problems: 1, solutions: 1 } };
}

export function getDebbieAvailableCategories() {
    return ['core_concepts', 'problems', 'solutions'];
}