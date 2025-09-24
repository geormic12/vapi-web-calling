import { michaelKnowledgeBase, getKnowledgeBaseStats } from './michael-knowledge-base.js';

export class MichaelFunctionHandler {
    constructor() {
        console.log(`🚀 Initializing Michael's Function Handler...`);

        this.knowledgeBase = michaelKnowledgeBase;

        this.stats = {
            integrityUpdates: 0,
            authenticityUpdates: 0,
            givenByGreaterUpdates: 0,
            causeInMatterUpdates: 0,
            knowledgeSearches: 0,
            totalCalls: 0
        };

        // Initialize knowledge base stats
        getKnowledgeBaseStats();

        console.log(`✅ Michael is ready with integrity, authenticity, being given by something greater, and being cause in the matter functions`);
    }

    handleFunctionCall(functionCall) {
        this.stats.totalCalls++;

        console.log(`🎯 Michael Function Call:`, {
            function: functionCall.name,
            parameters: functionCall.parameters,
            timestamp: new Date().toISOString()
        });

        // Debug: Log the exact function name being called
        console.log(`DEBUG: Exact function name received: "${functionCall.name}"`);

        try {
            switch (functionCall.name) {
                case 'FocusOnStatement':
                    return this.focusOnStatement(functionCall.parameters);
                case 'UpdateIntegrityStatement':
                    return this.updateIntegrityStatement(functionCall.parameters);
                case 'UpdateAuthenticityStatement':
                    return this.updateAuthenticityStatement(functionCall.parameters);
                case 'UpdateBeingGivenByGreaterStatement':
                    return this.updateBeingGivenByGreaterStatement(functionCall.parameters);
                case 'UpdateBeingCauseInMatterStatement':
                    return this.updateBeingCauseInMatterStatement(functionCall.parameters);
                // Fallback cases for old function names (in case Vapi is still using them)
                case 'UpdateCommitmentStatement':
                    console.log('DEBUG: Received old function name UpdateCommitmentStatement, redirecting to UpdateBeingGivenByGreaterStatement');
                    return this.updateBeingGivenByGreaterStatement(functionCall.parameters);
                case 'UpdateCausationStatement':
                    console.log('DEBUG: Received old function name UpdateCausationStatement, redirecting to UpdateBeingCauseInMatterStatement');
                    return this.updateBeingCauseInMatterStatement(functionCall.parameters);
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(functionCall.parameters);
                default:
                    console.log(`DEBUG: Unknown function name: "${functionCall.name}"`);
                    return {
                        success: false,
                        message: `Unknown function: ${functionCall.name}`,
                        agent: 'michael'
                    };
            }
        } catch (error) {
            console.error("Michael function call error:", error);
            return {
                success: false,
                message: "Function execution failed",
                agent: 'michael',
                error: error.message
            };
        }
    }

    focusOnStatement(parameters) {
        const { statementType, userMessage } = parameters;

        console.log(`🎯 Michael received focus request for: ${statementType}`);
        console.log(`📝 User message: "${userMessage}"`);

        // Add visual highlight to the clicked statement box
        const elementId = statementType === 'causation' ? 'causationStatement' :
            statementType === 'commitment' ? 'commitmentStatement' :
                statementType === 'integrity' ? 'integrityStatement' : 'authenticityStatement';

        const statementElement = document.getElementById(elementId);
        if (statementElement) {
            // Add highlight effect
            const card = statementElement.closest('.statement-card');
            if (card) {
                card.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
                card.style.transform = 'scale(1.02)';
                card.style.transition = 'all 0.3s ease';

                // Remove highlight after 3 seconds
                setTimeout(() => {
                    card.style.boxShadow = '';
                    card.style.transform = '';
                }, 3000);
            }

            // If the statement is empty, add a placeholder message
            if (statementElement.textContent.trim() === '' ||
                statementElement.textContent.includes('Your statement will appear here')) {
                const placeholders = {
                    causation: "Ready to explore taking full ownership and being cause in the matter...",
                    commitment: "Ready to explore being given by something greater than yourself...",
                    integrity: "Ready to explore integrity and alignment with your values...",
                    authenticity: "Ready to explore authenticity and being true to yourself..."
                };

                statementElement.textContent = placeholders[statementType] || "Ready to explore this area...";
                statementElement.style.fontStyle = 'italic';
                statementElement.style.color = '#666';
            }
        }

        // Create a response based on the statement type
        const responses = {
            causation: "I understand you want to work on Being Cause in the Matter. This is about taking full ownership and responsibility for your outcomes instead of being at the effect of circumstances. Let's explore where in your life you might be operating from victim consciousness and how you can shift to being the source of your results. What specific situation would you like to examine?",
            commitment: "I see you want to focus on Being Given By Something Greater. This is about discovering your purpose, calling, and how you serve something beyond your personal interests. Let's explore what you're naturally drawn to contribute and what larger mission or service calls to you. What area of contribution feels most alive for you?",
            integrity: "You've chosen to work on integrity - the foundation of personal power and effectiveness. Integrity is about being whole, complete, and aligned between your word and your actions. Let's examine where there might be gaps between what you say and what you do, or where you're not honoring your commitments to yourself or others. What area of your life feels out of integrity?",
            authenticity: "You want to explore authenticity - being true to who you really are. This is about expressing your genuine self rather than who you think you should be or who others expect you to be. Let's discover where you might be wearing masks or hiding aspects of yourself. What situation makes you feel like you can't be completely authentic?"
        };

        return {
            success: true,
            message: "Statement focus activated - Michael is now focused on this area",
            agent: 'michael',
            data: {
                statementType: statementType,
                focusMessage: userMessage,
                response: responses[statementType] || "Let's explore this area together. What would you like to examine?",
                timestamp: new Date().toISOString()
            }
        };
    }

    updateIntegrityStatement(parameters) {
        this.stats.integrityUpdates++;
        const { statement } = parameters;

        console.log(`💎 Michael updating integrity statement: "${statement}"`);

        // Sanitize the statement for safe DOM manipulation
        const sanitizedStatement = statement.replace(/[<>]/g, '');

        // Update the integrity field on the page
        const integrityField = document.getElementById('integrityStatement');
        if (integrityField) {
            integrityField.textContent = sanitizedStatement;
            integrityField.style.backgroundColor = '#e8f5e8';
            integrityField.style.padding = '10px';
            integrityField.style.borderRadius = '5px';
            integrityField.style.border = '2px solid #4CAF50';

            // Add a subtle animation
            integrityField.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                integrityField.style.backgroundColor = '#f9f9f9';
                integrityField.style.border = '1px solid #ddd';
            }, 2000);
        }

        return {
            success: true,
            message: "Integrity statement updated successfully",
            agent: 'michael',
            data: {
                statement: sanitizedStatement,
                field: 'integrity',
                updateCount: this.stats.integrityUpdates
            }
        };
    }

    updateAuthenticityStatement(parameters) {
        this.stats.authenticityUpdates++;
        const { statement } = parameters;

        console.log(`🌟 Michael updating authenticity statement: "${statement}"`);

        // Sanitize the statement for safe DOM manipulation
        const sanitizedStatement = statement.replace(/[<>]/g, '');

        // Update the authenticity field on the page
        const authenticityField = document.getElementById('authenticityStatement');
        if (authenticityField) {
            authenticityField.textContent = sanitizedStatement;
            authenticityField.style.backgroundColor = '#e8f0ff';
            authenticityField.style.padding = '10px';
            authenticityField.style.borderRadius = '5px';
            authenticityField.style.border = '2px solid #2196F3';

            // Add a subtle animation
            authenticityField.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                authenticityField.style.backgroundColor = '#f9f9f9';
                authenticityField.style.border = '1px solid #ddd';
            }, 2000);
        }

        return {
            success: true,
            message: "Authenticity statement updated successfully",
            agent: 'michael',
            data: {
                statement: sanitizedStatement,
                field: 'authenticity',
                updateCount: this.stats.authenticityUpdates
            }
        };
    }

    updateBeingGivenByGreaterStatement(parameters) {
        this.stats.givenByGreaterUpdates++;
        const { statement } = parameters;

        console.log(`🎯 Michael updating 'Being Given By Something Greater' statement: "${statement}"`);

        // Sanitize the statement for safe DOM manipulation
        const sanitizedStatement = statement.replace(/[<>]/g, '');

        // Update the commitment field on the page (HTML ID remains for compatibility)
        const givenByGreaterField = document.getElementById('commitmentStatement');
        if (givenByGreaterField) {
            givenByGreaterField.textContent = sanitizedStatement;
            givenByGreaterField.style.backgroundColor = '#fff3e0';
            givenByGreaterField.style.padding = '10px';
            givenByGreaterField.style.borderRadius = '5px';
            givenByGreaterField.style.border = '2px solid #ff9800';

            // Add a subtle animation
            givenByGreaterField.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                givenByGreaterField.style.backgroundColor = '#f9f9f9';
                givenByGreaterField.style.border = '1px solid #ddd';
            }, 2000);
        }

        return {
            success: true,
            message: "Being Given By Something Greater statement updated successfully",
            agent: 'michael',
            data: {
                statement: sanitizedStatement,
                field: 'beingGivenByGreater',
                updateCount: this.stats.givenByGreaterUpdates
            }
        };
    }

    updateBeingCauseInMatterStatement(parameters) {
        this.stats.causeInMatterUpdates++;
        const { statement } = parameters;

        console.log(`⚡ Michael updating 'Being Cause In The Matter' statement: "${statement}"`);

        // Sanitize the statement for safe DOM manipulation
        const sanitizedStatement = statement.replace(/[<>]/g, '');

        // Update the causation field on the page (HTML ID remains for compatibility)
        const causeInMatterField = document.getElementById('causationStatement');
        if (causeInMatterField) {
            causeInMatterField.textContent = sanitizedStatement;
            causeInMatterField.style.backgroundColor = '#f3e5f5';
            causeInMatterField.style.padding = '10px';
            causeInMatterField.style.borderRadius = '5px';
            causeInMatterField.style.border = '2px solid #9c27b0';

            // Add a subtle animation
            causeInMatterField.style.transition = 'all 0.3s ease';
            setTimeout(() => {
                causeInMatterField.style.backgroundColor = '#f9f9f9';
                causeInMatterField.style.border = '1px solid #ddd';
            }, 2000);
        }

        return {
            success: true,
            message: "Being Cause In The Matter statement updated successfully",
            agent: 'michael',
            data: {
                statement: sanitizedStatement,
                field: 'beingCauseInMatter',
                updateCount: this.stats.causeInMatterUpdates
            }
        };
    }

    searchKnowledgeBase(parameters) {
        this.stats.knowledgeSearches++;
        const { query, category } = parameters;

        console.log(`🔍 Michael searching knowledge base for: "${query}" in category: "${category || 'all'}"`);

        const results = [];
        const searchQuery = query.toLowerCase();

        for (const [key, value] of this.knowledgeBase) {
            // Skip if category filter is specified and doesn't match
            if (category && value.category !== category) {
                continue;
            }

            let relevance = 0;

            // Check for exact key match (highest relevance)
            if (key.toLowerCase() === searchQuery) {
                relevance = 100;
            }
            // Check for partial key match
            else if (key.toLowerCase().includes(searchQuery)) {
                relevance = 80;
            }
            // Check keywords
            else if (value.keywords.some(keyword =>
                keyword.toLowerCase().includes(searchQuery) ||
                searchQuery.includes(keyword.toLowerCase())
            )) {
                relevance = 70;
            }
            // Check content
            else if (value.content.toLowerCase().includes(searchQuery)) {
                relevance = 60;
            }

            if (relevance > 0) {
                results.push({
                    key,
                    category: value.category,
                    content: value.content,
                    keywords: value.keywords,
                    relevance
                });
            }
        }

        // Sort by relevance and limit results
        results.sort((a, b) => b.relevance - a.relevance);
        const limitedResults = results.slice(0, 5);

        console.log(`📚 Found ${results.length} results, returning top ${limitedResults.length}`);

        return {
            success: true,
            message: `Found ${limitedResults.length} relevant knowledge base entries`,
            agent: 'michael',
            data: {
                query: query,
                category: category || 'all',
                results: limitedResults,
                totalFound: results.length,
                searchCount: this.stats.knowledgeSearches
            }
        };
    }

    // Utility method to get current stats
    getStats() {
        return {
            ...this.stats,
            knowledgeBaseSize: this.knowledgeBase.size
        };
    }
}