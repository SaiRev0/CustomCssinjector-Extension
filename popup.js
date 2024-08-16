document.addEventListener("DOMContentLoaded", () => {
  loadCSSRules();
});

function loadCSSRules() {
  chrome.storage.sync.get("cssRules", (data) => {
    const cssRules = data.cssRules || [];
    const rulesContainer = document.getElementById("rulesContainer");

    rulesContainer.innerHTML = "";
    cssRules.forEach((rule, index) => {
      const ruleElement = document.createElement("div");
      ruleElement.className = "rule";

      const patternElement = document.createElement("input");
      patternElement.type = "text";
      patternElement.value = rule.urlPattern;
      patternElement.className = "urlPatternInput";

      const cssElement = document.createElement("textarea");
      cssElement.className = "cssInput";
      cssElement.value = rule.css;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "deleteButton";
      deleteButton.addEventListener("click", () => {
        deleteCSSRule(index);
      });

      ruleElement.appendChild(patternElement);
      ruleElement.appendChild(cssElement);
      ruleElement.appendChild(deleteButton);
      rulesContainer.appendChild(ruleElement);
    });
  });
}

function deleteCSSRule(index) {
  chrome.storage.sync.get("cssRules", (data) => {
    const cssRules = data.cssRules || [];
    cssRules.splice(index, 1);
    chrome.storage.sync.set({ cssRules }, loadCSSRules);
  });
}

document.getElementById("saveButton").addEventListener("click", () => {
  const urlPattern = document.getElementById("urlPattern").value;
  const customCSS = document.getElementById("customCSS").value;

  if (urlPattern && customCSS) {
    chrome.storage.sync.get("cssRules", (data) => {
      const cssRules = data.cssRules || [];
      cssRules.push({ urlPattern, css: customCSS });
      chrome.storage.sync.set({ cssRules }, () => {
        loadCSSRules();
        document.getElementById("urlPattern").value = "";
        document.getElementById("customCSS").value = "";
      });
    });
  }
});
