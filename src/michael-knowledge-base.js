/**
 * Michael's Knowledge Base for Integrity and Authenticity
 * 
 * This file contains concepts related to both integrity and authenticity
 * that Michael uses to guide users in personal development.
 * 
 * Knowledge Base Structure:
 * - Key: String identifier for the concept
 * - Value: Object with category, content, and keywords
 */

export const michaelKnowledgeBase = new Map([
    // ========== INTEGRITY CONCEPTS ==========
    ['integrity definition', {
        category: 'integrity',
        content: 'Integrity is a state of being whole, complete, unbroken, and sound. For a person, integrity means your word is whole and complete - you do what you say you\'ll do, honor what you know to do, stand for what you believe, and take responsibility for what you allow. Integrity creates workability, reliability, and trust in your life.',
        keywords: ['integrity', 'whole', 'complete', 'word', 'workability', 'trust']
    }],

    ['integrity statement creation', {
        category: 'integrity',
        content: 'Creating a powerful integrity statement involves declaring your commitment to wholeness and completeness in specific areas of your life. It should be clear, actionable, and meaningful to you. A good integrity statement often includes what you commit to doing, how you will honor your word, and what wholeness looks like in that area.',
        keywords: ['integrity statement', 'commitment', 'declaration', 'wholeness', 'actionable']
    }],

    ['honoring your word', {
        category: 'integrity',
        content: 'Honoring your word means either keeping your commitments exactly as stated, or when you cannot, immediately communicating this to all affected parties and cleaning up any consequences. This applies to explicit promises, implied agreements, stated values, and personal standards.',
        keywords: ['honoring word', 'keeping commitments', 'communication', 'consequences', 'promises']
    }],

    ['integrity in relationships', {
        category: 'integrity',
        content: 'Relationship integrity involves being reliable, consistent, and trustworthy with others. It means honoring agreements, communicating honestly about your capacity and limitations, and taking responsibility for your impact on others. This creates a foundation of trust and workability.',
        keywords: ['relationship integrity', 'reliable', 'trustworthy', 'agreements', 'responsibility']
    }],

    // ========== AUTHENTICITY CONCEPTS ==========
    ['authenticity definition', {
        category: 'authenticity',
        content: 'Authenticity is the quality of being genuine, real, and true to your own nature, values, and feelings. It means expressing yourself honestly without pretense or facade, aligning your external behavior with your internal reality, and living from your core truth rather than what others expect.',
        keywords: ['authenticity', 'genuine', 'real', 'true nature', 'honest expression', 'core truth']
    }],

    ['authentic self-expression', {
        category: 'authenticity',
        content: 'Authentic self-expression involves sharing your genuine thoughts, feelings, and perspectives without filtering them through what you think others want to hear. It requires self-awareness, courage, and the willingness to be vulnerable. Authentic expression creates deeper connections and personal fulfillment.',
        keywords: ['authentic expression', 'genuine thoughts', 'vulnerability', 'self-awareness', 'courage']
    }],

    ['authenticity statement creation', {
        category: 'authenticity',
        content: 'Creating an authenticity statement involves declaring how you commit to being genuine and true to yourself. It should reflect your core values, your commitment to honest self-expression, and how you want to show up authentically in the world. It\'s about being real rather than performing.',
        keywords: ['authenticity statement', 'genuine', 'core values', 'honest expression', 'being real']
    }],

    ['living authentically', {
        category: 'authenticity',
        content: 'Living authentically means making choices that align with your true values and desires rather than external expectations or pressures. It involves knowing yourself deeply, accepting all parts of yourself, and expressing your truth even when it\'s difficult or unpopular.',
        keywords: ['living authentically', 'true values', 'self-acceptance', 'expressing truth', 'alignment']
    }],

    // ========== INTEGRATION CONCEPTS ==========
    ['integrity and authenticity relationship', {
        category: 'integration',
        content: 'Integrity and authenticity are complementary but distinct. Integrity focuses on wholeness and keeping your word, while authenticity focuses on being genuine and true to yourself. Together, they create a foundation for powerful, trustworthy, and genuine living. You can be authentic without integrity, or have integrity without being authentic, but combining them creates extraordinary effectiveness.',
        keywords: ['integrity authenticity relationship', 'complementary', 'wholeness', 'genuine', 'trustworthy']
    }],

    ['personal development foundation', {
        category: 'integration',
        content: 'Both integrity and authenticity serve as foundational elements for personal development. Integrity creates the reliability and trust necessary for growth, while authenticity ensures that growth is aligned with your true self. Together, they enable sustainable transformation and meaningful progress.',
        keywords: ['personal development', 'foundation', 'reliability', 'growth', 'transformation']
    }],

    ['creating powerful statements', {
        category: 'integration',
        content: 'Powerful personal statements combine clarity, specificity, and emotional resonance. They should be written in your own words, reflect your genuine commitment, and inspire action. The best statements are both aspirational and grounded in your current reality, creating a bridge to who you are becoming.',
        keywords: ['powerful statements', 'clarity', 'specificity', 'emotional resonance', 'genuine commitment']
    }],

    // ========== PRACTICAL APPLICATION ==========
    ['statement refinement process', {
        category: 'application',
        content: 'Refining integrity and authenticity statements is an iterative process. Start with your initial insight or commitment, then refine for clarity, specificity, and emotional truth. Ask yourself: Does this feel true to me? Is it specific enough to guide action? Does it inspire me? Can I commit to it fully?',
        keywords: ['statement refinement', 'iterative process', 'clarity', 'emotional truth', 'commitment']
    }],

    ['living your statements', {
        category: 'application',
        content: 'Once you create your statements, the real work begins in living them. This involves daily choices that align with your declared integrity and authenticity, regular reflection on how you\'re honoring your commitments, and ongoing refinement as you grow and evolve.',
        keywords: ['living statements', 'daily choices', 'alignment', 'reflection', 'ongoing refinement']
    }]
]);

/**
 * Get statistics about Michael's knowledge base
 */
export function getKnowledgeBaseStats() {
    const categories = {};
    const totalEntries = michaelKnowledgeBase.size;

    for (const [key, value] of michaelKnowledgeBase) {
        const category = value.category;
        categories[category] = (categories[category] || 0) + 1;
    }

    console.log(`📊 Michael's Knowledge Base Stats:`, {
        totalEntries,
        categories,
        timestamp: new Date().toISOString()
    });

    return { totalEntries, categories };
}

/**
 * Get available categories in the knowledge base
 */
export function getAvailableCategories() {
    const categories = new Set();
    for (const [key, value] of michaelKnowledgeBase) {
        categories.add(value.category);
    }
    return Array.from(categories);
}