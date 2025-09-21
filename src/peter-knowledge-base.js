/**
 * Peter's Knowledge Base - Phenomena and Phenomenological Distinctions
 */

export const peterKnowledgeBase = new Map([
    ['phenomena definition', {
        category: 'core_concepts',
        content: 'A phenomenon is what shows up in direct experience before interpretation, story, or meaning-making. It is the raw, observable facts of experience without any added significance or narrative. Phenomena are neutral and exist independently of our interpretations about them.',
        keywords: ['phenomena', 'direct experience', 'observable facts', 'neutral', 'before interpretation']
    }],
    ['phenomenon vs interpretation', {
        category: 'distinctions',
        content: 'The fundamental distinction between what actually happened (phenomenon) and the meaning we add to it (interpretation). For example: Phenomenon - "He didn\'t call." Interpretation - "He doesn\'t care about me." The phenomenon is neutral; the interpretation creates the emotional experience.',
        keywords: ['phenomenon vs interpretation', 'what happened vs meaning', 'neutral vs emotional', 'facts vs story']
    }],
    ['phenomenological reduction', {
        category: 'methods',
        content: 'The practice of stripping away interpretations, assumptions, and meaning to get to the bare phenomenon itself. This involves asking: "What exactly happened? What are the observable facts? What would a video camera have recorded?"',
        keywords: ['phenomenological reduction', 'stripping away interpretations', 'observable facts', 'video camera test']
    }],
    ['story vs experience', {
        category: 'distinctions',
        content: 'Story is the narrative we create about experience, while experience is what actually happens in the present moment. People often live in their stories about experience rather than in the experience itself, which creates suffering and limits authentic response.',
        keywords: ['story vs experience', 'narrative about experience', 'present moment', 'authentic response']
    }],
    ['meaning making awareness', {
        category: 'awareness',
        content: 'Recognizing that meaning-making is something we do to experience, not something inherent in experience itself. The same phenomenon can have completely different meanings for different people. Awareness of meaning-making as optional creates freedom.',
        keywords: ['meaning making', 'optional meaning', 'inherent vs added', 'creates freedom']
    }],
    ['present moment phenomena', {
        category: 'presence',
        content: 'Phenomena exist only in the present moment. When we\'re in story about experience, we\'re not actually experiencing - we\'re thinking about experience. Returning to present moment phenomena creates presence and authenticity.',
        keywords: ['present moment', 'phenomena exist now', 'thinking vs experiencing', 'presence authenticity']
    }],
    ['authentic response', {
        category: 'response',
        content: 'When you respond to phenomena rather than your stories about phenomena, your response is more authentic, effective, and appropriate to what\'s actually happening. This requires distinguishing between what happened and what you made it mean.',
        keywords: ['authentic response', 'respond to phenomena', 'effective appropriate', 'what happened vs what made it mean']
    }],
    ['suffering and story', {
        category: 'transformation',
        content: 'Most suffering comes not from what happens, but from the story we tell ourselves about what happens. By distinguishing phenomena from interpretation, we can address the source of suffering - our meaning-making rather than our circumstances.',
        keywords: ['suffering from story', 'not from what happens', 'meaning-making source', 'address interpretation']
    }]
]);

export function getPeterKnowledgeBaseStats() {
    const categories = {};
    let totalEntries = 0;
    let totalKeywords = 0;

    for (const [key, value] of peterKnowledgeBase) {
        totalEntries++;
        totalKeywords += value.keywords.length;

        if (categories[value.category]) {
            categories[value.category]++;
        } else {
            categories[value.category] = 1;
        }
    }

    console.log('Peter Knowledge Base Stats:', { totalEntries, totalKeywords, categories });
    return { totalEntries, totalKeywords, categories };
}

export function getPeterAvailableCategories() {
    const categories = new Set();
    for (const [key, value] of peterKnowledgeBase) {
        categories.add(value.category);
    }
    return Array.from(categories).sort();
}