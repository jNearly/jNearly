'use strict';

describe('Looping (static)', function () {
	describe('$.each()', function () {
		it('should loop through arrays', function () {
			var called = 0;

			$.each([4, 5, 6], function (i, val) {
				called++;

				i.should.be.within(0, 2);
				val.should.be.within(4, 6);
			});

			called.should.equal(3);
		});

		it('should loop through NodeLists', function () {
			var called = 0;

			var p = document.querySelectorAll('#looping p');

			$.each(p, function (i, node) {
				called++;

				i.should.be.within(0, 5);
				node.should.be.instanceof(HTMLParagraphElement);
			});

			called.should.equal(6);
		});

		it('should loop through jNearly objects', function () {
			var called = 0;
			var $p = $('#looping p');

			$.each($p, function (i, node) {
				called++;

				i.should.be.within(0, 5);
				node.should.be.instanceof(HTMLParagraphElement);
			});

			called.should.equal(6);
		});

		it('should loop through normal objects', function () {
			var called = 0;
			var obj = { foo: 'bar', hello: 'world' };

			$.each(obj, function (key, value) {
				called++;

				key.should.equalOneOf(Object.keys(obj));
				value.should.equalOneOf('bar', 'world');

				if (key === 'foo') {
					value.should.equal('bar');
				}
			});

			called.should.equal(2);
		});
	});
});