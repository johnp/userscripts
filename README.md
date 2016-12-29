## Userscripts

A small collection of userscripts to enhance the browsing experience on various sites.

#### Hacker News Submitter Highlight
Makes the submitters name more apparent when scrolling through comments.


#### Fefes Blog Navigator
Fefes Blog Navigator is the port of a feature from rerefefe to the original blog.
All blog entries now have a page anchor equal to their ID, that allows e.g. session
restore to remember the last read post and eases navigation through the page.


##### Notes

- [ ] get rid of jQuery. Notes:
    - ZeptoJS has no .animate() (would need additional fx package, so 2 js files... need to test)
    - Velocity + ZeptoJS doesn't work -.-
    - or just don't animate & instead convert everything to plain js
    - or remove animate and use a light-weight selector library (Minified.js)
- [ ] change ?ts=[id] links to #[id]
- [ ] add other event handlers besides `onClick` for a11y
- [ ] convert this list to github issues