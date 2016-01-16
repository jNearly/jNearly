/**
 * The function attempts to convert a given object into an array using ES2015's
 * `Array.from()` function, and then iterates over the result if it has worked.
 * Failing that, it's probably an object, so we iterate over the keys using
 * a for-of loop introduced in ES2015.
 *
 * If given an empty array, `arr.length` will be 0 and so it'll treat it like
 * an object, but that's okay: `Object.keys([])` returns `[]`.
 */
$.each = function (obj, cb) {
	const arr = Array.from(obj);
	if (arr.length) {
		return arr.forEach((val, i) => cb(i, val));
	}

	for (let key of Object.keys(obj)) {
		cb(key, obj[key]);
	}
};