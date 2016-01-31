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

	describe('$.fn.filter', function () {
		var $dom = $('#dom-traversal');
		var $kids = $dom.find('*');

		it('should accept string input', function () {
			var $one = $kids.filter('[class^="one"]');
			$one.should.be.instanceof($);
			$one.length.should.equal(3);
			$one[0].className.should.equal('one');
		});

		it('should accept function input', function () {
			var $one = $kids.filter(function () {
				return this.className.indexOf('one') === 0;
			});

			$one.should.be.instanceof($);
			$one.length.should.equal(3);
			$one[0].className.should.equal('one');
		});

		it('should accept a single DOM element', function () {
			var oneOne = $dom.find('.one-one')[0];
			var $oneOne = $kids.filter(oneOne);

			$oneOne.should.be.instanceof($);
			$oneOne.length.should.equal(1);
			$oneOne[0].should.equal(oneOne);

			$oneOne.prevObject.should.equal($kids);
		});

		it('should accept array of elements', function () {
			var ones = $dom.find('[class^="one"]').get();

			var $one = $kids.filter(ones);
			$one.should.be.instanceof($);
			$one.length.should.equal(3);
			$one[0].className.should.equal('one');
		});

		it('should accept a NodeList', function () {
			var ones = $dom[0].querySelectorAll('[class^="one"]');

			var $one = $kids.filter(ones);
			$one.should.be.instanceof($);
			$one.length.should.equal(3);
			$one[0].className.should.equal('one');
		});

		it('should accept a jQuery object', function () {
			var $ones = $dom.find('[class^="one"]');

			var $one = $kids.filter($ones);
			$one.should.be.instanceof($);
			$one.length.should.equal(3);
			$one[0].className.should.equal('one');
		});
	});

	describe('$.fn.is()', function () {
		var $dom = $('#dom-traversal');
		var $kids = $dom.find('*');

		it('should accept string input', function () {
			$kids.is('[class^="one"]').should.be.True();
			$kids.is('[class^="zero"]').should.be.False();
		});

		it('should accept function input', function () {
			$kids.is(function () {
				return this.className.indexOf('one') === 0;
			}).should.equal(true);

			$kids.is(function () {
				return false;
			}).should.equal(false);
		});

		it('should accept a single DOM element', function () {
			var oneOne = $dom.find('.one-one')[0];
			$kids.is(oneOne).should.be.True();
		});

		it('should accept array of elements', function () {
			var ones = $dom.find('[class^="one"]').get();
			$kids.is(ones).should.be.True();
		});

		it('should accept a NodeList', function () {
			var ones = $dom[0].querySelectorAll('[class^="one"]');
			$kids.is(ones).should.be.True();
		});

		it('should accept a jQuery object', function () {
			var $ones = $dom.find('[class^="one"]');
			$kids.is($ones).should.be.True();
		});
	});
});