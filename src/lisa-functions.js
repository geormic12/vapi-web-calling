import { lisaKnowledgeBase, getKnowledgeBaseStats as getKnowledgeStats, getAvailableCategories as getCategories } from './lisa-knowledge-base.js';

export class LisaFunctionHandler {
    constructor() {
        console.log(`🚀 Initializing Lisa's Integrity Knowledge Base...`);

        // Import knowledge base from separate file
        this.knowledgeBase = lisaKnowledgeBase;

        // Log knowledge base initialization stats
        const stats = getKnowledgeStats();
        console.log(`📚 Lisa's Knowledge Base Initialized:`, {
            totalEntries: stats.totalEntries,
            categories: stats.categories,
            availableCategories: stats.availableCategories,
            timestamp: new Date().toISOString()
        });
        console.log(`✅ Lisa is ready with ${stats.totalEntries} integrity concepts across ${stats.availableCategories.length} categories`);
    }

    handleFunctionCall(functionCall) {
        console.log(`🎯 Lisa Function Call:`, {
            function: functionCall.name,
            parameters: functionCall.parameters,
            timestamp: new Date().toISOString()
        });

        switch (functionCall.name) {
            case 'SearchIntegrityKnowledgeBase':
                console.log(`📚 KNOWLEDGE BASE ACCESS: Lisa is searching for integrity information`);
                return this.searchKnowledgeBase(functionCall.parameters);
            case 'ChangeColor':
                console.log(`🎨 Lisa Color Change:`, functionCall.parameters);
                return this.changeColor(functionCall.parameters);
            case 'WriteText':
                console.log(`✍️ Lisa Text Write:`, functionCall.parameters);
                return this.writeText(functionCall.parameters);
            default:
                console.warn(`⚠️ LisaFunctionHandler: Unknown function: ${functionCall.name}`);
                return null;
        }
    }

    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;
        const timestamp = new Date().toISOString();

        console.log(`📖 KNOWLEDGE BASE SEARCH INITIATED:`, {
            query: query,
            category: category || 'all categories',
            timestamp: timestamp,
            agent: 'Lisa'
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
            agent: 'Lisa',
            timestamp: timestamp,
            message: `Found ${topResults.length} relevant integrity concepts for "${query}"`
        };
    }

    changeColor(parameters) {
        const { ColorCode } = parameters;
        console.log(`Lisa changing color to: ${ColorCode}`);

        // Apply color change to Lisa's button
        const lisaButton = document.getElementById('callWithLisa');
        if (lisaButton) {
            lisaButton.style.backgroundColor = ColorCode;
        }

        return {
            success: true,
            colorCode: ColorCode,
            agent: 'Lisa',
            message: `Lisa changed color to ${ColorCode}`
        };
    }

    writeText(parameters) {
        const { Text } = parameters;
        console.log(`Lisa writing: "${Text}"`);

        const textArea = document.getElementById('vapiTyping');
        if (textArea) {
            textArea.textContent = `Lisa: ${Text}`;
        } else {
            console.error('Could not find vapiTyping element');
        }

        return {
            success: true,
            text: Text,
            agent: 'Lisa',
            message: `Lisa wrote: ${Text}`
        };
    }

    getIntegrityPrinciples() {
        return [
            'Integrity is a positive phenomenon',
            'Your word being whole and complete',
            'Honoring your word is the pathway to integrity'
        ];
    }

    getAvailableCategories() {
        return getCategories();
    }

    getKnowledgeBaseStats() {
        return getKnowledgeStats();
    }

    displayKnowledgeBaseAccess(query, category) {
        try {
            // Display in the status message area
            const statusElement = document.getElementById('vapiStatusMessage');
            if (statusElement) {
                const categoryText = category ? ` (${category})` : '';
                statusElement.innerHTML = `📚 Lisa accessing knowledge base: "${query}"${categoryText}`;
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