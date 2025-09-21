import {
    bartKnowledgeBase,
    getBartKnowledgeBaseStats,
    getBartAvailableCategories
} from './bart-knowledge-base.js';

/**
 * Bart's Function Handler
 * Specializes in "Being Cause In The Matter" concepts
 */
export class BartFunctionHandler {
    constructor() {
        this.knowledgeBase = bartKnowledgeBase;
        this.agentName = "Bart";

        // Log knowledge base stats on initialization
        console.log(`${this.agentName} Function Handler initialized`);
        getBartKnowledgeBaseStats();
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
                case 'AnalyzeCauseAndEffect':
                    return this.analyzeCauseAndEffect(parameters);
                case 'IdentifyVictimPatterns':
                    return this.identifyVictimPatterns(parameters);
                case 'ExploreOwnership':
                    return this.exploreOwnership(parameters);
                case 'TransformToCreator':
                    return this.transformToCreator(parameters);
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
     * Search Bart's knowledge base about being cause in the matter
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
                ? `Found ${topResults.length} concept(s) about "${query}" in Bart's knowledge base on being cause in the matter.`
                : `No concepts found for "${query}" in Bart's knowledge base. Try terms like "cause", "effect", "ownership", "victim", or "creator".`;

            return {
                success: true,
                data: {
                    query,
                    category: category || 'all',
                    results: topResults,
                    totalFound: searchResults.length,
                    availableCategories: getBartAvailableCategories()
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
     * Analyze a situation for cause and effect patterns
     */
    analyzeCauseAndEffect(parameters) {
        const { situation, currentExperience } = parameters;

        try {
            const analysis = {
                situation: situation || 'unspecified',
                currentExperience: currentExperience || 'unspecified',
                causeQuestions: [
                    'Where might you be the source of this experience?',
                    'How could you be creating or allowing this situation?',
                    'What choices led to this current experience?',
                    'What\'s your part in how this is going?'
                ],
                effectIndicators: [
                    'Feeling like a victim of circumstances',
                    'Blaming others or external factors',
                    'Feeling powerless to change things',
                    'Waiting for circumstances to change first'
                ],
                shiftToCause: [
                    'What can you own about this situation?',
                    'What choices do you have right now?',
                    'How can you respond powerfully?',
                    'What would taking the pen back look like?'
                ],
                powerAccess: [
                    'Stop giving power away to circumstances',
                    'Own your response and relationship to what happened',
                    'Focus on what you can create rather than what you can\'t control',
                    'Ask "How can I be cause?" instead of "Why is this happening to me?"'
                ]
            };

            return {
                success: true,
                data: analysis,
                agent: this.agentName,
                message: `Analyzing cause and effect patterns in your situation. The key is shifting from being at the effect of circumstances to being the cause of your experience.`
            };

        } catch (error) {
            return {
                success: false,
                error: `Cause and effect analysis failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Identify victim patterns and consciousness
     */
    identifyVictimPatterns(parameters) {
        const { description, feelings } = parameters;

        try {
            const victimPatterns = {
                description: description || 'general situation',
                feelings: feelings || [],
                commonVictimPhrases: [
                    'It\'s not my fault',
                    'They made me do it',
                    'I had no choice',
                    'Why is this happening to me?',
                    'I can\'t help it',
                    'It\'s impossible because...'
                ],
                victimEmotions: [
                    'Powerlessness',
                    'Resentment',
                    'Blame',
                    'Frustration',
                    'Helplessness',
                    'Righteous indignation'
                ],
                underlyingBeliefs: [
                    'Circumstances control my experience',
                    'Others are responsible for how I feel',
                    'I have no power in this situation',
                    'Life happens TO me, not through me'
                ],
                transformationQuestions: [
                    'What story am I telling myself about being powerless here?',
                    'How might I be giving my power away?',
                    'What would I need to own to access my power?',
                    'Where am I making circumstances responsible for my experience?'
                ]
            };

            return {
                success: true,
                data: victimPatterns,
                agent: this.agentName,
                message: 'Identifying victim consciousness patterns. Recognition is the first step toward transformation to creator consciousness.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Victim pattern identification failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Explore ownership opportunities without blame
     */
    exploreOwnership(parameters) {
        const { situation, resistance } = parameters;

        try {
            const ownershipExploration = {
                situation: situation || 'general',
                resistance: resistance || 'none specified',
                ownershipAreas: [
                    'Your response to what happened',
                    'Your interpretation and meaning-making',
                    'Your choices and actions (or inactions)',
                    'Your communication and requests',
                    'Your boundaries and standards',
                    'Your relationship to the circumstances'
                ],
                notOwnership: [
                    'Other people\'s choices and actions',
                    'Natural disasters or accidents',
                    'Historical events or past circumstances',
                    'Other people\'s feelings or reactions'
                ],
                ownershipQuestions: [
                    'What choices did I make that contributed to this?',
                    'How did I respond or fail to respond?',
                    'What did I communicate or fail to communicate?',
                    'What boundaries did I set or fail to set?',
                    'How am I relating to this situation?'
                ],
                withoutBlame: [
                    'Ownership is about power, not punishment',
                    'You can own your part without making yourself wrong',
                    'The goal is accessing power to create change',
                    'Blame keeps you stuck; ownership sets you free'
                ]
            };

            return {
                success: true,
                data: ownershipExploration,
                agent: this.agentName,
                message: 'Exploring ownership opportunities without self-blame. The key is owning what you can to access your power to create change.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Ownership exploration failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Transform from victim to creator consciousness
     */
    transformToCreator(parameters) {
        const { currentStory, desiredOutcome } = parameters;

        try {
            const transformation = {
                currentStory: currentStory || 'not specified',
                desiredOutcome: desiredOutcome || 'not specified',
                victimToCreatorShifts: {
                    'Why is this happening to me?': 'How am I creating this and what can I do?',
                    'It\'s not my fault': 'What\'s my part in this?',
                    'I have no choice': 'What choices do I have?',
                    'They made me': 'How did I allow this?',
                    'I can\'t help it': 'What can I take responsibility for?',
                    'It\'s impossible': 'What would I need to own to make this possible?'
                },
                creatorQualities: [
                    'Takes ownership without blame',
                    'Focuses on response rather than circumstances',
                    'Asks empowering questions',
                    'Sees choices where others see limitations',
                    'Creates possibilities rather than reasons why not'
                ],
                actionSteps: [
                    'Identify what you can own in this situation',
                    'Stop telling victim stories about what happened',
                    'Focus on what you can create rather than what you can\'t control',
                    'Take one action that demonstrates you\'re cause in the matter',
                    'Practice asking "How can I respond powerfully?" in every situation'
                ]
            };

            return {
                success: true,
                data: transformation,
                agent: this.agentName,
                message: 'Transforming from victim to creator consciousness. This shift opens access to extraordinary power and possibility.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Creator transformation failed: ${error.message}`,
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