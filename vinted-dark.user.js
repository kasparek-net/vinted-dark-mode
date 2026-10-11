// ==UserScript==
// @name         Vinted Dark Mode
// @description  Turns on Vinted's built-in dark theme, follows the system appearance
// @version      2.0
// @match        *://*.vinted.cz/*
// @match        *://*.vinted.sk/*
// @match        *://*.vinted.com/*
// @match        *://*.vinted.de/*
// @match        *://*.vinted.pl/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const root = document.documentElement;

  // Vinted ships a complete dark theme in its CSS, it is just never switched on for the web.
  function apply() {
    if (dark.matches) {
      if (root.getAttribute("data-theme") !== "dark") root.setAttribute("data-theme", "dark");
    } else if (root.getAttribute("data-theme") === "dark") {
      root.removeAttribute("data-theme");
    }
  }

  const style = document.createElement("style");
  style.textContent = `
    @media (prefers-color-scheme: dark) {
      [class*="seller-promotion"] { background: rgb(var(--greyscale-level-5)) !important; }
    }
  `;
  root.appendChild(style);

  apply();
  dark.addEventListener("change", apply);
  new MutationObserver(apply).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
})();
