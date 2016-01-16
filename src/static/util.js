/**
 * We use an ES5 filter method to generate an array containing only the first
 * occurrence of every element.
 */
$.unique = function (arr) {
	return arr.filter((val, i) => arr.indexOf(val) === i);
};