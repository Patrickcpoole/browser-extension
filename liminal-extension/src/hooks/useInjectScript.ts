

const useInjectScript = async () => {

   
      console.log('injecting script');
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      console.log('tab', tab);
      console.log('chrome', chrome);
      if (chrome.scripting && tab.id !== undefined) {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: () => {
              console.log('Running injected script');
              // Function to detect the specific attribute
              function detectSmartDraft() {
                const element = document.querySelector('[data-smart-draft-available="true"]');
                if (element) {
                  console.log("Smart Draft is available in Gmail.");
                } else {
                  console.log("Smart Draft is not available in Gmail.");
                }
              }

              // Function to observe changes in the DOM
              const observer = new MutationObserver(detectSmartDraft);
              function observeDOMChanges() {
                observer.observe(document.body, {
                  childList: true,
                  subtree: true,
                });
              }

              // Run detection on script injection
              console.log('Running injected script');
              detectSmartDraft();
              observeDOMChanges();
            },
          },
          (injectionResults) => {
            for (const frameResult of injectionResults) {
              console.log('Script injected and executed:', frameResult);
            }
          }
        );
      } else {
        console.error('chrome.scripting API not available');
      }
    };

   

export default useInjectScript;
