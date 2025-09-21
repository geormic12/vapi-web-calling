import {
    bettyKnowledgeBase,
    getBettyKnowledgeBaseStats,
    getBettyAvailableCategories
} from './betty-knowledge-base.js';

/**
 * Betty's Function Handler
 * Specializes in "Being Given By Something Greater Than Yourself" concepts
 */
export class BettyFunctionHandler {
    constructor() {
        this.knowledgeBase = bettyKnowledgeBase;
        this.agentName = "Betty";

        // Log knowledge base stats on initialization
        console.log(`${this.agentName} Function Handler initialized`);
        getBettyKnowledgeBaseStats();
    }

    /**
     * Main function call handler
     */
    handleFunctionCall(functionCall) {
        const { name, parameters } = functionCall;

        try {
            switch (name) {
                case 'SearchKnowledgeBase':
                    return this.searchKnowledgeBase(parameters);
                case 'ExploreContribution':
                    return this.exploreContribution(parameters);
                case 'DistinguishCommitment':
                    return this.distinguishCommitment(parameters);
                case 'IdentifyLargerPurpose':
                    return this.identifyLargerPurpose(parameters);
                case 'ChangeColor':
                    return this.changeColor(parameters);
                case 'WriteText':
                    return this.writeText(parameters);
                default:
                    console.warn(`Unknown function: ${name}`);
                    return {
                        success: false,
                        error: `Unknown function: ${name}`,
                        agent: this.agentName
                    };
            }
        } catch (error) {
            console.error(`Error in ${this.agentName} function ${name}:`, error);
            return {
                success: false,
                error: error.message,
                agent: this.agentName
            };
        }
    }

    /**
     * Search Betty's knowledge base about contribution and being given by something greater
     */
    searchKnowledgeBase(parameters) {
        const { query, category } = parameters;

        if (!query || typeof query !== 'string') {
            return {
                success: false,
                error: 'Query is required and must be a string',
                agent: this.agentName
            };
        }

        try {
            const searchResults = [];
            const queryLower = query.toLowerCase();

            for (const [key, entry] of this.knowledgeBase) {
                let relevanceScore = 0;

                // Skip if category filter is specified and doesn't match
                if (category && entry.category !== category) {
                    continue;
                }

                // Exact key match (highest relevance)
                if (key === queryLower) {
                    relevanceScore = 100;
                }
                // Partial key match
                else if (key.includes(queryLower) || queryLower.includes(key)) {
                    relevanceScore = 80;
                }
                // Keyword match
                else if (entry.keywords.some(keyword =>
                    keyword.toLowerCase().includes(queryLower) ||
                    queryLower.includes(keyword.toLowerCase())
                )) {
                    relevanceScore = 70;
                }
                // Content match
                else if (entry.content.toLowerCase().includes(queryLower)) {
                    relevanceScore = 60;
                }

                if (relevanceScore > 0) {
                    searchResults.push({
                        key,
                        category: entry.category,
                        content: entry.content,
                        keywords: entry.keywords,
                        relevance: relevanceScore
                    });
                }
            }

            // Sort by relevance and limit results
            searchResults.sort((a, b) => b.relevance - a.relevance);
            const topResults = searchResults.slice(0, 5);

            const message = topResults.length > 0
                ? `Found ${topResults.length} concept(s) about "${query}" in Betty's knowledge base on contribution and being given by something greater.`
                : `No concepts found for "${query}" in Betty's knowledge base. Try terms like "contribution", "commitment", "bigger game", or "authentic call".`;

            return {
                success: true,
                data: {
                    query,
                    category: category || 'all',
                    results: topResults,
                    totalFound: searchResults.length,
                    availableCategories: getBettyAvailableCategories()
                },
                agent: this.agentName,
                message
            };

        } catch (error) {
            return {
                success: false,
                error: `Search failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Explore contribution patterns and opportunities
     */
    exploreContribution(parameters) {
        const { area, context } = parameters;

        try {
            // Provide insights about contribution in the specified area
            const contributionInsights = {
                area: area || 'general',
                insights: [
                    'What naturally calls to you in this area?',
                    'How might you contribute here beyond personal gain?',
                    'What difference could you make that would matter?',
                    'What wants to be expressed through your unique gifts?'
                ],
                questions: [
                    'When you think about this area, what draws you most?',
                    'What would organizing your approach around contribution look like?',
                    'How might you serve something larger than your individual concerns here?'
                ],
                context: context || 'Exploring authentic contribution opportunities'
            };

            return {
                success: true,
                data: contributionInsights,
                agent: this.agentName,
                message: `Exploring contribution opportunities in ${area || 'your life'}. These insights can help you discover your authentic call to contribute.`
            };

        } catch (error) {
            return {
                success: false,
                error: `Contribution exploration failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Help distinguish between commitment and wanting
     */
    distinguishCommitment(parameters) {
        const { statement, area } = parameters;

        try {
            const commitmentGuidance = {
                statement: statement || 'general',
                distinctions: {
                    commitment: 'Generative, creates possibility, serves something larger',
                    wanting: 'Comes from lack, focused on getting, personal agenda'
                },
                questions: [
                    'Is this arising from what you lack or from what you want to create?',
                    'Does this serve something larger than personal benefit?',
                    'Does thinking about this generate energy or drain energy?',
                    'Are you drawn to this or driven by shoulds/pressure?'
                ],
                indicators: {
                    commitment: ['Energizing', 'Naturally arising', 'Serves others', 'Creates possibilities'],
                    wanting: ['Draining', 'Forced effort', 'Serves self', 'Consumes resources']
                }
            };

            return {
                success: true,
                data: commitmentGuidance,
                agent: this.agentName,
                message: `Distinguishing commitment from wanting. True commitment is always generative and serves something larger than personal gain.`
            };

        } catch (error) {
            return {
                success: false,
                error: `Commitment distinction failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Help identify larger purposes and callings
     */
    identifyLargerPurpose(parameters) {
        const { currentFocus, values } = parameters;

        try {
            const purposeGuidance = {
                currentFocus: currentFocus || 'unspecified',
                values: values || [],
                explorationQuestions: [
                    'What do you care about that extends beyond your personal circumstances?',
                    'What would you love to see different in the world?',
                    'When do you feel most alive and naturally generous?',
                    'What wants to be expressed through your unique gifts and perspective?',
                    'What legacy would you love to leave?'
                ],
                indicators: [
                    'Something that naturally calls to you',
                    'Energizes rather than depletes you',
                    'Serves something larger than personal gain',
                    'Feels like authentic expression',
                    'Creates rather than consumes'
                ],
                areas: [
                    'Family and relationships',
                    'Community and society',
                    'Professional contribution',
                    'Creative expression',
                    'Service to humanity',
                    'Environmental stewardship',
                    'Spiritual development',
                    'Knowledge and wisdom sharing'
                ]
            };

            return {
                success: true,
                data: purposeGuidance,
                agent: this.agentName,
                message: 'Exploring what you might be called to contribute that\'s larger than individual concerns. Your larger purpose often shows up as what naturally calls to you.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Purpose identification failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Change color of HTML elements (shared function)
     */
    changeColor(parameters) {
        const { ColorCode } = parameters;

        if (!ColorCode) {
            return {
                success: false,
                error: 'ColorCode parameter is required',
                agent: this.agentName
            };
        }

        try {
            // Sanitize the color code
            const sanitizedColor = ColorCode.replace(/[^#a-fA-F0-9]/g, '');

            // Apply to body background
            document.body.style.backgroundColor = sanitizedColor;

            return {
                success: true,
                data: { colorCode: sanitizedColor },
                agent: this.agentName,
                message: `Changed background color to ${sanitizedColor}`
            };

        } catch (error) {
            return {
                success: false,
                error: `Color change failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Write text to the webpage (shared function)
     */
    writeText(parameters) {
        const { Text } = parameters;

        if (!Text) {
            return {
                success: false,
                error: 'Text parameter is required',
                agent: this.agentName
            };
        }

        try {
            // Sanitize the text
            const sanitizedText = Text.replace(/[<>]/g, '');

            // Find or create a display area
            let displayArea = document.getElementById('agent-text-output');
            if (!displayArea) {
                displayArea = document.createElement('div');
                displayArea.id = 'agent-text-output';
                displayArea.style.cssText = 'margin: 20px; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background-color: #f9f9f9;';
                document.body.appendChild(displayArea);
            }

            // Add the text with timestamp
            const timestamp = new Date().toLocaleTimeString();
            displayArea.innerHTML += `<p><strong>[${timestamp}] ${this.agentName}:</strong> ${sanitizedText}</p>`;

            return {
                success: true,
                data: { text: sanitizedText },
                agent: this.agentName,
                message: `${this.agentName} wrote: "${sanitizedText}"`
            };

        } catch (error) {
            return {
                success: false,
                error: `Text writing failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }
}