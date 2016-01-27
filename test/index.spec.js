'use strict';

describe('jNearly function', function () {
	it('should exist', function () {
		should.exist(window.$);
		$.should.be.a.Function();
	});

	it('should accept string selectors', function () {
		var $p = $('#index p');

		$p.length.should.equal(2);

		$p[0].should.equal(document.querySelector('#index p:first-child'));
		$p[1].should.equal(document.querySelector('#index p:nth-child(2)'));
		should($p[2]).be.Undefined();
	});

	it('should accept arrays and array-like objects', function () {
		var p = document.querySelectorAll('#index p');
		$([...p]).length.should.equal(2);
	});

	it('should accept NodeLists', function () {
		var p = document.querySelectorAll('#index p');
		$(p).length.should.equal(2);
	});

	it('should accept functions', function (done) {
		$(function (arg) {
			arg.should.equal($);

			done();
		});
	});

	it('should accept jNearly objects', function () {
		var $p = $('#index p');
		$($p).should.equal($p);
	});

	it('should accept nodes', function () {
		var p = document.querySelector('#index p:first-child');
		var $p = $(p);

		$(p).length.should.equal(1);
		$p[0].should.equal(p);
		should($p[1]).be.Undefined();
	});

	it('should not freak out when selector not found', function () {
		$('foobar').length.should.equal(0);
		$('foobar').should.be.instanceof($);
	})

	it('should allow you to add functions to $.fn', function () {
		$.fn.getClassNameTest = function () {
			return this[0].className;
		};

		$('#index p').getClassNameTest().should.equal('one');
	});

	it('should have a .splice function so it\'s array-like', function () {
		$('#index p').splice.should.be.a.Function();
	});

	describe('context argument', function () {
		it('should allow element context', function () {
			// First test makes sure the second test will be useful
			$('p').length.should.be.above(2);

			$('p', document.getElementById('index')).length.should.equal(2);
		});

		it('should allow selector context', function () {
			$('p', '#index').length.should.equal(2);
		});

		it('should allow selector context with multiple elements', function () {
			$('p', '#index, #index-two').length.should.equal(3);
		});

		it('should not freak out when selector not found', function () {
			$('p', 'foobar').length.should.equal(0);
			$('p', 'foobar').should.be.instanceof($);
		})
	});

	describe('it should accept HTML strings', function () {
		it('should accept simple strings', function () {
			var html = '<p>test</p>';
			var $p = $(html);
			$p.should.be.instanceof($);
			$p.length.should.equal(1);
			$p[0].outerHTML.should.equal(html);
		});

		it('should accept other documents', function () {
			var iframeDocument = $('#util iframe')[0].contentWindow.document;

			var $p = $('<p>test</p>', iframeDocument);
			$p.length.should.equal(1);
			$p[0].innerHTML.should.equal('test');
			should.equal($p[0].ownerDocument, iframeDocument);
		});

		// Pending: .attr doesn't exist yet
		it('should set specified attributes');
	});
});
