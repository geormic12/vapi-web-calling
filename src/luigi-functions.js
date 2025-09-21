import {
    luigiKnowledgeBase,
    getLuigiKnowledgeBaseStats,
    getLuigiAvailableCategories
} from './luigi-knowledge-base.js';

/**
 * Luigi's Function Handler
 * Specializes in "Linguistic Abstractions" and language patterns
 */
export class LuigiFunctionHandler {
    constructor() {
        this.knowledgeBase = luigiKnowledgeBase;
        this.agentName = "Luigi";

        // Log knowledge base stats on initialization
        console.log(`${this.agentName} Function Handler initialized`);
        getLuigiKnowledgeBaseStats();
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
                case 'AnalyzeLanguagePatterns':
                    return this.analyzeLanguagePatterns(parameters);
                case 'TransformLimitingLanguage':
                    return this.transformLimitingLanguage(parameters);
                case 'CreatePreciseLanguage':
                    return this.createPreciseLanguage(parameters);
                case 'IdentifyAbstractions':
                    return this.identifyAbstractions(parameters);
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
     * Search Luigi's knowledge base about linguistic abstractions
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
                ? `Found ${topResults.length} concept(s) about "${query}" in Luigi's knowledge base on linguistic abstractions.`
                : `No concepts found for "${query}" in Luigi's knowledge base. Try terms like "language patterns", "abstractions", "precision", or "empowering language".`;

            return {
                success: true,
                data: {
                    query,
                    category: category || 'all',
                    results: topResults,
                    totalFound: searchResults.length,
                    availableCategories: getLuigiAvailableCategories()
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
     * Analyze language patterns for limitations and empowerment
     */
    analyzeLanguagePatterns(parameters) {
        const { text, focus } = parameters;

        try {
            const analysis = {
                originalText: text || 'No text provided',
                focus: focus || 'general patterns',
                limitingPatterns: {
                    obligation: this.findPatterns(text, ['have to', 'should', 'must', 'need to']),
                    impossibility: this.findPatterns(text, ['can\'t', 'impossible', 'no way', 'never']),
                    victimization: this.findPatterns(text, ['you make me', 'they made me', 'had no choice']),
                    generalizations: this.findPatterns(text, ['everyone', 'always', 'never', 'everything', 'nothing'])
                },
                empoweringAlternatives: {
                    'have to': 'choose to',
                    'can\'t': 'haven\'t figured out how yet',
                    'impossible': 'challenging',
                    'you make me feel': 'I feel',
                    'everyone': 'some people',
                    'always': 'often',
                    'never': 'rarely'
                },
                questions: [
                    'What does this language assume about your choices?',
                    'How might this language limit your possibilities?',
                    'What would it sound like to express this in an empowering way?',
                    'How does this language affect your sense of power?'
                ]
            };

            return {
                success: true,
                data: analysis,
                agent: this.agentName,
                message: 'Analyzing language patterns for limiting and empowering elements. Language awareness is the first step to linguistic transformation.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Language analysis failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Transform limiting language into empowering language
     */
    transformLimitingLanguage(parameters) {
        const { limitingPhrase, context } = parameters;

        try {
            const transformations = {
                originalPhrase: limitingPhrase || 'No phrase provided',
                context: context || 'general',
                transformationMap: {
                    'I have to': 'I choose to',
                    'I can\'t': 'I haven\'t figured out how yet',
                    'It\'s impossible': 'It\'s challenging',
                    'You make me feel': 'I feel',
                    'I should': 'I want to',
                    'I need to': 'I\'m committed to',
                    'I had no choice': 'I chose the best option available',
                    'Everyone always': 'Some people sometimes',
                    'It\'s not my fault': 'What\'s my part in this?',
                    'I\'m stuck': 'I\'m exploring options'
                },
                principles: [
                    'Restore choice and personal power',
                    'Keep possibility alive even in challenges',
                    'Own your experience without blame',
                    'Be specific rather than abstract',
                    'Focus on what you can create rather than what you can\'t control'
                ],
                practice: [
                    'Notice when you use limiting language',
                    'Pause and ask "How could I say this in an empowering way?"',
                    'Practice new phrasings until they become natural',
                    'Pay attention to how different language feels'
                ]
            };

            // Try to provide specific transformation if possible
            const phrase = limitingPhrase?.toLowerCase();
            if (phrase && transformations.transformationMap[phrase]) {
                transformations.suggestedTransformation = transformations.transformationMap[phrase];
            }

            return {
                success: true,
                data: transformations,
                agent: this.agentName,
                message: 'Transforming limiting language into empowering language. Small shifts in language can create big shifts in possibility.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Language transformation failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Create more precise, specific language
     */
    createPreciseLanguage(parameters) {
        const { vagueTerm, situation } = parameters;

        try {
            const precisionGuidance = {
                vagueTerm: vagueTerm || 'not specified',
                situation: situation || 'general',
                precisionQuestions: [
                    'Who specifically?',
                    'What specifically?',
                    'When specifically?',
                    'Where specifically?',
                    'How specifically?',
                    'How much/many specifically?'
                ],
                commonVagueTerms: {
                    'things': 'What specific things?',
                    'people': 'Which specific people?',
                    'communication': 'How are you communicating?',
                    'relationship': 'How are you relating?',
                    'problems': 'What specific challenges?',
                    'issues': 'What particular concerns?',
                    'stuff': 'What specific items or topics?',
                    'it': 'What specifically does "it" refer to?'
                },
                benefits: [
                    'Clarity enables effective action',
                    'Specificity reveals hidden assumptions',
                    'Precision creates accountability',
                    'Clear language produces clear results',
                    'Vague language creates vague outcomes'
                ],
                examples: {
                    vague: 'Things aren\'t working in our relationship',
                    precise: 'Our communication about household responsibilities needs improvement',
                    vague2: 'I need to get better at communication',
                    precise2: 'I want to practice listening without interrupting and asking clarifying questions'
                }
            };

            return {
                success: true,
                data: precisionGuidance,
                agent: this.agentName,
                message: 'Creating more precise, specific language. Precision in language creates precision in life and results.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Precision language creation failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Identify linguistic abstractions and their impact
     */
    identifyAbstractions(parameters) {
        const { statement, type } = parameters;

        try {
            const abstractionAnalysis = {
                originalStatement: statement || 'No statement provided',
                type: type || 'general',
                abstractionTypes: {
                    nominalizations: {
                        description: 'Processes turned into things',
                        examples: ['communication', 'relationship', 'decision', 'management'],
                        question: 'How are you [verb-ing]?'
                    },
                    deletions: {
                        description: 'Missing specific information',
                        examples: ['They don\'t understand', 'It\'s broken', 'Things are bad'],
                        question: 'What/who specifically?'
                    },
                    generalizations: {
                        description: 'Universal statements',
                        examples: ['Everyone', 'always', 'never', 'all', 'none'],
                        question: 'Everyone? Always? Never?'
                    },
                    mindReading: {
                        description: 'Assuming others\' thoughts/feelings',
                        examples: ['He doesn\'t care', 'She thinks I\'m stupid'],
                        question: 'How do you know? What evidence?'
                    }
                },
                recoveryQuestions: [
                    'What specifically are you referring to?',
                    'How do you know this?',
                    'Who specifically?',
                    'What would this look like if it were happening?',
                    'What evidence supports this statement?'
                ],
                impact: [
                    'Abstractions hide important information',
                    'They create confusion and misunderstanding',
                    'They limit options and possibilities',
                    'They prevent clear action and solutions',
                    'They maintain problems rather than resolving them'
                ]
            };

            return {
                success: true,
                data: abstractionAnalysis,
                agent: this.agentName,
                message: 'Identifying linguistic abstractions and their impact. Recovery questions help restore the missing information.'
            };

        } catch (error) {
            return {
                success: false,
                error: `Abstraction identification failed: ${error.message}`,
                agent: this.agentName
            };
        }
    }

    /**
     * Helper function to find patterns in text
     */
    findPatterns(text, patterns) {
        if (!text) return [];
        const foundPatterns = [];
        const textLower = text.toLowerCase();

        for (const pattern of patterns) {
            if (textLower.includes(pattern.toLowerCase())) {
                foundPatterns.push(pattern);
            }
        }
        return foundPatterns;
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