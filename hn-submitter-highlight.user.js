// ==UserScript==
// @id          hn-submitter-highlight
// @name        Hacker News Submitter Highlight
// @author      Johannes Pfrang <johannespfrang@gmail.com>
// @namespace   https://github.com/johnp
// @description Makes the submitters name more apparent when scrolling through comments.
// @include     /^https?://news\.ycombinator\.com/item\?.*$/
// @version     2.1
// @grant       none
// @run-at      document-idle
// @homepageURL https://github.com/johnp/userscripts
// @supportURL  https://github.com/johnp/userscripts/issues
// @updateURL   https://github.com/johnp/userscripts/raw/master/hn-submitter-highlight.user.js
// @license     MIT
// ==/UserScript==
"use strict";

// first commenter element is always the author
const commenters = document.getElementsByClassName('hnuser');
const author = commenters[0].text;

// the rest are elements in the comment headers
for (let i = 1; i < commenters.length; i++) {
    let commenter = commenters[i];
    if (commenter.text === author) {
        const css = commenter.style;
        css.backgroundColor = '#8000ff';
        css.color = '#ffffff';
        css.padding = '1px 2px';
        css.borderRadius = '3px';
    }
}
