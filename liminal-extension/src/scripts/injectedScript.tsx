// src/scripts/injectedScript.tsx
import ReactDOM from 'react-dom';
import InjectedComponent from '../components/InjectedComponent';

window.onload = () => {
  const composeElements = document.querySelectorAll('div[aria-label="Message Body"][role="textbox"][contenteditable="true"]');
  composeElements.forEach((composeElement) => {
    composeElement.innerHTML = '';
    const reactContainer = document.createElement('div');
    composeElement.appendChild(reactContainer);
    ReactDOM.render(<InjectedComponent />, reactContainer);
  });
};
