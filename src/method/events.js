/**
 * Added event listeners are stored in an array so that we can remove them
 * again easily.
 */
const listeners = [];

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

	// If `events` is an object containing multiple events
	// and handlers, call `on` again with each event
	if (typeof events === 'object') {
		for (let event of Object.keys(events)) {
			this.on(event, selector, events[event]);
		}

		return this;
	}

	// If `events` is a string containing multiple events,
	// split it up
	if (events.includes(' ')) {
		for (let event of events.split(' ')) {
			this.on(event, selector, handler);
		}

		return this;
	}

	// By now, `events` is a string containing a single event
	return this.each(function (i, element) {
		let jHandler = function (e) {
			let returnValue;

			if (!selector) {
				returnValue = handler.call(element, e);
			} else if (e.target.matches(selector)) {
				returnValue = handler.call(e.target, e);
			}

			// Returning true "cancels" the event.
			if (returnValue === false) {
				e.preventDefault();
				e.stopPropagation();
			}
		};

		let event = events;
		listeners.push({ element, event, selector, handler, jHandler });
		element.addEventListener(event, jHandler);
	});
};

/**
 * A lot of this function is the same as $.fn.on, as both functions accept
 * similar arguments. Then, we use the `.removeEventListener` function to
 * remove event listeners: but because we added our own listener in `.on()`,
 * we're having to do a tonne of additional logic to make sure we're removing
 * the correct thing.
 */
$.fn.off = function (events, selector, handler) {
	// `selector` is optional
	if (typeof selector === 'function') {
		handler = selector;
		selector = undefined;
	}

	// If `events` is an object containing multiple events
	// and handlers, call `off` again with each event
	if (typeof events === 'object') {
		for (let event of Object.keys(events)) {
			this.off(event, selector, events[event]);
		}

		return this;
	}

	// If `events` is a string containing multiple events,
	// split it up
	if (events && events.includes(' ')) {
		for (let event of events.split(' ')) {
			this.off(event, selector, handler);
		}

		return this;
	}

	return this.each(function () {
		// Iterate through all the listeners, seeing if they
		// match, and removing them if they do.
		for (let listener of listeners) {
			let matchesElement = listener.element === this;
			let matchesEvent = !events || listener.event === events;
			let matchesSelector = (!selector && !listener.selector)
					|| listener.selector === selector || selector === '**';
			let matchesHandler = !handler|| listener.handler === handler;

			if (matchesElement && matchesEvent && matchesSelector && matchesHandler) {
				this.removeEventListener(listener.event, listener.jHandler);
				listeners.splice(listeners.indexOf(listener), 1);
			}
		}
	});
};

/**
 * To implement `.one()`, we just call `.on()`, but we replace the event
 * handler with our own version which calls `.off()` once the event has been
 * fired.
 */
$.fn.one = function (events, selector, handler) {
	if (typeof selector === 'function') {
		handler = selector;
		selector = undefined;
	}

	// If `events` is an object containing multiple events
	// and handlers, call `one` again with each event
	if (typeof events === 'object') {
		for (let event of Object.keys(events)) {
			this.one(event, selector, events[event]);
		}

		return this;
	}

	let that = this;

	let newHandler = function () {
		handler.apply(this, arguments);
		that.off(events, selector, newHandler);
	};

	this.on(events, selector, newHandler);
};

/**
 * The ready event fired by jQuery doesn't actually exist. It's actually the
 * document load event, and this is a function that will fire it immediately
 * if the document load event has already been fired so that it is always
 * fired. We do this by checking `document.readyState`.
 */
$.fn.ready = function (handler) {
	if (document.readyState === 'complete') {
		handler($);
	} else {
		window.addEventListener('load', function () {
			handler($);
		});
	}
};