// Wait until the page is fully loaded
window.addEventListener("load", () => {
  // Retrieve stored CSS rules
  chrome.storage.sync.get("cssRules", (data) => {
    const cssRules = data.cssRules || [];
    const currentUrl = window.location.href;

    // Loop through all stored rules
    cssRules.forEach((rule) => {
      const regex = new RegExp(rule.urlPattern);

      // Check if the current URL matches the regex pattern
      if (regex.test(currentUrl)) {
        console.log("Applying CSS for pattern:", rule.urlPattern);

        // Create a <style> element and inject the CSS with !important
        const style = document.createElement("style");
        style.textContent = addImportantToCSS(rule.css);
        document.head.appendChild(style);
      }
    });
  });
});

// Function to add !important to all CSS properties
function addImportantToCSS(css) {
  return css.replace(/([^;{}]+)(;|})/g, (match, p1, p2) => {
    if (p1.includes("!important")) {
      return p1 + p2;
    }
    return `${p1.trim()} !important${p2}`;
  });
}
