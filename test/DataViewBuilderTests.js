var assert = require('chai').assert;
var DataViewBuilder = require('..');

describe('DataViewBuilder', function() {
    
    [91, 0, 254].forEach(function(input) {
        it('adds uint8 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.uint8(input);
            var view = builder.build();
            assert.equal(view.getUint8(0), input);
        });
    });

    [123, 0, 65535].forEach(function(input) {
        it('adds unint16 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.uint16(input);
            var view = builder.build();
            assert.equal(view.getUint16(0), input);
        });
    });

    [9001, 0, 4294967295].forEach(function(input) {
        it('adds uint32 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.uint32(input);
            var view = builder.build();
            assert.equal(view.getUint32(0), input);
        });
    });

    [-128, 0, 127].forEach(function(input) {
        it('adds int8 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.int8(input);
            var view = builder.build();
            assert.equal(view.getInt8(0), input);
        });
    });

    [444, 0, 32767].forEach(function(input) {
        it('adds int16 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.int16(input);
            var view = builder.build();
            assert.equal(view.getInt16(0), input);
        });
    });

    [3453, 0, 2147483647].forEach(function(input) {
        it('adds int32 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.int32(input);
            var view = builder.build();
            assert.equal(view.getInt32(0), input);
        });
    });

    [1234567,-9999999, 9999999].forEach(function(input) {
        it('adds float32 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.float32(input);
            var view = builder.build();
            assert.equal(view.getFloat32(0), input);
        });
    });

    [0, Number.MAX_VALUE, Number.MIN_VALUE].forEach(function(input) {
        it('adds float64 equal to ' + input + ' to result', function() {
            var builder = new DataViewBuilder();
            builder.float64(input);
            var view = builder.build();
            assert.equal(view.getFloat64(0), input);
        });
    });

    ['Test', 'Hello, world!'].forEach(function(input) {
        it('adds ASCII string equal to "' + input + '" to result', function() {
            var builder = new DataViewBuilder();
            builder.asciiString(input);
            var view = builder.build();
            var actualString = '';
            for (var i = 0; i < input.length; i++) {
                actualString += String.fromCharCode(view.getUint8(i));
            }
            assert.equal(actualString, input);
        });
    });

    it('can chain all methods', function() {
        var builder = new DataViewBuilder();
        var view = builder.uint8(1)
            .uint16(2)
            .uint32(3)
            .int8(4)
            .int16(5)
            .int32(6)
            .float32(7)
            .float64(8)
            .build();

        var actual = [
            view.getUint8(0),
            view.getUint16(1),
            view.getUint32(3),
            view.getInt8(7),
            view.getInt16(8),
            view.getInt32(10),
            view.getFloat32(14),
            view.getFloat64(18)
        ];

        assert.deepEqual(actual, [1,2,3,4,5,6,7,8]);
    });

    it('clears previous values on call to build', function() {
        var builder = new DataViewBuilder();

        builder.int32(123).build();
        var view = builder.build();

        assert.equal(view.byteLength, 0);
    });
});
