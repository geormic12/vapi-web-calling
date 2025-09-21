/**
 * Briana's Knowledge Base
 * 
 * This file contains Briana's knowledge base for providing assistance.
 * Currently empty - can be populated with Briana-specific information as needed.
 * 
 * Knowledge Base Structure:
 * - Key: String identifier for the concept
 * - Value: Object with category, content, and keywords
 * 
 * Example entry:
 * ['example concept', {
 *     category: 'general',
 *     content: 'Description of the concept and how it applies.',
 *     keywords: ['keyword1', 'keyword2', 'related terms']
 * }]
 */

export const brianaKnowledgeBase = new Map([
    // Knowledge base is currently empty
    // Add entries here as needed following the structure above
]);

/**
 * Get statistics about the knowledge base
 * @returns {Object} Stats including total entries, categories, etc.
 */
export function getKnowledgeBaseStats() {
    const categories = getAvailableCategories();
    const totalEntries = brianaKnowledgeBase.size;
    const categoryBreakdown = {};

    categories.forEach(category => {
        categoryBreakdown[category] = Array.from(brianaKnowledgeBase.values())
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
    brianaKnowledgeBase.forEach((data) => {
        categories.add(data.category);
    });
    return Array.from(categories);
}