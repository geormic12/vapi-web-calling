export const fredKnowledgeBase = new Map([
    ['framework methodology', {
        category: 'core_concepts',
        content: 'Systematic approaches and structured methodologies for transforming situations and achieving breakthrough results.',
        keywords: ['framework methodology', 'systematic approaches', 'structured methodologies', 'breakthrough results']
    }],
    ['est framework application', {
        category: 'frameworks',
        content: 'Practical application of est principles and methodologies for personal and organizational transformation.',
        keywords: ['est framework', 'practical application', 'personal transformation', 'organizational transformation']
    }],
    ['frameworks for breakthrough', {
        category: 'methodology',
        content: 'Structured approaches that create the conditions for breakthrough thinking and extraordinary results.',
        keywords: ['frameworks for breakthrough', 'structured approaches', 'breakthrough thinking', 'extraordinary results']
    }]
]);

export function getFredKnowledgeBaseStats() {
    console.log('Fred Knowledge Base: 3 entries on frameworks and est methodology');
    return { totalEntries: 3, totalKeywords: 16, categories: { core_concepts: 1, frameworks: 1, methodology: 1 } };
}

export function getFredAvailableCategories() {
    return ['core_concepts', 'frameworks', 'methodology'];
}