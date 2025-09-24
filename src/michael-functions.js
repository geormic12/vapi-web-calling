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