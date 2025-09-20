export class LisaFunctionHandler {
  constructor() {
    this.knowledgeBase = new Map([
      ['integrity definition', 'Integrity is a positive phenomenon - a state of being whole, complete, unbroken, unimpaired, sound, and in perfect condition.'],
      ['honoring your word', 'Honoring your word means keeping your word OR informing all parties and cleaning up any mess when you cannot.'],
      ['out of integrity', 'When your word is not whole and complete, creating unworkability in life - things become unreliable and less effective.'],
      ['ontological coaching', 'A coaching methodology that focuses on the being of the person, not just their doing. It examines how language, emotions, and body create our experience of reality.'],
      ['language and reality', 'Language is not just descriptive but generative - it creates our reality and shapes our possibilities.'],
      ['emotional mastery', 'Understanding that emotions are not just reactions but are interpretations that can be examined and shifted.'],
      ['somatic awareness', 'The body is not just a physical vessel but a source of intelligence and wisdom that informs our decisions and actions.']
    ]);
  }

  handleFunctionCall(functionCall) {
    switch (functionCall.name) {
      case 'SearchIntegrityKnowledgeBase':
        return this.searchKnowledgeBase(functionCall.parameters);
      case 'ChangeColor':
        return this.changeColor(functionCall.parameters);
      case 'WriteText':
        return this.writeText(functionCall.parameters);
      default:
        console.warn(`Unknown function: ${functionCall.name}`);
        return null;
    }
  }

  searchKnowledgeBase(parameters) {
    const { query, category } = parameters;
    console.log(`Lisa searching knowledge base for: ${query}`);
    
    const results = [];
    this.knowledgeBase.forEach((value, key) => {
      if (key.includes(query.toLowerCase()) || value.toLowerCase().includes(query.toLowerCase())) {
        results.push({ key, content: value });
      }
    });

    return {
      query,
      category,
      results,
      agent: 'Lisa',
      timestamp: new Date().toISOString()
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
    console.log(`Lisa writing text: ${Text}`);
    
    const textArea = document.getElementById('vapiTyping');
    if (textArea) {
      textArea.textContent = `Lisa: ${Text}`;
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
}