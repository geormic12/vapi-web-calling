export const timKnowledgeBase = new Map([
    ['synthesized terms definition', {
        category: 'core_concepts',
        content: 'Precisely crafted concepts that bring together multiple ideas into a single, powerful framework that creates new understanding and possibility.',
        keywords: ['synthesized terms', 'multiple ideas', 'powerful framework', 'new understanding']
    }],
    ['conceptual synthesis', {
        category: 'methods',
        content: 'The art of combining multiple concepts into a single, powerful term that creates new understanding and possibility.',
        keywords: ['conceptual synthesis', 'combining concepts', 'single term', 'new understanding']
    }],
    ['generative language', {
        category: 'power',
        content: 'Well-crafted synthesized terms generate new thinking and action rather than just describing existing conditions.',
        keywords: ['generative language', 'new thinking', 'action', 'beyond describing']
    }]
]);

export function getTimKnowledgeBaseStats() {
    console.log('Tim Knowledge Base: 3 entries on synthesized terms');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, methods: 1, power: 1 } };
}

export function getTimAvailableCategories() {
    return ['core_concepts', 'methods', 'power'];
}