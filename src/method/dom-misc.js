/**
 * We're using slice here instead of the square brackets used above because
 * you can use a negative index: e.g. `.get(-1)` will get the last element in
 * the list.
 */
$.fn.get = function (n) {
	let elements = getElements(this);

	if (typeof n === 'number') {
		return elements.slice(n)[0];
	}

	// Clone the array so that the original can't be modified
	return elements.slice();
};

/**
 * We're using slice here instead of the square brackets used above because
 * you can use a negative index: e.g. `.eq(-1)` will get the last element in
 * the list.
 */
$.fn.eq = function (n) {
	let returnElement = getElements(this).slice(n)[0];
	return this._newFromThis(returnElement);
};

/**
 * We use some nifty array methods introduced in ES5 and ES2016 to filter the
 * set of elements down to the correct ones.
 */
$.fn.filter = function (selector) {
	let elements = getElements(this);

	let newElements;

	if (typeof selector === 'string') {
		// The filter method was introduced in ES5
		newElements = elements.filter(function (el) {
			// Element.matches() is prefixed in some browsers
			return el.matches(selector);
		});
	}

	if (typeof selector === 'function') {
		newElements = elements.filter(function (el, i) {
			return selector.call(el, i, el);
		});
	}

	if (selector instanceof Element) {
		// The includes method was introduced in ES2016
		if (elements.includes(selector)) {
			newElements = selector;
		}
	}

	if (selector[0] instanceof Element) {
		let selectorArray = Array.from(selector);

		newElements = elements.filter(function (el) {
			return selectorArray.includes(el);
		});
	}

	if (selector instanceof $) {
		newElements = elements.filter(function (el) {
			return selector.filter((i, inner) => el === inner).length;
		});
	}

	return this._newFromThis(newElements);
};

/**
 * Because `.is()` takes the same arguments as `.filter()`, but returns a
 * boolean value instead, it's easier to just run filter and then check the
 * length.
 */
$.fn.is = function (selector) {
	return !!this.filter(selector).length;
};
