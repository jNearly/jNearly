# jNearly

A library and learning tool. Contains the features of jQuery, but written
using ES5, ES2015, and modern browser features.

Also will—soon—contain an annotated source so that people don't have to trawl
through github! :)

Contributions very welcome! Just send a pull request. I'd recommend opening an
issue before you start working on something, to avoid two people working on the
same thing.

## To contribute

To contribute, clone the repository and run `npm install` in the root
directory, which will install the necessary dependencies. Then run `gulp` and
it'll do everything else for you.

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

## Todo

- Write tests
- Write annotated docs generator
- Write code
- Split annotated docs generator into another repo