/**
 * jQuery's `.html()` method is the equivalent of the `innerHTML` property of
 * an element.
 */
$.fn.html = function (html) {
	if (html) {
		return this.each((i, el) => el.innerHTML = html);
	}

	return this[0].innerHTML;
};

/**
 * The `textContent` property contains the text of an element.
 *
 * Note: `innerText` does exist, but is non-standard and does something
 * slightly different: it shouldn't be used.
 */
$.fn.text = function (text) {
	if (text) {
		return this.each((i, el) => el.textContent = text);
	}

	return this[0].textContent;
};

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