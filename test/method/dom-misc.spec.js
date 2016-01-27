describe('DOM Miscellaneous', function () {
	var $dom = $('#dom-traversal');

	describe('$.fn.get()', function () {
		it('should get html elements', function () {
			var $divs = $dom.find('div');
			$divs.get(0).should.equal($divs[0]);
			$divs.get(4).should.equal($divs[4]);
		});

		it('should get html elements with negative index', function () {
			var $divs = $dom.find('div');
			$divs.get(0).should.equal($divs[0]);
			$divs.get(-1).should.equal($divs[$divs.length - 1]);
		});

		it('should get all elements as array', function () {
			var $divs = $dom.find('div');
			var divs = $divs.get();

			divs.length.should.equal(8);
			divs[3].should.equal($divs[3]);

			// Make sure it's a clone and the original can't be broken
			divs[3] = 'test';
			divs[3].should.not.equal($divs.get(3));
		});

		it('should not allow user to override elements of jNearly object', function () {
			var $divs = $dom.find('div');
			var divs = $divs.get();

			divs[3] = 'test';
			$divs.get(3).should.not.equal('test');
		});
	});

	describe('$.fn.eq()', function () {
		it('should get new jNearly object', function () {
			var $divs = $dom.find('div');
			var $firstDiv = $divs.eq(1);

			$firstDiv.length.should.equal(1);
			$firstDiv[0].should.equal($divs[1]);
		});

		it('should get new jNearly object with negative index', function () {
			var $divs = $dom.find('div');
			var $firstDiv = $divs.eq(-1);

			$firstDiv.length.should.equal(1);
			$firstDiv[0].should.equal($divs[7]);
		});
	});
});