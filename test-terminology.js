// Test script to verify the new terminology is working correctly
import { MichaelFunctionHandler } from './src/michael-functions.js';

// Mock DOM elements for testing
global.document = {
    getElementById: (id) => ({
        textContent: '',
        style: {},
        closest: () => ({ style: {}, setAttribute: () => { }, removeAttribute: () => { } })
    }),
    querySelectorAll: () => []
};

const handler = new MichaelFunctionHandler();

// Test new terminology
console.log('\n=== Testing New Terminology ===');

// Test FocusOnStatement with new parameter values
const testFocusNew1 = handler.handleFunctionCall({
    name: 'FocusOnStatement',
    parameters: {
        statementType: 'being cause in the matter',
        userMessage: 'I want to take ownership of my results'
    }
});

console.log('Test 1 - Being Cause in the Matter:', testFocusNew1.success ? 'PASS' : 'FAIL');
console.log('Response:', testFocusNew1.data?.response?.substring(0, 100) + '...');

const testFocusNew2 = handler.handleFunctionCall({
    name: 'FocusOnStatement',
    parameters: {
        statementType: 'being given by something greater',
        userMessage: 'I want to discover my purpose'
    }
});

console.log('\nTest 2 - Being Given by Something Greater:', testFocusNew2.success ? 'PASS' : 'FAIL');
console.log('Response:', testFocusNew2.data?.response?.substring(0, 100) + '...');

// Test legacy compatibility
console.log('\n=== Testing Legacy Compatibility ===');

const testFocusLegacy1 = handler.handleFunctionCall({
    name: 'FocusOnStatement',
    parameters: {
        statementType: 'causation',
        userMessage: 'I want to take ownership'
    }
});

console.log('Test 3 - Legacy "causation":', testFocusLegacy1.success ? 'PASS' : 'FAIL');

const testFocusLegacy2 = handler.handleFunctionCall({
    name: 'FocusOnStatement',
    parameters: {
        statementType: 'commitment',
        userMessage: 'I want to find purpose'
    }
});

console.log('Test 4 - Legacy "commitment":', testFocusLegacy2.success ? 'PASS' : 'FAIL');

console.log('\n=== All Tests Complete ===');