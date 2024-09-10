// ==UserScript==
// @name         participate
// @namespace    http://tampermonkey.net/
// @version      2024-09-10
// @description  try to take over the world!
// @author       You
// @match        *://www.instant-gaming.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instant-gaming.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  const jsonUrl = 'https://raw.githubusercontent.com/NAIR0M/instant-gaming-giveaway/main/giveawayList.json';

  /*function participate() {
    // Recherche du bouton avec les classes 'button' et 'validate'
    const button = document.querySelector('button.button.validate');

    if (button !== null) { // Vérifie si le bouton n'est pas désactivé
      console.log('Bouton trouvé et actif, tentative de clic...');
      button.click(); // Simuler le clic
    }
    return true;
  }*/


  function openUrlSequentially(urls) {
    if (urls.length === 0) return;

    const url = urls.shift(); // Get the first URL
    const newTab = window.open(url, '_blank'); // Open it in a new tab

    newTab.onload = function () {
      setTimeout(() => { newTab.close(); }, 2000); // Close the tab after 5 seconds
      openUrlSequentially(urls); // Open the next URL
    };
  }

  // Add a menu command to execute the script
  GM_registerMenuCommand('Execute script', () => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const urls = data.giveaway.map(giveaway => `https://www.instant-gaming.com/en/giveaway/${giveaway}?igr=Nyarom`);
        openUrlSequentially(urls);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });

})();
