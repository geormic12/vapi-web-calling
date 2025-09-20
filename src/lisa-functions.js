export class LisaFunctionHandler {
    constructor() {
        console.log(`🚀 Initializing Lisa's Integrity Knowledge Base...`);
        
        this.knowledgeBase = new Map([
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

        // Log knowledge base initialization stats
        const stats = this.getKnowledgeBaseStats();
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
        const categories = new Set();
        this.knowledgeBase.forEach((data) => {
            categories.add(data.category);
        });
        return Array.from(categories);
    }

    getKnowledgeBaseStats() {
        const categories = this.getAvailableCategories();
        const totalEntries = this.knowledgeBase.size;
        const categoryBreakdown = {};
        
        categories.forEach(category => {
            categoryBreakdown[category] = Array.from(this.knowledgeBase.values())
                .filter(data => data.category === category).length;
        });

        return {
            totalEntries,
            categories: categoryBreakdown,
            availableCategories: categories
        };
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