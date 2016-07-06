# data-view-builder
Utility for creating [DataViews](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

## Installation
Installation requires [npm](https://npmjs.org)

From the command line:
```
npm install data-view-builder
```

## Usage

### Create an instance
```
var builder = new DataViewBuilder();
```

### Add a value 
```
builder.uint8(123);
```
Likewise for the other methods: `uint16`, `uint32`, `int8`, `int16`, `int32`, `float32`, `float64`.

Each method returns the builder instance to allow for chaining.

### Build
```
builder.build();
```
Returns a [DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) of an [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) containing the values added between the last call to `build` and now.

### Examples
##### DataView containing two `uint8` values
```
var builder = new DataViewBuilder();
builder.uint8(11).uint8(22);
var view = builder.build(); // [0xb, 0x16]
```
##### DataView containing a float32 followed by a int32
```
var builder = new DataViewBuilder();
builder.float32(13.37).int32(9001);
var view = builder.build(); // [ 0x41, 0x55, 0xeb, 0x85, 0x0, 0x0, 0x23, 0x29 ]
```
##### The builder only takes into account values added since the last call to build
```
var builder = new DataViewBuilder();
builder.int8(1).int8(2);
var view1 = builder.build(); // [ 0x01, 0x02 ]
var view2 = builder.build(); // [] Empty!
```
