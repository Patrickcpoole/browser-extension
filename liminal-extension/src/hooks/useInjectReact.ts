import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';

const useInjectReact = (component: React.FC): [boolean | null, () => void] => {
  const [result, setResult] = useState<boolean | null>(null);

  const injectReactComponent = async () => {
    console.log('Attempting to inject React component');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('Tab:', tab);

    if (chrome.scripting && tab.id !== undefined) {
      const script = () => {
        const composeElements = document.querySelectorAll('div[aria-label="Message Body"][role="textbox"][contenteditable="true"]') as NodeListOf<HTMLElement>;
        if (composeElements.length > 0) {
          composeElements.forEach((composeElement, index) => {
            const uniqueContainerId = `liminal-chat-container-${index}`;
            const chatContainer = document.createElement('div');
            chatContainer.id = uniqueContainerId;
            composeElement.parentElement?.insertBefore(chatContainer, composeElement.nextSibling);
            chatContainer.attachShadow({ mode: 'open' });
            console.log('Chat Container:', chatContainer);
          });
          return true;
        } else {
          console.log("Compose elements not found.");
          return false;
        }
      };

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: script,
        },
        (injectionResults: chrome.scripting.InjectionResult<boolean>[]) => {
          for (const frameResult of injectionResults) {
            console.log('Script execution result:', frameResult);
            if (frameResult.result) {
              const composeElements = document.querySelectorAll('div[aria-label="Message Body"][role="textbox"][contenteditable="true"]') as NodeListOf<HTMLElement>;
                console.log('composeElements', composeElements);
              composeElements.forEach((_, index) => {
                const containerId = `liminal-chat-container-${index}`;
                const container = document.getElementById(containerId);
                console.log('Container:', container);

                if (container && container.shadowRoot) {
                  console.log('Rendering React component in container:', container);
                  ReactDOM.render(React.createElement(component), container.shadowRoot);
                  setResult(true);
                } else {
                  console.error('Failed to find container or shadow root');
                  setResult(false);
                }
              });
            } else {
              console.error('Failed to execute script');
              setResult(false);
            }
          }
        }
      );
    } else {
      console.error('chrome.scripting API not available');
    }
  };

  return [result, injectReactComponent];
};

export default useInjectReact;
