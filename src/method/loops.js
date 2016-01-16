/**
 * `each` is achieved by using ES5's `forEach` method.
 */
$.fn.each = function (cb) {
	getElements(this).forEach((el, i) => cb.call(el, i, el));
	return this;
};

/**
 * Similarly, `map` is achieved by using ES5's `map` method.
 */
$.fn.map = function (cb) {
	return getElements(this).map((el, i) => cb.call(el, i, el));
};