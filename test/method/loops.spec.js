'use strict';

describe('Looping (method)', function () {
	var $p = $('#looping p');
	describe('$.fn.each()', function () {
		it('should loop', function () {
			var called = 0;

			$p.each(function (i, el) {
				called++;

				i.should.be.within(0, 5);
				el.should.be.instanceof(HTMLParagraphElement);
				this.should.equal(el);
			});

			called.should.equal(6);
		});

		it('should return itself', function () {
			var returned = $p.each(function () {});
			returned.should.equal($p);
		});
	});

	describe('$.fn.map()', function () {
		it('should loop', function () {
			var called = 0;

			$p.map(function (i, el) {
				called++;

				i.should.be.within(0, 5);
				el.should.be.instanceof(HTMLParagraphElement);
				this.should.equal(el);
			});

			called.should.equal(6);
		});

		it('should create a new array with return values', function () {
			var returns = $p.map(function (i) {
				return i;
			});

			returns.should.deepEqual([0, 1, 2, 3, 4, 5]);
		});
	});
});