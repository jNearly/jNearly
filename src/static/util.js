/**
 * We use an ES5 filter method to generate an array containing only the first
 * occurrence of every element.
 */
$.unique = function (arr) {
	return arr.filter((val, i) => arr.indexOf(val) === i);
};

/**
 * To merge objects together, we can use `Object.assign()` for shallow copies.
 * For deep copies, however, we use an iterator to iterate through, calling
 * `Object.assign()` when we can.
 */
$.extend = function (...objects) {
	if (objects[0] !== true) {
		// We can use Object.assign() if it's not a deep copy
		return Object.assign(...objects);
	}

	let returnObject = objects[1];

	for (let object of objects.slice(2)) {
		mergeOntoFirst(returnObject, object);
	}

	return returnObject;

	// Destructively deep copies properties from the second object to the first
	function mergeOntoFirst(first, second) {
		for (let key of Object.keys(second)) {
			if (typeof first[key] === 'object' && typeof second[key] === 'object') {
				mergeOntoFirst(first[key], second[key]);
			} else {
				first[key] = second[key];
			}
		}
	}
};

/**
 * We use the spread operator to push every elements of the second array onto
 * the end of the first array. We can't use concat, because that's not
 * destructive.
 */
$.merge = function (ary1, ary2) {
	if (!Array.isArray(ary1)) {
		ary1 = Array.from(ary1);
	}

	ary1.push(...ary2);
	return ary1;
};

/**
 * I'm not sure why jQuery felt the need to replicate the `.indexOf()`
 * functionality in arrays. You can just use `.indexOf()` directly.
 */
$.inArray = function (value, array, fromIndex = 0) {
	return array.indexOf(value, fromIndex);
};

/**
 * To check for an empty object, we attempt to iterate through it. This is
 * actually the same code jQuery uses to do it.
 */
$.isEmptyObject = function (obj) {
	for (var name in obj) {
		return false;
	}

	return true;
};

/**
 * These type checking functions are both trivial in JavaScript.
 */
$.isFunction = (obj) => typeof obj === 'function';
$.isWindow = (obj) => obj != null && obj.window === obj;

/**
 * To see if a value is numeric, we attempt to subtract it from itself and
 * compare it to zero. We have two special cases here: an array subtracted from
 * itself is zero, and `null - null` is also zero. To get around this, we call
 * `parseFloat` on one of them, which will return `NaN` for values like `null`.
 *
 * Why aren't we just using `typeof` and then checking for null? Well, that
 * would return false for strings containing numbers: `$.isNumeric("2")` should
 * return true.
 */
$.isNumeric = function (obj) {
	// Special case: `[1] - parseFloat([1])` evaluates to 0
	if (Array.isArray(obj)) {
		return false;
	}

	return Math.abs(obj - parseFloat(obj)) + Number.EPSILON > 0;
};

/**
 * These functions all now exist in JavaScript: no need to do anything other
 * than alias them.
 */
$.parseJSON = JSON.parse;
$.isArray = Array.isArray;
$.makeArray = (obj) => Array.from(obj);
$.now = Date.now;

// This too exists in JavaScript, but is on the prototype
$.trim = (str) => str.trim();

/**
 * $.type behaves similar to `typeof`, but with a bit less weirdness.
 *
 * First, we test for a few types that don't exist in JavaScript, and if it is
 * one of them, we return that value.
 *
 * Then, we call the `.valueOf()` method of the argument and return the type of
 * that. This is done because `typeof new String('hello')` is actually
 * "object", not "string" as expected. Calling `.valueOf()` returns the string
 * itself.
 */
$.type = function (obj) {
	if (obj === undefined) {
		return 'undefined';
	}

	if (obj === null) {
		return 'null';
	}

	if (Array.isArray(obj)) {
		return 'array';
	}

	if (obj instanceof Date) {
		return 'date';
	}

	if (obj instanceof Error) {
		return 'error';
	}

	if (obj instanceof RegExp) {
		return 'regexp';
	}

	return typeof obj.valueOf();
};