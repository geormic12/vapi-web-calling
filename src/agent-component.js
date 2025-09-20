export function createAgentComponent(agentId, config) {
    return `
    <div class="agent-container" data-agent-id="${agentId}">
      <div class="${config.buttonClass}" id="callWith${config.name}">
        <svg class="${config.iconClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z"/>
        </svg>
      </div>
      <div class="agent-name">${config.displayName}</div>
    </div>
  `;
}

export function createAgentsGrid(agentRegistry) {
    return Object.entries(agentRegistry)
        .map(([agentId, config]) => createAgentComponent(agentId, config))
        .join('');
}

export function attachAgentListeners(agentRegistry, callManager) {
    Object.keys(agentRegistry).forEach(agentId => {
        const button = document.getElementById(`callWith${agentRegistry[agentId].name}`);
        if (button) {
            button.addEventListener('click', () => callManager.handleAgentCall(agentId));
        }
    });
}

export function updateAgentUI(agentId, isActive, isCurrentAgent) {
    const button = document.getElementById(`callWith${agentId}`);
    if (button) {
        button.classList.toggle('active', isActive && isCurrentAgent);
        button.classList.toggle('disabled', isActive && !isCurrentAgent);

        if (isActive && !isCurrentAgent) {
            button.style.opacity = '0.5';
            button.style.cursor = 'not-allowed';
        } else {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        }
    }
}

export function resetAllAgentUI(agentRegistry) {
    Object.keys(agentRegistry).forEach(agentId => {
        updateAgentUI(agentId, false, false);
        // Reset any custom styling
        const button = document.getElementById(`callWith${agentId}`);
        if (button) {
            button.style.backgroundColor = '';
            button.style.boxShadow = '';
        }
    });
}