// ==UserScript==
// @name         participate
// @namespace    http://tampermonkey.net/
// @version      2024-09-10
// @description  try to take over the world!
// @author       Nairom
// @downloadURL  https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/participate.js
// @updateURL    https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/participate.js
// @match        *://www.instant-gaming.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instant-gaming.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (document.location.href.startsWith('https://www.instant-gaming.com/en/giveaway/')) {
        if (!document.location.href.endsWith('?igr=Nyarom')) {
            document.location.href = document.location.href + '?igr=Nyarom'
        }

        const button = document.querySelector('button.button.validate');

        if (button !== null) { //check the presence of the button
            console.log('Bouton trouvé et actif, tentative de clic...');
            button.click(); //click the button
            location.reload();
        }

        const socials = document.querySelectorAll("a.button.reward.alerts");
        socials.forEach(social => social.click());
        //TODO block socials redirection

        setTimeout(function () {
            window.close();
        }, 5);
    }

})();