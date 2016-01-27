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