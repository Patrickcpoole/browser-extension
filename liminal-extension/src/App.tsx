import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import liminalLogo from './assets/logo-full.svg';
import useInjectScript from './hooks/useInjectScript';
import './App.css';

function App() {

  useEffect(()  => {

    if (chrome?.scripting) {
      useInjectScript
    } else {
      console.error('chrome.scripting API not available');
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={liminalLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Liminal Test</h1>
    </>
  );
}

export default App;
