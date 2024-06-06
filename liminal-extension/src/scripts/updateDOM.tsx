// src/updateDOM.ts
import { createRoot } from 'react-dom/client';
import InjectedComponent from '../components/InjectedComponent';

export const updateDOM = (): boolean => {
  const composeElements = document.querySelectorAll('div[aria-label="Message Body"][role="textbox"][contenteditable="true"]') as NodeListOf<HTMLElement>;
  console.log('composeElements', composeElements);

  if (composeElements.length > 0) {
    composeElements.forEach((composeElement) => {
      composeElement.style.backgroundColor = 'yellow'; // Example of updating the DOM

      // Clear the compose element content
      composeElement.innerHTML = '';

      // Create a container for the React component
      const reactContainer = document.createElement('div');
      composeElement.appendChild(reactContainer);

      // Create a root and render the React component
      const root = createRoot(reactContainer);
      root.render(<InjectedComponent />);

      console.log("Compose element updated with React component.");
    });
    return true;
  } else {
    console.log("Compose elements not found.");
    return false;
  }
};
