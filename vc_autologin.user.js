// ==UserScript==
// @id          vc_autologin
// @name        Uni-Bamberg VC Auto-Login
// @author      Johannes Pfrang
// @namespace   https://github.com/johnp
// @description Simply clicks the right button (because I'm lazy)
// @match       https://vc.uni-bamberg.de/ds/*
// @version     1.2
// @run-at      document-start
// @homepageURL https://github.com/johnp/userscripts
// @supportURL  https://github.com/johnp/userscripts/issues
// @updateURL   https://github.com/johnp/userscripts/raw/master/vc_autologin.user.js
// @license     MIT
// @noframes
// ==/UserScript==
'use strict';

// the page loads slow, so instead of waiting until document-end
// we observe the DOM creation and redirect immediately once we
// see the button with the URL for Uni Bamberg students
if ('loading' == document.readyState) {
  new window.MutationObserver(function (mutations, self) {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if ('shibButton' == node.id) {
          window.stop();
          self.disconnect();
          window.location.href = node.href;
          return;
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
}

window.onload = function () {
  window.location.href = document.getElementById('shibButton').href;
}
