// ==UserScript==
// @id          vc_autologin
// @name        Uni-Bamberg VC Auto-Login
// @namespace   https://github.com/johnp
// @description Simply clicks the right button (because I'm lazy)
// @include     https://vc.uni-bamberg.de/ds/*
// @version     1.0
// @run-at      document-start
// @homepage    https://github.com/johnp/userscripts
// @supportURL  https://github.com/johnp/userscripts/issues
// @license     MIT
// @noframes
// ==/UserScript==
'use strict';

// the page loads slow, so instead of waiting until document-end
// we observe the DOM creation and redirect immediately once we
// see the button with the URL for Uni Bamberg students

new window.MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    for (let node of mutation.addedNodes) {
      if (node.id == 'shibButton') {
        location = node.href;
      }
    }
  });
}).observe(document, {
  childList: true,
  subtree: true
});
