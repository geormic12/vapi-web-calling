import { brianaKnowledgeBase, getKnowledgeBaseStats, getAvailableCategories } from './briana-knowledge-base.js';

export class BrianaFunctionHandler {
    constructor() {
        this.assistantData = new Map();
        this.conversationHistory = [];

        // Import knowledge base from separate file
        this.knowledgeBase = brianaKnowledgeBase;

        console.log(`🚀 Initializing Briana's Knowledge Base...`);
        const stats = getKnowledgeBaseStats();
        console.log(`📚 Briana's Knowledge Base Initialized:`, {
            totalEntries: stats.totalEntries,
            categories: stats.categories,
            availableCategories: stats.availableCategories,
            timestamp: new Date().toISOString()
        });
        console.log(`✅ Briana is ready with ${stats.totalEntries} concepts across ${stats.availableCategories.length} categories`);
    }

    handleFunctionCall(functionCall) {
        switch (functionCall.name) {
            case 'SearchKnowledgeBase':
                console.log(`📚 KNOWLEDGE BASE ACCESS: Briana is searching for information`);
                return this.searchKnowledgeBase(functionCall.parameters);
            case 'ChangeColor':
                return this.changeColor(functionCall.parameters);
            case 'WriteText':
                return this.writeText(functionCall.parameters);
            case 'BrianaSpecificFunction':
                return this.handleBrianaFunction(functionCall.parameters);
            default:
                console.warn(`Unknown function: ${functionCall.name}`);
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        const timestamp = new Date().toISOString();

        console.log(`📖 KNOWLEDGE BASE SEARCH INITIATED:`, {
            query: query,
            category: category || 'all categories',
            timestamp: timestamp,
            agent: 'Briana'
        });

        // Add visual feedback to UI
        this.displayKnowledgeBaseAccess(query, category);

        const queryLower = query.toLowerCase();
        const results = [];
        let totalScanned = 0;

        this.knowledgeBase.forEach((data, key) => {
            totalScanned++;
            let relevanceScore = 0;

            // Category filtering
            if (category && data.category !== category.toLowerCase()) {
                return; // Skip if category doesn't match
            }

            // Exact key match (highest relevance)
            if (key.toLowerCase() === queryLower) {
                relevanceScore = 100;
                console.log(`🎯 EXACT MATCH FOUND: "${key}" with score ${relevanceScore}`);
            }
            // Key contains query
            else if (key.toLowerCase().includes(queryLower)) {
                relevanceScore = 80;
                console.log(`🔍 KEY MATCH FOUND: "${key}" with score ${relevanceScore}`);
            }
            // Content contains query
            else if (data.content.toLowerCase().includes(queryLower)) {
                relevanceScore = 60;
                console.log(`📝 CONTENT MATCH FOUND: "${key}" with score ${relevanceScore}`);
            }
            // Keywords match
            else if (data.keywords && data.keywords.some(keyword =>
                keyword.toLowerCase().includes(queryLower) || queryLower.includes(keyword.toLowerCase())
            )) {
                relevanceScore = 70;
                console.log(`🏷️ KEYWORD MATCH FOUND: "${key}" with score ${relevanceScore}`);
            }

            if (relevanceScore > 0) {
                results.push({
                    key,
                    content: data.content,
                    category: data.category,
                    keywords: data.keywords,
                    relevanceScore
                });
            }
        });

        // Sort by relevance score (highest first)
        results.sort((a, b) => b.relevanceScore - a.relevanceScore);

        // Limit results to top 5 most relevant
        const topResults = results.slice(0, 5);

        console.log(`📊 KNOWLEDGE BASE SEARCH COMPLETED:`, {
            query: query,
            totalEntriesScanned: totalScanned,
            totalMatches: results.length,
            topResultsReturned: topResults.length,
            topResults: topResults.map(r => ({ key: r.key, score: r.relevanceScore })),
            timestamp: timestamp
        });

        if (topResults.length === 0) {
            console.log(`❌ NO MATCHES FOUND for query: "${query}" in category: ${category || 'all'}`);
        }

        return {
            success: true,
            query,
            category,
            results: topResults,
            totalResults: results.length,
            agent: 'Briana',
            timestamp: timestamp,
            message: `Found ${topResults.length} relevant concepts for "${query}"`
        };
    }

    changeColor(parameters) {
        const { ColorCode } = parameters;
        console.log(`Briana changing color to: ${ColorCode}`);

        // Apply color change to Briana's button
        const brianaButton = document.getElementById('callWithBriana');
        if (brianaButton) {
            brianaButton.style.backgroundColor = ColorCode;
        }

        return {
            success: true,
            colorCode: ColorCode,
            agent: 'Briana',
            message: `Briana changed color to ${ColorCode}`
        };
    }

    writeText(parameters) {
        const { Text } = parameters;
        console.log(`Briana writing text: ${Text}`);

        const textArea = document.getElementById('vapiTyping');
        if (textArea) {
            textArea.textContent = `Briana: ${Text}`;
        }

        return {
            success: true,
            text: Text,
            agent: 'Briana',
            message: `Briana wrote: ${Text}`
        };
    }

    handleBrianaFunction(parameters) {
        const { action } = parameters;
        console.log('Briana specific function called with action:', action);

        // Example Briana-specific functionality
        switch (action) {
            case 'greeting':
                return { success: true, message: 'Briana says hello!', agent: 'Briana' };
            case 'help':
                return { success: true, message: 'Briana is here to help you with any questions!', agent: 'Briana' };
            default:
                return { success: false, message: 'Unknown action for Briana', agent: 'Briana' };
        }
    }

    logConversation(message) {
        this.conversationHistory.push({
            timestamp: new Date().toISOString(),
            message: message,
            agent: 'Briana'
        });
    }

    getConversationHistory() {
        return this.conversationHistory;
    }

    getAvailableCategories() {
        return getAvailableCategories();
    }

    getKnowledgeBaseStats() {
        return getKnowledgeBaseStats();
    }

    displayKnowledgeBaseAccess(query, category) {
        try {
            // Display in the status message area
            const statusElement = document.getElementById('vapiStatusMessage');
            if (statusElement) {
                const categoryText = category ? ` (${category})` : '';
                statusElement.innerHTML = `📚 Briana accessing knowledge base: "${query}"${categoryText}`;
                statusElement.style.color = '#007aff';
                statusElement.style.fontWeight = 'bold';

                // Clear the message after 3 seconds
                setTimeout(() => {
                    if (statusElement.innerHTML.includes('accessing knowledge base')) {
                        statusElement.innerHTML = '';
                    }
                }, 3000);
            }

            // Also display in the chat if it exists
            const chatElement = document.getElementById('chat');
            if (chatElement) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'knowledge-base-access';
                messageDiv.innerHTML = `
                    <span style="color: #007aff; font-weight: bold;">
                        📚 Knowledge Base Query: "${query}"${category ? ` [${category}]` : ''}
                    </span>
                `;
                messageDiv.style.padding = '5px 10px';
                messageDiv.style.margin = '2px 0';
                messageDiv.style.fontSize = '12px';
                messageDiv.style.fontStyle = 'italic';
                messageDiv.style.backgroundColor = '#f0f8ff';
                messageDiv.style.borderLeft = '3px solid #007aff';

                chatElement.appendChild(messageDiv);
                chatElement.scrollTop = chatElement.scrollHeight;
            }
        } catch (error) {
            console.warn('Error displaying knowledge base access notification:', error);
        }
    }
}