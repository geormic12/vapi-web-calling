export const paulKnowledgeBase = new Map([
    ['perceptual constraints definition', {
        category: 'core_concepts',
        content: 'Invisible limitations in how we see, interpret, and make sense of reality. These constraints shape what we notice and what we consider possible.',
        keywords: ['perceptual constraints', 'invisible limitations', 'how we see', 'shape what we notice']
    }],
    ['paradigm awareness', {
        category: 'awareness',
        content: 'Recognizing the paradigms and worldviews that shape our perception and limit what we see as possible.',
        keywords: ['paradigm awareness', 'worldviews', 'shape perception', 'limit possible']
    }],
    ['perceptual flexibility', {
        category: 'skills',
        content: 'The ability to shift perspectives and see from multiple viewpoints, expanding what becomes visible and possible.',
        keywords: ['perceptual flexibility', 'shift perspectives', 'multiple viewpoints', 'expand visible']
    }]
]);

export function getPaulKnowledgeBaseStats() {
    console.log('Paul Knowledge Base: 3 entries on perceptual constraints');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, awareness: 1, skills: 1 } };
}

export function getPaulAvailableCategories() {
    return ['core_concepts', 'awareness', 'skills'];
}