function DataViewBuilder() {
    this._values = [];
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

function bytes(value, typedArray, bigEndian) {
    var littleEndian = !bigEndian;
    var type = typedArray.name.replace('Array', '');
    var view = getViewOfLength(typedArray.BYTES_PER_ELEMENT);
    view['set' + type](0, value, littleEndian);
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
    this._values.push({value: value, type: Uint8Array});
    return this;
};

DataViewBuilder.prototype.int8 = function int8(value) {
    this._values.push({value: value, type: Int8Array});
    return this;
};

DataViewBuilder.prototype.uint16 = function uint16(value) {
    this._values.push({value: value, type: Uint16Array});
    return this;
};

DataViewBuilder.prototype.int16 = function int16(value) {
    this._values.push({value: value, type: Int16Array});
    return this;
};

DataViewBuilder.prototype.uint32 = function uint32(value) {
    this._values.push({value: value, type: Uint32Array});
    return this;
};

DataViewBuilder.prototype.int32 = function int32(value) {
    this._values.push({value: value, type: Int32Array});
    return this;
};

DataViewBuilder.prototype.float32 = function float32(value) {
    this._values.push({value: value, type: Float32Array});
    return this;
};

DataViewBuilder.prototype.float64 = function float64(value) {
    this._values.push({value: value, type: Float64Array});
    return this;
};

DataViewBuilder.prototype.ascii = function ascii(value) {
    this._values.push({value: value, type: 'ascii'});
    return this;
};

DataViewBuilder.prototype.build = function build(bigEndian) {
    bigEndian = !!bigEndian;
    
    var byteValues = this._values.map(function(v) {
        switch (v.type) {
            case 'ascii':
                return stringBytes(v.value);
            default:
                return bytes(v.value, v.type, bigEndian);
        }
    });

    this._values = [];
    return new DataView(Uint8Array.from(Array.prototype.concat.apply([], byteValues)).buffer);
};

module.exports = DataViewBuilder;
