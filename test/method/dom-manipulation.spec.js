'use strict';

describe('DOM Manipulation', function () {
	describe('$.fn.remove()', function () {
		var startLength = $('#dom-manipulation-remove p').length;

		it('should remove by selector', function () {
			$('#dom-manipulation-remove p').remove('.test');
			$('#dom-manipulation-remove p').length.should.equal(startLength - 1)
		});

		it('should remove all', function () {
			$('#dom-manipulation-remove p').remove();
			$('#dom-manipulation-remove p').length.should.equal(0)
		});
	});
});