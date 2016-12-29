// ==UserScript==
// @id          fefes_blog_nav
// @name        Fefes Blog Navigator
// @author      Johannes Pfrang <johannespfrang@gmail.com>
// @namespace   https://github.com/johnp
// @description Navigate blog.fefe.de using post anchors and url hash identifiers like on rerefefe
// @domain      blog.fefe.de
// @include     /^https?://blog\.fefe\.de/((\?|#).*)?$/
// @version     2.0
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant       GM_addStyle
// @run-at      document-idle
// @homepage    https://github.com/johnp/userscripts
// @supportURL  https://github.com/johnp/userscripts/issues
// @license     MIT
// ==/UserScript==
"use strict";

// add style for active post
//noinspection JSUnresolvedFunction,JSHint
GM_addStyle(".active{background-color:#dedede;}");

// track current hash globally
var currentHash = window.location.hash.slice(1);
// track previousPost for removing .active style once another post becomes active
var previousPost = null;

// add IDs/hashes to all the list elements
$('body > ul > li > a:first-child').each(function () {
    this.parentNode.id = this.href.split('=').pop();
    $(this).parent().click(function (e) {
        if (this.id !== currentHash) {
            scrollToPost(this.id);
        }
    });
});

// scroll to post if available
if (currentHash) {
    previousPost = $('#' + currentHash);
    if (!previousPost || !previousPost.length) {
        previousPost = null;
        postNotFound();
    } else {
        scrollToPost(currentHash);
    }
}

function scrollToPost(hash) {
    let post = $('#' + hash);
    if (previousPost) {
        previousPost.removeClass('active');
    }
    if (!post || !post.length) {
        postNotFound();
        return;
    }
    post.addClass('active');
    // jquery 3.0.0-alpha1/-git don't calculate .position() correctly
    // => crazy viewport jumping on every click
    // todo: bug report! (if you read this you may also do this yourself)
    //console.log("post.postition.top: " + post.position().top);
    $('html, body').animate({
        scrollTop: (post.position().top - 40)
    }, 600);
    // update globals
    previousPost = post;
    currentHash = hash;
    updateNav();
    window.location.hash = currentHash;
}

function postNotFound() {
    // post not found on page
    // => scroll to the end of page (where the navigation link(s) are)
    // todo: set focus if only month link?
    $('html, body').scrollTop($(document).height());
    updateNav();
}

function updateNav() {
    $('body > div:nth-last-child(2) > a').each(function () {
        let href = this.href.split('#');
        this.href = href[0] + '#' + currentHash;
    });
}

if ("onhashchange" in window) {
    window.onhashchange = function () {
        let id = window.location.hash.slice(1);
        if (id !== currentHash) {
            scrollToPost(id);
        }
    };
} else {
    console.warn('Error: Your browser does not support the hashchange event!');
}