export const detectGemini = (): boolean => {
    console.log('Running injection script');
  
    const detectAttribute = () => {
      const element = document.querySelector('[data-smart-draft-available="true"]');
      if (element) {
        console.log("Smart Draft is available in Gmail.");
        return true;
      } else {
        console.log("Smart Draft is not available in Gmail.");
        return false;
      }
    };
  
    const observer = new MutationObserver(detectAttribute);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  
    return detectAttribute();
  };