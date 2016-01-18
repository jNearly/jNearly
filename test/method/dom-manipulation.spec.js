'use strict';

describe('DOM Manipulation', function () {
	describe('$.fn.html()', function () {
		var $html = $('#dom-manipulation .html');

		it('should get html of single element', function () {
			var html = $html.find('p:first-child').html();
			html.should.equal('This is the <strong>worst</strong> thing ever.');
		});

		it('should get html of first element', function () {
			var html = $html.find('p').html();
			html.should.equal('This is the <strong>worst</strong> thing ever.');
		});

		it('should set html of single element', function () {
			$html.find('strong').html('<span>hello!</span>');
			$html.find('strong span')[0].innerHTML.should.equal('hello!');
		});

		it('should set html of multiple elements', function () {
			$html.find('p').html('<strong>STRONG</strong>');
			$html.find('p strong').length.should.equal(2);
		});
	});

	describe('$.fn.text()', function () {
		var $text = $('#dom-manipulation .text');

		it('should get text of single element', function () {
			var text = $text.find('p:first-child').text();
			text.should.equal('This is the worst thing ever.');
		});

		it('should get text of first element', function () {
			var text = $text.find('p').text();
			text.should.equal('This is the worst thing ever.');
		});

		it('should set text of single element', function () {
			$text.find('strong').text('<span>hello!</span>');
			$text.find('strong')[0].innerHTML.should.equal('&lt;span&gt;hello!&lt;/span&gt;');
		});

		it('should set text of multiple elements', function () {
			$text.find('p').text('testing');
			$text.find('strong').length.should.equal(0);
		});
	});

	describe('$.fn.remove()', function () {
		var startLength = $('#dom-manipulation .remove p').length;

		it('should remove by selector', function () {
			$('#dom-manipulation .remove p').remove('.test');
			$('#dom-manipulation .remove p').length.should.equal(startLength - 1)
		});

		it('should remove all', function () {
			$('#dom-manipulation .remove p').remove();
			$('#dom-manipulation .remove p').length.should.equal(0)
		});
	});
});