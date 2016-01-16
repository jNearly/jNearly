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
 * Retrieve the value of the `nextElementSibling` property until it matches
 * the selector.
 */
$.fn.next = function (selector) {
	let newElements = this.map((i, element) => element.nextElementSibling);

	newElements = $.unique(newElements).filter((el) => el instanceof Node);

	if (selector) {
		newElements = newElements.filter((child) => child.matches(selector));
	}

	return this._newFromThis(newElements);
};

$.fn.closest = function (selector) {
	let newElements = this.map(function (element) {
		while (!element.matches(selector)) {
			element = element.parentNode;
		}
	});

	return this._newFromThis($.unique(newElements));
};