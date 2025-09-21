// Simplified knowledge bases for remaining agents

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

export const fredKnowledgeBase = new Map([
    ['functional constraints definition', {
        category: 'core_concepts',
        content: 'Limitations in how people operate, take action, and produce results. These exist in systems, processes, and habits that prevent optimal performance.',
        keywords: ['functional constraints', 'how people operate', 'produce results', 'prevent optimal performance']
    }],
    ['operational limitations', {
        category: 'problems',
        content: 'Constraints in how people and systems actually function and produce results, preventing effectiveness and capability.',
        keywords: ['operational limitations', 'how systems function', 'preventing effectiveness', 'capability']
    }],
    ['process optimization', {
        category: 'solutions',
        content: 'Identifying and removing constraints that limit optimal functioning to access greater effectiveness and results.',
        keywords: ['process optimization', 'removing constraints', 'optimal functioning', 'greater effectiveness']
    }]
]);

// Stats functions for each
export function getDebbieKnowledgeBaseStats() {
    console.log('Debbie Knowledge Base: 3 entries on domain distinctions');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, problems: 1, solutions: 1 } };
}

export function getTimKnowledgeBaseStats() {
    console.log('Tim Knowledge Base: 3 entries on synthesized terms');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, methods: 1, power: 1 } };
}

export function getPaulKnowledgeBaseStats() {
    console.log('Paul Knowledge Base: 3 entries on perceptual constraints');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, awareness: 1, skills: 1 } };
}

export function getFredKnowledgeBaseStats() {
    console.log('Fred Knowledge Base: 3 entries on functional constraints');
    return { totalEntries: 3, totalKeywords: 15, categories: { core_concepts: 1, problems: 1, solutions: 1 } };
}