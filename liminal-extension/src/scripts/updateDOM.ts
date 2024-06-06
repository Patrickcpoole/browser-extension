export const updateDOM = (): boolean => {
    const composeElements = document.querySelectorAll('div[aria-label="Message Body"][role="textbox"][contenteditable="true"]') as NodeListOf<HTMLElement>;
    console.log('composeElements', composeElements);
    
    if (composeElements.length > 0) {
      composeElements.forEach((composeElement) => {
        composeElement.style.backgroundColor = 'yellow'; // Example of updating the DOM
        console.log("Compose element updated.");
      });
      return true;
    } else {
      console.log("Compose elements not found.");
      return false;
    }
  };
  