/**
 * We use `parentElement` to find the parent element, and then `removeChild` to
 * remove the element. JavaScript doesn't allow elements to remove themselves.
 */
$.fn.remove = function (selector) {
	this.each(function () {
		if (!selector || this.matches(selector)) {
			this.parentElement.removeChild(this);
		}
	});
};