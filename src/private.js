/**
 * A convenience function to recalculate the `length` property in case the
 * something we've done has caused the length of the elements array to change.
 */
$.fn._syncLength = function () {
	this.length = getElements(this).length;
};

/**
 * If we want to return a new object, we also want to set the `prevObject`
 * property so that we can use the `.end()` function to go back to what we had.
 * This is a convenience function to avoid writing it a load of times.
 */
$.fn._newFromThis = function (newElements) {
	let new$ = new $(newElements);
	new$.prevObject = this;
	return new$;
};

/**
 * We can't use `el instanceof Document`, because it's an instance of the
 * Document object from another window.
 */
function isDocument(el) {
	return el.constructor.name === 'HTMLDocument';
}