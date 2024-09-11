// ==UserScript==
// @name         giveaway
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Nairom
// @downloadURL  https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/giveaway.user.js
// @updateURL    https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/giveaway.user.js
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

    // Ajust delay for potato pc
    if (bool) {
      setTimeout(() => openUrlSequentially(urls, bool), 50);
    } else {
      openUrlSequentially(urls);  
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
