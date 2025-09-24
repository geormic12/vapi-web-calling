import { LisaFunctionHandler } from './lisa-functions.js';
import { BrianaFunctionHandler } from './briana-functions.js';
import { BettyFunctionHandler } from './betty-functions.js';
import { BartFunctionHandler } from './bart-functions.js';
import { LuigiFunctionHandler } from './luigi-functions.js';
import { PeterFunctionHandler } from './peter-functions.js';
import { DebbieFunctionHandler } from './debbie-functions.js';
import { TimFunctionHandler } from './tim-functions.js';
import { PaulFunctionHandler } from './paul-functions.js';
import { FredFunctionHandler } from './fred-functions.js';
import { MichaelFunctionHandler } from './michael-functions.js';

export class FunctionHandlerRegistry {
    constructor() {
        this.handlers = new Map([
            ['lisa', new LisaFunctionHandler()],
            ['briana', new BrianaFunctionHandler()],
            ['betty', new BettyFunctionHandler()],
            ['bart', new BartFunctionHandler()],
            ['luigi', new LuigiFunctionHandler()],
            ['peter', new PeterFunctionHandler()],
            ['debbie', new DebbieFunctionHandler()],
            ['tim', new TimFunctionHandler()],
            ['paul', new PaulFunctionHandler()],
            ['fred', new FredFunctionHandler()],
            ['michael', new MichaelFunctionHandler()],
            // Add more handlers as agents are added
        ]);
    }

    getHandler(agentId) {
        return this.handlers.get(agentId);
    }

    handleFunctionCall(agentId, functionCall) {
        const handler = this.getHandler(agentId);
        if (!handler) {
            console.warn(`No function handler found for agent: ${agentId}`);
            return null;
        }

        try {
            const result = handler.handleFunctionCall(functionCall);
            return result;
        } catch (error) {
            console.error(`Error handling function call for ${agentId}:`, error);
            return {
                success: false,
                error: error.message,
                agent: agentId
            };
        }
    }

    registerHandler(agentId, handler) {
        this.handlers.set(agentId, handler);
        console.log(`Registered function handler for agent: ${agentId}`);
    }

    unregisterHandler(agentId) {
        const removed = this.handlers.delete(agentId);
        if (removed) {
            console.log(`Unregistered function handler for agent: ${agentId}`);
        }
        return removed;
    }

    getRegisteredAgents() {
        return Array.from(this.handlers.keys());
    }

    hasHandler(agentId) {
        return this.handlers.has(agentId);
    }
}