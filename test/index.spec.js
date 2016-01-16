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

	it('should allow you to add functions to $.fn', function () {
		$.fn.getClassNameTest = function () {
			return this[0].className;
		};

		$('#index p').getClassNameTest().should.equal('one');
	});
});
