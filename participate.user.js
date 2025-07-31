// ==UserScript==
// @name         participate
// @namespace    http://tampermonkey.net/
// @version      1.3.0
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

    // Block any popup openings
    window.open = function () {
        console.log("Blocked a window.open call");
        return null;
    };

    if (document.location.href.startsWith('https://www.instant-gaming.com/fr/giveaway/')) {

        let socialsClicked = false;

        // Function to click participate button
        function participate() {
            const participateBtn = document.querySelector("button.button.validate");
            if (participateBtn) {
                console.log("Clicking participate button...");
                participateBtn.click();
            }
        }

        // Function to click reward buttons
        function clickSocials() {
            const socials = document.querySelectorAll("a.button.reward");
            if (socials.length === 0) {
                console.log("No social buttons found yet.");
                return false;
            }
            console.log(`Clicking ${socials.length} social reward buttons...`);
            socials.forEach(social => social.click());
            socialsClicked = true;
            return true;
        }

        // Function to check if all reward buttons are marked as success
        function allSuccess() {
            const socials = document.querySelectorAll("a.button.reward");
            return socials.length > 0 &&
                document.querySelectorAll("a.button.reward.success").length === socials.length;
        }

        // Single MutationObserver to handle all steps
        const observer = new MutationObserver(() => {
            const participateBtn = document.querySelector("button.button.validate");
            const rewards = document.querySelectorAll("a.button.reward");

            // Step 1: Participate button is gone & rewards exist → click them
            if (!participateBtn && rewards.length > 0 && !socialsClicked) {
                console.log("Participation confirmed. Starting reward clicks...");
                clickSocials();
                return;
            }

            // Step 2: All rewards validated → close window
            if (socialsClicked && allSuccess()) {
                console.log("All rewards validated. Closing window...");
                observer.disconnect();
                window.close();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

        // Initial participation attempt
        participate();
    }

})();