function DataViewBuilder() {
    this._current = [];
}

function getViewOfLength(byteLength) {
    var buffer = new ArrayBuffer(byteLength);
    return new DataView(buffer);
}

function getBytesFromView(view) {
    var bytes = [];
    for (var byteIndex = 0; byteIndex < view.byteLength; byteIndex++) {
        bytes.push(view.getUint8(byteIndex));
    }
    return bytes;
}

function bytes(value, typedArray) {
    var type = typedArray.name.replace('Array', '');
    var view = getViewOfLength(typedArray.BYTES_PER_ELEMENT);
    view['set' + type](0, value);
    return getBytesFromView(view);
}

function stringBytes(value) {
    var view = getViewOfLength(value.length);
    for (var i = 0; i < value.length; i++) {
        view.setUint8(i, value.charCodeAt(i));
    }
    return getBytesFromView(view);
}

DataViewBuilder.prototype.uint8 = function uint8(value) {
    this._current = this._current.concat(bytes(value, Uint8Array));
    return this;
};

DataViewBuilder.prototype.int8 = function int8(value) {
    this._current = this._current.concat(bytes(value, Int8Array));
    return this;
};

DataViewBuilder.prototype.uint16 = function uint16(value) {
    this._current = this._current.concat(bytes(value, Uint16Array));
    return this;
};

DataViewBuilder.prototype.int16 = function int16(value) {
    this._current = this._current.concat(bytes(value, Int16Array));
    return this;
};

DataViewBuilder.prototype.uint32 = function uint32(value) {
    this._current = this._current.concat(bytes(value, Uint32Array));
    return this;
};

DataViewBuilder.prototype.int32 = function int32(value) {
    this._current = this._current.concat(bytes(value, Int32Array));
    return this;
};

DataViewBuilder.prototype.float32 = function float32(value) {
    this._current = this._current.concat(bytes(value, Float32Array));
    return this;
};

DataViewBuilder.prototype.float64 = function float64(value) {
    this._current = this._current.concat(bytes(value, Float64Array));
    return this;
};

DataViewBuilder.prototype.ascii = function ascii(value) {
    var x = stringBytes(value);
    this._current = this._current.concat(x);
    return this;
};

DataViewBuilder.prototype.build = function build() {
    var built = new DataView(Int8Array.from(this._current).buffer);
    this._current = [];
    return built;
};

module.exports = DataViewBuilder;
