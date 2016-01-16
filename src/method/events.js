/**
 * We add event listeners using the `addEventListener` method. It accepts
 * different arguments to jQuery's `on` method, which is designed to make
 * adding events to a lot of elements at the same time really easy.
 */
$.fn.on = function (events, selector, handler) {
	// `selector` is optional
	if (typeof selector === 'function') {
		handler = selector;
		selector = undefined;
	}

	// If `events` is an object containing multiple events and handlers, call
	// `on` again with each event
	if (typeof events === 'object') {
		for (let event of Object.keys(events)) {
			this.on(event, selector, events[event]);
		}

		return this;
	}

	// If `events` is a string containing multiple events, split it up
	if (events.includes(' ')) {
		for (let event of events.split(' ')) {
			this.on(event, selector, handler);
		}

		return this;
	}

	// By now, `events` is a string containing a single event
	return this.each(function () {
		this.addEventListener(events, (e) => {
			let returnValue;

			if (!selector) {
				returnValue = handler.call(this, e);
			} else if (e.target.matches(selector)) {
				returnValue = handler.call(e.target, e);
			}

			// Returning true "cancels" the event. This is an anti-pattern btw!
			if (returnValue === false) {
				e.preventDefault();
				e.stopPropagation();
			}
		});
	});
};