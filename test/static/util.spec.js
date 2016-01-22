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

	describe('$.extend()', function () {
		it('should shallow copy simple objects', function () {
			var obj = $.extend({ one: 1 }, { two: 2 });
			obj.should.deepEqual({ one: 1, two: 2 });
		});

		it('should shallow copy nested objects', function () {
			var obj = $.extend({ one: 1, foo: { three: 3 } }, { two: 2, foo: { four: 4 } });
			obj.should.deepEqual({ one: 1, two: 2, foo: { four: 4 } });
		});

		it('should deep copy simple objects', function () {
			var obj = $.extend(true, { one: 1 }, { two: 2 });
			obj.should.deepEqual({ one: 1, two: 2 });
		});

		it('should deep copy nested objects', function () {
			var obj = $.extend(true, { one: 1, foo: { three: 3 } }, { two: 2, foo: { four: 4 } });
			obj.should.deepEqual({ one: 1, two: 2, foo: { three: 3, four: 4 } });
		});

		it('should deep copy super nested objects', function () {
			var obj = $.extend(true, { one: 1, foo: { three: 3, bar: { five: 5, six: 6 } } }, { two: 2, foo: { four: 4, bar: { seven: 7 } } });
			obj.should.deepEqual({ one: 1, two: 2, foo: { three: 3, four: 4, bar: { five: 5, six: 6, seven: 7 }}});
		});
	});

	describe('$.merge()', function () {
		it('should merge two arrays', function () {
			$.merge([1, 2, 3], [4, 5, 6]).should.deepEqual([1, 2, 3, 4, 5, 6]);
		});

		it('should merge destructively', function () {
			var one = [1, 2, 3];
			$.merge(one, [4, 5, 6]);

			one.should.deepEqual([1, 2, 3, 4, 5, 6]);
		});

		it('should merge array-like objects', function () {
			var nodes = document.querySelectorAll('#looping p');
			(function () {
				$.merge(arguments, nodes);
			})(1, 2, 3);
		});
	});

	describe('$.inArray()', function () {
		it('should return index if in the array', function () {
			$.inArray('dog', ['cat', 'dog', 'bat']).should.equal(1);
		});

		it('should return index if in the array after specified index', function () {
			$.inArray(1, [1, 2, 3, 4, 1, 2, 3, 4], 2).should.equal(4);
		});

		it('should return -1 if not in the array', function () {
			$.inArray('1', [1, 2, 3]).should.equal(-1);
		});

		it('should return -1 if not after specified index', function () {
			$.inArray(1, [1, 2, 3], 2).should.equal(-1);
		});
	});

	describe('$.isEmptyObject()', function () {
		it('should return true on empty objects', function () {
			$.isEmptyObject({}).should.be.True();
		});

		it('should return false on simple objects', function () {
			$.isEmptyObject({ one: 1 }).should.be.False();
		});

		it('should return false on complex objects', function () {
			function Test(){}
			Test.prototype.one = 1;
			var obj = new Test();

			$.isEmptyObject(obj).should.be.False();
		});
	});

	describe('$.isFunction()', function () {
		it('should return true for functions', function () {
			$.isFunction($).should.be.True();
		});

		it('should return false for non-functions', function () {
			$.isFunction({}).should.be.False();
		});
	});

	describe('$.isWindow()', function () {
		it('should return true for window', function () {
			$.isWindow(window).should.be.True();
		});

		it('should return false when not', function () {
			$.isWindow(document).should.be.False();
		});

		it('should return true for iframe windows', function () {
			var iframe = $('#util iframe')[0];

			$.isWindow(iframe.contentWindow).should.be.True();
		});
	});

	describe('$.isNumeric()', function () {
		it('should return true for simple numbers', function () {
			$.isNumeric(4).should.be.True();
		});

		it('should return true for simple number strings', function () {
			$.isNumeric('4').should.be.True();
		});

		it('should return false for arrays', function () {
			$.isNumeric([1]).should.be.False();
		});

		it('should work for all the examples in jQuery docs', function () {
			$.isNumeric( '-10' ).should.be.True();
			$.isNumeric( 16 ).should.be.True();
			$.isNumeric( 0xFF ).should.be.True();
			$.isNumeric( '0xFF' ).should.be.True();
			$.isNumeric( '8e5' ).should.be.True();
			$.isNumeric( 3.1415 ).should.be.True();
			$.isNumeric( +10 ).should.be.True();
			$.isNumeric( '' ).should.be.False();
			$.isNumeric({}).should.be.False();
			$.isNumeric( NaN ).should.be.False();
			$.isNumeric( null ).should.be.False();
			$.isNumeric( true ).should.be.False();
			$.isNumeric( Infinity ).should.be.False();
			$.isNumeric( undefined ).should.be.False();
		});
	});

	describe('$.parseJSON()', function () {
		it('should parse JSON', function () {
			$.parseJSON('{ "foo": "bar" }').should.deepEqual({ foo: 'bar' });
			$.parseJSON('{ "foo": [ 0, true, "yes" ] }').should.deepEqual({ foo: [0, true, 'yes'] });
		});

		it('should throw an error on invalid JSON', function () {
			(function () {
				$.parseJSON('{ foo: "bar" }');
			}).should.throw();

			(function () {
				$.parseJSON('{ "foo": function () {} }');
			}).should.throw();
		});
	});

	describe('$.isArray()', function () {
		it('should return true when true', function () {
			$.isArray([]).should.be.True();
		});

		it('should return false when false', function () {
			$.isArray('').should.be.False();
		});
	});

	describe('$.makeArray()', function () {
		it('should make arrays from array-like objects', function () {
			var nodes = document.querySelectorAll('#looping p');
			var array = $.makeArray(nodes);

			nodes.length.should.equal(array.length);
			nodes[4].should.equal(array[4]);
		});
	});

	describe('$.now()', function () {
		it('should return some sort of number', function () {
			$.now().should.be.type('number');
			($.now() - Date.now()).should.be.within(0, 100);
		});
	});

	describe('$.trim()', function () {
		it('should trim', function () {
			$.trim('\ta   b   c   ').should.equal('a   b   c');
		});
	});

	describe('$.type()', function () {
		it('should return undefined', function () {
			$.type(undefined).should.equal('undefined');
			$.type().should.equal('undefined');
			$.type(window.notDefined).should.equal('undefined');
		});

		it('should return null', function () {
			$.type(null).should.equal('null');
		});

		it('should return boolean', function () {
			$.type(true).should.equal('boolean');
			$.type(new Boolean()).should.equal('boolean');
		});

		it('should return number', function () {
			$.type(3).should.equal('number');
			$.type(new Number(3)).should.equal('number');
		});

		it('should return string', function () {
			$.type('test').should.equal('string');
			$.type(new String('test')).should.equal('string');
		});

		it('should return function', function () {
			$.type(function(){}).should.equal('function');
			$.type($).should.equal('function');
		});

		it('should return array', function () {
			$.type([]).should.equal('array');
			$.type(new Array()).should.equal('array');
		});

		it('should return date', function () {
			$.type(new Date()).should.equal('date');
		});

		it('should return error', function () {
			$.type(new Error()).should.equal('error');

			try {
				JSON.parse('{')
			} catch (e) {
				$.type(e).should.equal('error');
			}
		});

		it('should return regexp', function () {
			$.type(new RegExp('test')).should.equal('regexp');
			$.type(/test/).should.equal('regexp');
		});
	});

	describe('$.parseHTML()', function () {
		it('should accept simple elements', function () {
			var html = '<p>hello</p>';
			var parsed = $.parseHTML(html);
			parsed.should.be.an.Array();
			parsed.length.should.equal(1);
			parsed[0].outerHTML.should.equal(html);
		});

		it('should accept complex elements', function () {
			var html = '<p>This is a <strong>strong</strong> message</p>';

			var parsed = $.parseHTML(html);
			parsed.should.be.an.Array();
			parsed.length.should.equal(1);
			parsed[0].outerHTML.should.equal(html);
		});

		it('should accept multiple elements', function () {
			var html1 = '<p>test</p>';
			var html2 = '<p>test2</p>';

			var parsed = $.parseHTML(html1 + html2);
			parsed.should.be.an.Array();
			parsed.length.should.equal(2);
			parsed[0].outerHTML.should.equal(html1);
			parsed[1].outerHTML.should.equal(html2);
		});

		it('should accept multiple nodes', function () {
			var html = 'hello, <b>my name is</b> jNearly.'
			var parsed = $.parseHTML(html);
			parsed.should.be.an.Array();
			parsed.length.should.equal(3);

			parsed[0].nodeName.should.equal('#text');
			parsed[0].nodeValue.should.equal('hello, ');
			parsed[1].outerHTML.should.equal('<b>my name is</b>');
			parsed[2].nodeValue.should.equal(' jNearly.');
		});

		it('should work with different documents', function () {
			var iframeDocument = $('#util iframe')[0].contentWindow.document;

			var parsed = $.parseHTML('<p>test</p>', iframeDocument);
			parsed.length.should.equal(1);
			parsed[0].innerHTML.should.equal('test');
			should.equal(parsed[0].ownerDocument, iframeDocument);
		});
	});
});