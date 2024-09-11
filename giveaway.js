// ==UserScript==
// @name         giveaway
// @namespace    http://tampermonkey.net/
// @version      2024-09-10
// @description  try to take over the world!
// @author       Nairom
// @downloadURL  https://raw.githubusercontent.com/NAIR0M/instant-gaming-giveaway/main/giveaway.js
// @updateURL    https://raw.githubusercontent.com/NAIR0M/instant-gaming-giveaway/main/giveaway.js
// @match        *://www.instant-gaming.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instant-gaming.com
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  const jsonUrl = 'https://raw.githubusercontent.com/NAIR0M/instant-gaming-giveaway/main/giveawayList.json';

  function openUrlSequentially(urls, bool) {
    if (urls.length === 0) {
      alert("Done!");
      return;
    }

    const url = urls.shift(); // Get the first URL
    window.open(url, '_blank') // Open it in a new tab

    if (bool) {
      setTimeout(() => openUrlSequentially(urls, bool), 50);
    } else {
      openUrlSequentially(urls); // Open the next URL    
    }
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

  GM_registerMenuCommand('pc de dada(potato pc)', () => {
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        const urls = data.giveaway.map(giveaway => `https://www.instant-gaming.com/en/giveaway/${giveaway}?igr=Nyarom`);
        openUrlSequentially(urls, true);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });

})();
