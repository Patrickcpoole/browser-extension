import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const InjectedComponent: React.FC = () => {
  const shadowRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shadowRootRef.current) {
      const shadowRoot = shadowRootRef.current.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = `
        .injected-content {
          font-family: Arial, sans-serif;
          color: #333;
        }
        .injected-content h2 {
          color: #007bff;
        }
      `;
      shadowRoot.appendChild(style);

      const container = document.createElement('div');
      container.className = 'injected-content';
      shadowRoot.appendChild(container);

      // Render React component inside shadow DOM
      ReactDOM.render(
        <div>
          <h2>Injected React Component</h2>
          <p>This is a React component injected into the Gmail compose area.</p>
        </div>,
        container
      );
    }
  }, []);

  return <div ref={shadowRootRef}></div>;
};

export default InjectedComponent;
