/**
 * Lisa's Integrity Knowledge Base
 * 
 * This file contains all the integrity concepts, coaching methodologies,
 * and Werner Erhard principles that Lisa uses to provide guidance.
 * 
 * Knowledge Base Structure:
 * - Key: String identifier for the concept
 * - Value: Object with category, content, and keywords
 */

export const lisaKnowledgeBase = new Map([
    // Core Integrity Definitions
    ['integrity definition', {
        category: 'integrity',
        content: 'Integrity is a positive phenomenon - a state of being whole, complete, unbroken, unimpaired, sound, and in perfect condition. It has nothing to do with good or bad, right or wrong, morality, ethics, or legality. It is purely a state or condition of wholeness.',
        keywords: ['integrity', 'whole', 'complete', 'positive phenomenon']
    }],
    ['integrity for a person', {
        category: 'integrity',
        content: 'For a person, integrity is a matter of your word being whole and complete. Your "word" includes: what you said you\'d do (explicit promises), what you know to do (unspoken expectations), what you stand for (values/principles), what you allow to happen (by not speaking up), what you expect of others (implied standards), and what you say is so (assertions of fact/reality).',
        keywords: ['word', 'promises', 'values', 'expectations', 'wholeness']
    }],
    ['honoring your word', {
        category: 'integrity',
        content: 'Honoring your word is the pathway to integrity. It means: (1) Keeping your word - doing exactly what you said you would do, by the time you said you\'d do it, OR (2) As soon as you know you will not keep your word, informing all parties who are counting on it that you won\'t, and cleaning up any mess (consequences, impacts, or fallout) you caused.',
        keywords: ['honoring', 'keeping word', 'cleaning up', 'pathway']
    }],
    ['out of integrity', {
        category: 'integrity',
        content: 'When your word is not whole and complete - when you\'re not honoring it. This creates "unworkability" in life: things become unreliable, unpredictable, and less effective. It leads to self-disintegration (feeling incomplete as a person), reduced trust from others, and a smaller opportunity set for performance.',
        keywords: ['unworkability', 'unreliable', 'self-disintegration', 'trust']
    }],
    ['word to oneself', {
        category: 'integrity',
        content: 'The foundation of integrity. Your word to yourself (e.g., "I am a person of integrity" or personal commitments like "I\'ll work out tomorrow") must be honored just as rigorously. Not honoring it diminishes you as a whole person and creates inconsistency others notice.',
        keywords: ['self-commitment', 'personal word', 'foundation', 'consistency']
    }],

    // Werner Erhard Principles
    ['ontological law', {
        category: 'philosophy',
        content: 'The Ontological Law of Integrity: As integrity diminishes, the opportunity for performance diminishes. Restoring integrity expands workability and opens breakthroughs.',
        keywords: ['ontological law', 'performance', 'workability', 'breakthrough']
    }],
    ['cost-benefit analysis', {
        category: 'integrity',
        content: 'Never apply cost-benefit analysis to honoring your word, as it virtually guarantees you\'ll be out of integrity and untrustworthy (unless you explicitly state upfront that you\'ll use it, but then you\'re declaring yourself an opportunist). Integrity requires honoring without contingency.',
        keywords: ['cost-benefit', 'untrustworthy', 'opportunist', 'contingency']
    }],
    ['morality vs integrity', {
        category: 'philosophy',
        content: 'Morality: Society\'s standards of desirable/undesirable behavior. Ethics: A group\'s agreed-upon standards of right/wrong conduct. Legality: Laws and rules enforced by authority. Integrity incorporates these as potential "words" but is separate - it\'s about wholeness, not virtue.',
        keywords: ['morality', 'ethics', 'legality', 'virtue', 'distinction']
    }],

    // Coaching Methodology
    ['ontological coaching', {
        category: 'coaching',
        content: 'A coaching methodology that focuses on the being of the person, not just their doing. It examines how language, emotions, and body create our experience of reality. The coach empowers the user to see for themselves, leading to breakthroughs where they feel whole, complete, and empowered.',
        keywords: ['ontological', 'being', 'language', 'emotions', 'body', 'breakthrough']
    }],
    ['breakthrough methodology', {
        category: 'coaching',
        content: 'The process: (1) Identify an important area where things aren\'t working well, (2) Distinguish integrity and explore where word is not whole/complete, (3) Guide restoration by honoring word and cleaning up messes, (4) Empower action and check for breakthroughs.',
        keywords: ['breakthrough', 'methodology', 'restoration', 'empowerment']
    }],
    ['werner erhard style', {
        category: 'coaching',
        content: 'Direct, probing, empowering, with a sense of possibility. Use "distinguish" often. Speak conversationally, pause for responses, paraphrase to confirm. Focus on "access to" breakthroughs, not problems. Be warm, confident, engaging.',
        keywords: ['werner erhard', 'distinguish', 'conversational', 'empowering']
    }],

    // Common Signs and Patterns
    ['signs out of integrity', {
        category: 'integrity',
        content: 'Common signs: Excuses, blame, denial, or self-deception about not keeping word; inconsistency; hidden messes; applying cost-benefit analysis to honoring your word without disclosing it upfront; feeling incomplete or fragmented.',
        keywords: ['excuses', 'blame', 'denial', 'self-deception', 'inconsistency']
    }],
    ['self-deception', {
        category: 'integrity',
        content: 'A common veil that prevents seeing where we\'re out of integrity. Part of the coaching process is gently helping people see through their automatic stories and look at their experience freshly.',
        keywords: ['self-deception', 'veil', 'automatic stories', 'freshness']
    }],
    ['workability', {
        category: 'integrity',
        content: 'When things work reliably, predictably, and effectively. Integrity creates workability. Out of integrity creates unworkability - things become unreliable and performance diminishes.',
        keywords: ['workability', 'reliable', 'predictable', 'effective']
    }],

    // Practical Applications
    ['cleaning up messes', {
        category: 'integrity',
        content: 'When you cannot keep your word, you must clean up any mess (consequences, impacts, or fallout) you caused for others or yourself. This includes acknowledging the impact, taking responsibility, and making appropriate amends.',
        keywords: ['cleaning up', 'consequences', 'responsibility', 'amends']
    }],
    ['restoration process', {
        category: 'coaching',
        content: 'To restore integrity: (1) Acknowledge where word is not whole/complete, (2) Inform all affected parties, (3) Clean up any messes created, (4) Recommit to honoring your word going forward.',
        keywords: ['restoration', 'acknowledge', 'inform', 'recommit']
    }],
    ['language and reality', {
        category: 'philosophy',
        content: 'Language is not just descriptive but generative - it creates our reality and shapes our possibilities. In integrity work, how we speak about our commitments literally creates the reality of our relationships and opportunities.',
        keywords: ['language', 'generative', 'reality', 'possibilities']
    }]
]);

/**
 * Get statistics about the knowledge base
 * @returns {Object} Stats including total entries, categories, etc.
 */
export function getKnowledgeBaseStats() {
    const categories = getAvailableCategories();
    const totalEntries = lisaKnowledgeBase.size;
    const categoryBreakdown = {};

    categories.forEach(category => {
        categoryBreakdown[category] = Array.from(lisaKnowledgeBase.values())
            .filter(data => data.category === category).length;
    });

    return {
        totalEntries,
        categories: categoryBreakdown,
        availableCategories: categories
    };
}

/**
 * Get all available categories in the knowledge base
 * @returns {Array} Array of category names
 */
export function getAvailableCategories() {
    const categories = new Set();
    lisaKnowledgeBase.forEach((data) => {
        categories.add(data.category);
    });
    return Array.from(categories);
}