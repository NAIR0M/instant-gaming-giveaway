// ==UserScript==
// @name         participate
// @namespace    http://tampermonkey.net/
// @version      1.0.10
// @description  try to take over the world!
// @author       Nairom
// @downloadURL  https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/participate.user.js
// @updateURL    https://github.com/NAIR0M/instant-gaming-giveaway/raw/main/participate.user.js
// @match        *://www.instant-gaming.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instant-gaming.com
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    if (document.location.href.startsWith('https://www.instant-gaming.com/fr/giveaway/')) {
        if (!document.location.href.endsWith('?igr=Nyarom')) {
            document.location.href = document.location.href + '?igr=Nyarom'
        }

        function participate() {
            // Get the participate button element.
            const participate = document.querySelector("button.button.validate");
            // Click on participate if it exists.
            if (participate !== null) {
                participate.click();
                location.reload();
            }
        }

        function socials() {
            const socials = document.querySelectorAll("a.button.reward.alerts");
            socials.forEach(social => social.click());

            //TODO block socials redirection

        }

        participate();
        socials()
        setTimeout(() => {
            window.close();
        }, 500);
    }

})();