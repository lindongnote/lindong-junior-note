'use strict';

function isPrimitive(value) {
    return value == null || (typeof value !== 'object' && typeof value !== 'function');
}

function isTypedArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function getSymbols(object) {
    return Object.getOwnPropertySymbols(object).filter(symbol => Object.prototype.propertyIsEnumerable.call(object, symbol));
}

function isPlainObject(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    const hasObjectPrototype = proto === null ||
        proto === Object.prototype ||
        Object.getPrototypeOf(proto) === null;
    if (!hasObjectPrototype) {
        return false;
    }
    return Object.prototype.toString.call(value) === '[object Object]';
}

exports.getSymbols = getSymbols;
exports.isPlainObject = isPlainObject;
exports.isPrimitive = isPrimitive;
exports.isTypedArray = isTypedArray;
