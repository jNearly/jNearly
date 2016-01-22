# Contributing to jNearly

First off: you're awesome. Thank you for contributing!

The most important thing to consider when contributing to jNearly is that the
library is primarily written as a learning tool. This has a number of
implications in how we write code: the most important change is that code
should be as much as possible understandable to beginners using our code to
learn from. Code should be as clear as possible, and not overly clever!

## To contribute

To contribute, clone the repository and run `npm install` in the root
directory, which will install the necessary dependencies for development. Then
run `gulp` and it'll do everything else for you.

Code can contain anything up to ES2016 stage 3 proposals—that's ES5, ES2015,
and ES2016 stage 3, 4 and accepted proposals (such as `[].includes` and `**`).
See this article for a list of what's in ES2016: [What's in ECMAScript 2016?]

All code should be documented and tested. I'd recommend consulting
[the jQuery API documentation]: functions do more than most people know about!

If you're implementing a feature of jQuery, it's probably a good idea to open
an issue so that we don't end up with two people working on the same thing.

## Generated documentation

DocBlocks are being used to generate the annotated source. People already know
_what_ the functions are doing—or can read the jQuery documentation—so the docs
should say _how_ the functions work: for example, linking to the documentation
of the specific browser API being used.

This is an example of a good annotated function:

```js
/**
 * `each` is achieved by using ES5's `forEach` method.
 */
$.fn.each = function (cb) {
	getElements(this).forEach((el, i) => cb.call(el, i, el));
	return this;
};
```

The DocBlocks are parsed using [marked], so you can use MarkDown. It also means
that new lines are ignored unless there is more than one of them. Please don't
use trailing whitespace to force new lines! There's a good chance a future
contributor's editor will remove it.

## Coding standards

As much as possible, try to make your code look like the rest of the code in
the project. Loosely, this means following [node-style-guide], with a couple
minor changes:

- Use tabs for indentation, not two spaces!
- 60 characters per line. More on this below.
- Do whatever you want with your ternary operators, as long as it is readable.
- Nesting closures is usually fine, as long as it is readable (spot a theme?)

Code should be 60 characters per line wherever possible. This ensures that you
don't need to scroll to read the source on the annotated documentation very
much, only if you have a very small display. It's narrower than
usual—node-style-guide recommends 80 characters—but it's not too tricky to
stick to.

[marked]: https://www.npmjs.com/package/marked
[node-style-guide]: https://github.com/felixge/node-style-guide
[What's in ECMAScript 2016?]: http://www.2ality.com/2015/11/tc39-process.html
[the jQuery API documentation]: http://api.jquery.com/