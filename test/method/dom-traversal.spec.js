'use strict';

describe('DOM Traversal', function () {
	var $dom = $('#dom-traversal');
	var $domKids = $('#dom-traversal > div');

	describe('$.fn.find()', function () {
		it('should find children of single elements', function () {
			$dom.find('div').length.should.equal(8);
		});

		it('should find children of multiple elements', function () {
			$domKids.find('div').length.should.equal(6);
		});

		it('should not return duplicate elements', function () {
			$('#dom-traversal, #dom-traversal > div').find('div').length.should.equal(8);
		});
	});

	describe('$.fn.children()', function () {
		it('should find direct children of single elements', function () {
			$dom.children().length.should.equal(2);
		});

		it('should find direct children of single elements with selector', function () {
			$dom.children('.one').length.should.equal(1);
			$dom.children('.one-one').length.should.equal(0);
		});

		it('should find direct children of multiple elements', function () {
			$domKids.children().length.should.equal(4);
		});

		it('should find direct children of multiple elements with selector', function () {
			$domKids.children('[class$="-one"]').length.should.equal(2);
		});
	});

	describe('$.fn.next()', function () {
		it('should find next element of single elements', function () {
			var $two = $('#dom-traversal .one').next();
			$two.length.should.equal(1);
			$two[0].should.equal($('#dom-traversal .two')[0]);
		});

		it('should find next element of single elements with selector', function () {
			var $two = $('#dom-traversal .one').next('.two');
			$two.length.should.equal(1);
			$two[0].should.equal($('#dom-traversal .two')[0]);

			var $three = $('#dom-traversal .one').next('.three');
			$three.length.should.equal(0);
		});

		it('should find next elements of multiple elements', function () {
			var $ones = $('#dom-traversal > div > [class$="-one"]');
			$ones.next().length.should.equal(2);
		});

		it('should find next elements of multiple with selector', function () {
			var $ones = $('#dom-traversal > div > [class$="-one"]');

			$ones.next('[class$="-two"]').length.should.equal(2);
			$ones.next('.two-two').length.should.equal(1);
		});
	});

	describe('$.fn.previous()', function () {
		it('should find previous element of single elements', function () {
			var $one = $('#dom-traversal .two').previous();
			$one.length.should.equal(1);
			$one[0].should.equal($('#dom-traversal .one')[0]);
		});

		it('should find previous element of single elements with selector', function () {
			var $one = $('#dom-traversal .two').previous('.one');
			$one.length.should.equal(1);
			$one[0].should.equal($('#dom-traversal .one')[0]);

			var $zero = $('#dom-traversal .two').previous('.zero');
			$zero.length.should.equal(0);
		});

		it('should find previous elements of multiple elements', function () {
			var $twos = $('#dom-traversal > div > [class$="-two"]');
			$twos.previous().length.should.equal(2);
		});

		it('should find previous elements of multiple with selector', function () {
			var $twos = $('#dom-traversal > div > [class$="-two"]');

			$twos.previous('[class$="-one"]').length.should.equal(2);
			$twos.previous('.one-one').length.should.equal(1);
		});
	});

	describe('$.fn.parent()', function () {
		it('should find parent element of single elements', function () {
			var $parent = $('#dom-traversal .one').parent();
			$parent.length.should.equal(1);
			$parent[0].should.equal($('#dom-traversal')[0]);
		});

		it('should find parent element of single elements with selector', function () {
			var $parent = $('#dom-traversal .one').parent('#dom-traversal');
			$parent.length.should.equal(1);
			$parent[0].should.equal($('#dom-traversal')[0]);

			var $noDiv = $('#dom-traversal .one').parent('#data');
			$noDiv.length.should.equal(0);
		});

		it('should find parent elements of multiple elements', function () {
			var $parents = $('#dom-traversal .one-one, #dom-traversal .two-one').parent();
			$parents.length.should.equal(2);
		});

		it('should remove duplicates', function () {
			var $parents = $('#dom-traversal .one, #dom-traversal .two').parent();
			$parents.length.should.equal(1);
		});

		it('should find previous elements of multiple with selector', function () {
			var $twos = $('#dom-traversal .one-one, #dom-traversal .two-one');

			$twos.parent('[class]').length.should.equal(2);
			$twos.parent('.one').length.should.equal(1);
		});
	});

	describe('$.fn.parents()', function () {
		var $oneOne = $('.one-one');
		var $oneOneTwoTwo = $('.one-one, .two-two');

		it('should get all parents of a single element', function () {
			$oneOne.parents().length.should.equal(5);
		});

		it('should get all matching parents of a single element', function () {
			$oneOne.parents('div').length.should.equal(3);
			$oneOne.parents('body').length.should.equal(1);
		});

		it('should get all parents of multiple elements', function () {
			$oneOneTwoTwo.parents().length.should.equal(6);
		});

		it('should get all matching parents of multiple elements', function () {
			$oneOneTwoTwo.parents('div').length.should.equal(4);
			$oneOneTwoTwo.parents('body').length.should.equal(1);
		});
	});

	describe('$.fn.closest()', function () {
		var $oneOne = $('.one-one');
		var $oneOneTwoTwo = $('.one-one, .two-two');

		it('should return closest parent of single element', function () {
			var $one = $oneOne.closest('.one');
			$one.length.should.equal(1);
			$one[0].should.equal($('#dom-traversal .one')[0]);
		});

		it('should return closest parents of multiple elements', function () {
			$oneOneTwoTwo.closest('.two').length.should.equal(1);
			$oneOneTwoTwo.closest('.one, .two').length.should.equal(2);
		});

		it('should return itself if matching', function () {
			$oneOne.closest('div')[0].should.equal($oneOne[0]);
		});

		it('should not freak out when there is no match', function () {
			$oneOne.closest('.doesnt-exist').length.should.equal(0);
		});
	});

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

	describe('$.fn.end', function () {
		it('should work', function () {
			$dom.find('div').end().should.equal($dom);
			$domKids.find('div').find('div').end().end().should.equal($domKids);
		});

		it('should return $(document) if nothing else', function () {
			$dom.end()[0].should.equal(document);
		});
	});
});