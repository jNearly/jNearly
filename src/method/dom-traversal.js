/**
 * We iterate through the elements and then use the spread operator to push
 * the returned children into an array.
 */
$.fn.find = function (selector) {
	let newElements = [];

	this.each(function () {
		newElements.push(...this.querySelectorAll(selector));
	});

	return this._newFromThis($.unique(newElements));
};

/**
 * We iterate through the elements, pushing all the children to an array, and
 * then work out which ones to keep using the `.matches()` function.
 */
$.fn.children = function (selector) {
	let newElements = [];

	this.each((i, el) => newElements.push(...el.children));

	// We run unique first to avoid running .matches() unnecessarily
	newElements = $.unique(newElements);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);
};

/**
 * Retrieve the value of the `nextElementSibling` property for each element,
 * filtered by selector.
 */
$.fn.next = function (selector) {
	let newElements = this.map((i, element) => element.nextElementSibling);

	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);
};

/**
 * Retrieve the value of the `previousElementSibling` property for each element,
 * filtered by selector.
 */
$.fn.previous = function (selector) {
	let newElements = this.map((i, element) => element.previousElementSibling);

	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);
};

/**
 * Retrieve the value of the `parentElement` property for each element, filtered
 * by selector.
 */
$.fn.parent = function (selector) {
	let newElements = this.map((i, element) => element.parentElement);

	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);
};

/**
 * Works in a very similar way to `.parent()`, except it uses a generator to
 * get all the parents of an element, not just the direct parent. We then use
 * the spread operator to iterate through the iterator returned by the
 * generator and push all the parents of every element to an array.
 *
 * More on iterators and generators here: http://macr.ae/article/iterators-and-generators.html
 */
$.fn.parents = function (selector) {
	let newElements = [];
	this.each((i, element) => newElements.push(...parents(element)));
	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);

	// A generator function to return the parents of an element
	function* parents(element) {
		while ((element = element.parentElement)) {
			yield element;
		}
	}
};

/**
 * Continually get the parents of an element using `parentElement` until we
 * find one that matches the specified selector. We test for matches using the
 * `matches()` function.
 */
$.fn.closest = function (selector) {
	let newElements = this.map(function (i, element) {
		while (element && !element.matches(selector)) {
			element = element.parentElement;
		}

		return element;
	});

	// This gets rid of duplicates and ensures that we don't return null elements
	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	return this._newFromThis(newElements);
};