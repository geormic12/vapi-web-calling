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
                case 'HighlightIntegrityStatement':
                    return this.highlightIntegrityStatement(functionCall.parameters);
                case 'HighlightAuthenticityStatement':
                    return this.highlightAuthenticityStatement(functionCall.parameters);
                case 'HighlightBeingGivenByGreaterStatement':
                    return this.highlightBeingGivenByGreaterStatement(functionCall.parameters);
                case 'HighlightBeingCauseInMatterStatement':
                    return this.highlightBeingCauseInMatterStatement(functionCall.parameters);
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

        console.log(`\n🎯 ========== FOCUS ON STATEMENT DEBUG ==========`);
        console.log(`📥 Michael received focus request for: ${statementType}`);
        console.log(`📝 User message: "${userMessage}"`);
        console.log(`⏰ Timestamp: ${new Date().toISOString()}`);

        // Apply highlight to the focused statement
        const elementId = statementType === 'being cause in the matter' ? 'causationStatement' :
            statementType === 'being given by something greater' ? 'commitmentStatement' :
                statementType === 'causation' ? 'causationStatement' :  // Legacy support
                    statementType === 'commitment' ? 'commitmentStatement' :  // Legacy support
                        statementType === 'integrity' ? 'integrityStatement' : 'authenticityStatement';

        const colors = {
            integrity: '#4CAF50',
            authenticity: '#2196F3',
            'being given by something greater': '#FF9800',
            'being cause in the matter': '#9C27B0',
            commitment: '#FF9800',  // Legacy support
            causation: '#9C27B0'    // Legacy support
        };

        const color = colors[statementType] || '#667eea';

        // Apply highlight using the simple highlight system
        this.highlightStatement(elementId, color, `Focusing on ${statementType}`);


        // Create a response based on the statement type
        const responses = {
            'being cause in the matter': "Let's work on being cause in the matter. This is about taking full ownership and responsibility for your outcomes instead of being at the effect of circumstances. Where in your life might you be operating from victim consciousness, and how can you shift to being the source of your results? What specific situation would you like to examine?",
            'being given by something greater': "Let's work on being given by something greater. This is about discovering your purpose, calling, and how you serve something beyond your personal interests. What are you naturally drawn to contribute? What larger mission or service calls to you? What area of contribution feels most alive for you?",
            integrity: "Let's work on integrity. Integrity is about being whole, complete, and aligned between your word and your actions. Where might there be gaps between what you say and what you do, or where you're not honoring your commitments to yourself or others? What area of your life feels out of integrity?",
            authenticity: "Let's work on authenticity. This is about being true to who you really are - expressing your genuine self rather than who you think you should be or who others expect you to be. Where might you be wearing masks or hiding aspects of yourself? What situation makes you feel like you can't be completely authentic?",
            // Legacy support
            causation: "Let's work on being cause in the matter. This is about taking full ownership and responsibility for your outcomes instead of being at the effect of circumstances. Where in your life might you be operating from victim consciousness, and how can you shift to being the source of your results? What specific situation would you like to examine?",
            commitment: "Let's work on being given by something greater. This is about discovering your purpose, calling, and how you serve something beyond your personal interests. What are you naturally drawn to contribute? What larger mission or service calls to you? What area of contribution feels most alive for you?"
        };

        const agentResponse = responses[statementType] || "Let's explore this area together. What would you like to examine?";

        // DEBUG: Log what the agent will say
        console.log(`🗣️ AGENT RESPONSE DEBUG:`);
        console.log(`📝 Statement Type: "${statementType}"`);
        console.log(`🎤 What Michael will say: "${agentResponse}"`);
        console.log(`📊 Response length: ${agentResponse.length} characters`);
        console.log(`🔍 Contains "One moment": ${agentResponse.includes('One moment')}`);

        const functionResult = {
            success: true,
            message: "Statement focus activated - Michael is now focused on this area",
            agent: 'michael',
            data: {
                statementType: statementType,
                focusMessage: userMessage,
                response: agentResponse,
                timestamp: new Date().toISOString()
            }
        };

        console.log(`📤 Function returning to VAPI:`, JSON.stringify(functionResult, null, 2));
        console.log(`🏁 ========== END FOCUS STATEMENT DEBUG ==========\n`);

        return functionResult;
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

    highlightIntegrityStatement(parameters) {
        const { message = "We're focusing on integrity right now" } = parameters;

        console.log(`💎 Michael highlighting integrity statement: "${message}"`);

        this.highlightStatement('integrityStatement', '#4CAF50', message);

        return {
            success: true,
            message: "Integrity statement highlighted",
            agent: 'michael',
            data: {
                statementType: 'integrity',
                highlightMessage: message,
                timestamp: new Date().toISOString()
            }
        };
    }

    highlightAuthenticityStatement(parameters) {
        const { message = "We're focusing on authenticity right now" } = parameters;

        console.log(`🌟 Michael highlighting authenticity statement: "${message}"`);

        this.highlightStatement('authenticityStatement', '#2196F3', message);

        return {
            success: true,
            message: "Authenticity statement highlighted",
            agent: 'michael',
            data: {
                statementType: 'authenticity',
                highlightMessage: message,
                timestamp: new Date().toISOString()
            }
        };
    }

    highlightBeingGivenByGreaterStatement(parameters) {
        const { message = "We're focusing on being given by something greater right now" } = parameters;

        console.log(`🎯 Michael highlighting Being Given By Something Greater statement: "${message}"`);

        this.highlightStatement('commitmentStatement', '#FF9800', message);

        return {
            success: true,
            message: "Being Given By Something Greater statement highlighted",
            agent: 'michael',
            data: {
                statementType: 'beingGivenByGreater',
                highlightMessage: message,
                timestamp: new Date().toISOString()
            }
        };
    }

    highlightBeingCauseInMatterStatement(parameters) {
        const { message = "We're focusing on being cause in the matter right now" } = parameters;

        console.log(`⚡ Michael highlighting Being Cause In The Matter statement: "${message}"`);

        this.highlightStatement('causationStatement', '#9C27B0', message);

        return {
            success: true,
            message: "Being Cause In The Matter statement highlighted",
            agent: 'michael',
            data: {
                statementType: 'beingCauseInMatter',
                highlightMessage: message,
                timestamp: new Date().toISOString()
            }
        };
    }

    highlightStatement(elementId, color, message) {
        // First, clear any existing highlights on all statement cards
        this.clearAllHighlights();

        const statementElement = document.getElementById(elementId);

        if (statementElement) {
            const card = statementElement.closest('.statement-card');

            if (card) {
                // Apply highlight styling
                card.style.transition = 'all 0.4s ease';
                card.style.boxShadow = `0 0 30px ${color}80, 0 0 60px ${color}40, inset 0 0 20px ${color}20`;
                card.style.transform = 'scale(1.05)';
                card.style.border = `3px solid ${color}`;
                card.style.zIndex = '10';
                card.style.position = 'relative';

                // Mark this card as highlighted for easy identification
                card.setAttribute('data-highlighted', 'true');

                // Add initial pulse animation
                let pulseCount = 0;
                const pulseInterval = setInterval(() => {
                    if (pulseCount < 2) {
                        card.style.boxShadow = `0 0 40px ${color}90, 0 0 80px ${color}50, inset 0 0 25px ${color}30`;
                        setTimeout(() => {
                            card.style.boxShadow = `0 0 30px ${color}80, 0 0 60px ${color}40, inset 0 0 20px ${color}20`;
                        }, 300);
                        pulseCount++;
                    } else {
                        clearInterval(pulseInterval);
                    }
                }, 600);

                console.log(`✨ Highlighted ${elementId} with color ${color} and message: "${message}"`);
            }
        } else {
            console.warn(`⚠️ Could not find element with ID: ${elementId}`);
        }
    }

    clearAllHighlights() {
        // Find all statement cards and clear any existing highlights
        const statementCards = document.querySelectorAll('.statement-card[data-highlighted="true"]');

        statementCards.forEach(card => {
            card.style.transition = 'all 0.3s ease';
            card.style.boxShadow = '';
            card.style.transform = '';
            card.style.border = '';
            card.style.zIndex = '';
            card.style.position = '';
            card.removeAttribute('data-highlighted');
        });

        if (statementCards.length > 0) {
            console.log(`🧹 Cleared ${statementCards.length} existing highlights`);
        }
    }

    // Utility method to get current stats
    getStats() {
        return {
            ...this.stats,
            knowledgeBaseSize: this.knowledgeBase.size
        };
    }
}