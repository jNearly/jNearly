'use strict';

describe('Util functions', function () {
	describe('$.unique()', function () {
		it('should work with arrays', function () {
			var uniqued = $.unique([1, 2, 3, 2, 1]);

			uniqued.length.should.equal(3);
			uniqued.should.deepEqual([1, 2, 3]);
		});

		it('should work with arrays of nodes', function () {
			var $divs = $('div');
			var nodeArray = [$divs[0], $divs[1], $divs[0], $divs[2]];

			$.unique(nodeArray).length.should.equal(3);
		});
	});
});