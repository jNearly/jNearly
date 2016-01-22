# jNearly

jNearly is a JavaScript library and learning tool containing the functionality
of jQuery, but written using ES5, ES2015, and modern browser features.

There is an annotated source, which you can view at [jNearly.com].

Contributions very welcome! Just send a pull request. I'd recommend opening an
issue before you start working on something, to avoid two people working on the
same thing.

## To contribute

To contribute, clone the repository and run `npm install` in the root
directory, which will install the necessary dependencies for development. Then
run `gulp` and it'll do everything else for you.

Code can contain anything up to ES2016 stage 3 proposals—that's ES5, ES2015,
and ES2016 stage 3, 4 and accepted proposals (such as `[].includes` and `**`).
See this article for a list of what's in ES2016: [What's in ECMAScript 2016?]

All code should be documented and tested. I'd recommend consulting
[the jQuery API documentation]: functions do more than most people know about!

### Generated documentation

DocBlocks are being used to generate the annotated source. People already know
_what_ the functions are doing—or can read the jQuery documentation—so they
should say _how_ the functions work: for example, linking to the documentation
of the specific browser API being used.

For example, this is good:

```js
/**
 * `each` is achieved by using ES5's `forEach` method.
 */
$.fn.each = function (cb) {
	getElements(this).forEach((el, i) => cb.call(el, i, el));
	return this;
};
```

## Work In Progress

jNearly is currently a work in progress. If you want to contribute, you can
find a list of things that need doing on this issue:
[Things that need doing!][#1] (also, you're awesome)

[jNearly.com]: http://jnearly.com
[What's in ECMAScript 2016?]: http://www.2ality.com/2015/11/tc39-process.html
[the jQuery API documentation]: http://api.jquery.com/
[#1]: https://github.com/jNearly/jNearly/issues/1
