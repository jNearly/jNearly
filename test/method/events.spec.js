'use strict';

describe('Events', function () {
	describe('$.fn.on()', function () {
		it('should add simple events', function (done) {
			var $body = $('body');
			var called = false;

			$body.on('click', function () {
				// Stop future tests interfering
				if (!called) {
					done();
					called = true;
				}
			});

			fireEvent($body[0], 'click');
		});

		it('should add multiple events in same string', function (done) {
			var $body = $('body');
			var called = 0;

			$body.on('mouseup mousedown', function () {
				called++;

				if (called == 2) {
					done();
				}
			});

			fireEvent($body[0], 'mouseup');
			fireEvent($body[0], 'mousedown');
		});

		it('should support event objects', function (done) {
			var $body = $('body');
			var called = false;

			$body.on({
				click: function () {
					// Stop future tests interfering
					if (!called) {
						done();
						called = true;
					}
				}
			});

			fireEvent($body[0], 'click');
		});

		it('should support event objects with multiple events', function (done) {
			var $body = $('body');
			var called = 0;

			function handler() {
				called++;

				if (called === 3) {
					done();
				}
			}

			$body.on({
				'mouseup mousedown': handler,
				keydown: handler
			});

			fireEvent($body[0], 'mouseup');
			fireEvent($body[0], 'mousedown');
			fireEvent($body[0], 'keydown');
		});

		it('should add listeners to multiple elements', function (done) {
			var div = $('div');
			var called = 0;

			function handler() {
				called++;

				if (called === 2) {
					done();
				}
			}

			div.on('click', handler);

			fireEvent(div[0], 'click');
			fireEvent(div[1], 'click');
		});

		it('should support magic selector argument', function (done) {
			var $events = $('#events');
			var called = 0;

			$(document).on('click', '#events', function (e) {
				// Ensure it is only called once
				called++;
				called.should.equal(1);

				this.should.equal($events[0]);
				e.should.be.instanceof(Event);
				e.target.should.equal(this);
				done();
			});

			fireEvent(document.documentElement, 'click');
			fireEvent($events[0], 'click');
			fireEvent($events.find('p')[0], 'click');
		});
	});

	describe('$.fn.off()', function () {
		it('should remove events added by $.fn.on()', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			$body.on('click', handler);
			fireEvent($body[0], 'click');
			fireEvent($body[0], 'click');

			clicked.should.equal(2);

			$body.off('click', handler);
			fireEvent($body[0], 'click');

			clicked.should.equal(2);
		});

		it('should remove events with selectors', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			var $events = $body.find('#events-off');
			$body.on('click', '#events-off', handler);

			fireEvent($events[0], 'click');
			fireEvent($events[0], 'click');

			clicked.should.equal(2);

			$body.off('click', '#events-off', handler);

			fireEvent($events[0], 'click');

			clicked.should.equal(2);
		});

		it('should not remove other events with selectors', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			$body.on('click', handler);

			fireEvent($body[0], 'click');
			fireEvent($body[0], 'click');

			clicked.should.equal(2);

			$body.off('click', '#events-off', handler);

			fireEvent($body[0], 'click');

			clicked.should.equal(3);
		});

		it('should not remove events with selectors when selector not specified', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			var $events = $body.find('#events-off');
			$body.on('click', '#events-off', handler);

			fireEvent($events[0], 'click');
			fireEvent($events[0], 'click');

			clicked.should.equal(2);

			$body.off('click', handler);

			fireEvent($events[0], 'click');

			clicked.should.equal(3);
		});

		it('should remove events with wildcard selectors', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			var $events = $body.find('#events-off');
			$body.on('click', '#events-off', handler);

			fireEvent($events[0], 'click');
			fireEvent($events[0], 'click');

			clicked.should.equal(2);

			$body.off('click', '**', handler);

			fireEvent($events[0], 'click');

			clicked.should.equal(2);
		});

		it('should remove events from just the name', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			$body.on('click', handler);
			fireEvent($body[0], 'click');
			fireEvent($body[0], 'click');

			clicked.should.equal(2);

			$body.off('click');
			fireEvent($body[0], 'click');

			clicked.should.equal(2);
		});

		it('should remove all events with no arguments', function () {
			var clicked = 0;
			function handler() {
				clicked++;
			}

			var $body = $('body');
			$body.on('click', handler);
			fireEvent($body[0], 'click');
			fireEvent($body[0], 'click');

			clicked.should.equal(2);

			$body.off();
			fireEvent($body[0], 'click');

			clicked.should.equal(2);
		});
	});

	describe('$(document).ready()', function () {
		it('should be ran on document load', function (done) {
			$(function () {
				done();
			});
		});

		it('should be immediately ran because document is already ready!', function (done) {
			$(function () {
				done();
			});
		});
	});
});

function fireEvent(el, event) {
	var evObj = document.createEvent('Events');
	evObj.initEvent(event, true, false);
	el.dispatchEvent(evObj);
}