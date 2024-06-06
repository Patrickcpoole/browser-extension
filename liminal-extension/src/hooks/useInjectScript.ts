import { useState } from 'react';

const useInjectScript = (script: () => boolean): [boolean | null, () => void] => {
  const [result, setResult] = useState<boolean | null>(null);

  const injectScript = async () => {
    console.log('injecting script');
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    console.log('tab', tab);
    console.log('chrome', chrome);
    if (chrome.scripting && tab.id !== undefined) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: script,
        },
        (injectionResults: chrome.scripting.InjectionResult<boolean>[]) => {
          for (const frameResult of injectionResults) {
            console.log('Script injected and executed:', frameResult);
            setResult(frameResult.result ?? false);  // Handle potential undefined
          }
        }
      );
    } else {
      console.error('chrome.scripting API not available');
    }
  };

  return [result, injectScript];
};

export default useInjectScript;
