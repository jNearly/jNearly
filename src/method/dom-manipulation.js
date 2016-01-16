$.fn.remove = function (selector) {
	this.each(function () {
		if (!selector || this.matches(selector)) {
			this.parentElement.removeChild(this);
		}
	});
};