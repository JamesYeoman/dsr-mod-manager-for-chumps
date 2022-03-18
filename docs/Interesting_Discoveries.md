# Interesting Discoveries

## What is this for?

When I find new tech that could replace what I have, it's tempting to just do that.
But let's be honest, this would never be finished if I did that all the time.

So this markdown document is a collection of such tech.

## CSS libraries

- [Open Props](https://open-props.style/)

## Polyfill-related

- [Modernizr](https://modernizr.com/)
  - For performing feature detection so that polyfills can be loaded if a feature isn't native yet in the user's browser
- [List of polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-browser-Polyfills)
  - Documentation is by Modernizr
- [Dialog HTML element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog)
  - The polyfill for this element can be found [here](https://github.com/GoogleChrome/dialog-polyfill)
    - Requires [portals](https://reactjs.org/docs/portals.html) as polyfilled dialogs need to be siblings of the body element
