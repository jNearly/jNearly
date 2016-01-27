/**
 * Our main function. This function does a few things: first, it checks the
 * type of the argument to see whether it's a function, otherwise it creates
 * a new instance of itself and attempts to convert the argument into an array
 * of elements.
 *
 * In terms of ES2015, it doesn't have that much: it uses `Array.from()` to
 * convert the NodeList returned by `querySelectorAll()` into an array, and it
 * uses ES5's `Array.isArray()` function.
 */
function $(input, context = document) {
	if (typeof input === 'function') {
		return $(document).ready(input);
	}

	if (input instanceof $) {
		return input;
	}

	// This means you don't have to write "new"
	if (!(this instanceof $)) {
		return new $(input, context);
	}

	let elements = getElementsFromInput(input, context);

	setElements(this, elements);

	let isHTML = typeof input === 'string' && input.startsWith('<');
	if (isHTML && !isDocument(context)) {
		this.attr(context);
	}

	this._syncLength();
}

function getElementsFromInput(input, context) {
	if (typeof input === 'string') {

		if (input.startsWith('<')) {
			if (isDocument(context)) {
				return $.parseHTML(input, context);
			} else {
				return $.parseHTML(input);
			}
		}

		if (typeof context === 'string') {
			return $(context).find(input).get();
		}

		return Array.from(context.querySelectorAll(input));
	} else if (Array.isArray(input)) {
		return input;
	} else if (input instanceof NodeList) {
		return Array.from(input);
	} else if (input instanceof Node) {
		return [input];
	}

	throw new TypeError('Input not recognised');
}

/**
 * Aliasing `$.fn` to `$.prototype` lets us write `$.fn.each` instead of having
 * to write `$.prototype.each`. jQuery does the same.
 */
$.fn = $.prototype = {};

/**
 * This makes jNearly objects "array-like": http://stackoverflow.com/a/6599447/902207
 */
$.fn.splice = [].splice;

/**
 * ### Working with private elements
 *
 * We don't have private properties—not even in ES6 classes—so instead we use
 * a WeakMap to store our elements and retrieve them as needed. Because they're
 * scoped to just this file, users cannot access it.
 *
 * [More about keeping private data in WeakMaps here.](http://www.2ality.com/2016/01/private-data-classes.html#keeping-private-data-in-weakmaps)
 */

const _elements = new WeakMap();
function setElements(obj, elements) {
	_elements.set(obj, elements);

	let l = Math.max(obj.length || 0, elements.length);
	for (let i = 0; i < l; i++) {
		obj[i] = elements[i];
	}
}

function getElements(obj) {
	return _elements.get(obj);
}

