'use strict';

const isPlainObject = require('./isPlainObject-octpoD.js');
const noop = require('./noop-2IwLUk.js');

function isArrayBuffer(value) {
    return value instanceof ArrayBuffer;
}

function isBlob(x) {
    if (typeof Blob === 'undefined') {
        return false;
    }
    return x instanceof Blob;
}

function isBuffer(x) {
    return typeof Buffer !== 'undefined' && Buffer.isBuffer(x);
}

function isDate(value) {
    return value instanceof Date;
}

function getTag(value) {
    if (value == null) {
        return value === undefined ? '[object Undefined]' : '[object Null]';
    }
    return Object.prototype.toString.call(value);
}

const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const numberTag = '[object Number]';
const booleanTag = '[object Boolean]';
const argumentsTag = '[object Arguments]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const functionTag = '[object Function]';
const arrayBufferTag = '[object ArrayBuffer]';
const objectTag = '[object Object]';
const errorTag = '[object Error]';
const dataViewTag = '[object DataView]';
const uint8ArrayTag = '[object Uint8Array]';
const uint8ClampedArrayTag = '[object Uint8ClampedArray]';
const uint16ArrayTag = '[object Uint16Array]';
const uint32ArrayTag = '[object Uint32Array]';
const bigUint64ArrayTag = '[object BigUint64Array]';
const int8ArrayTag = '[object Int8Array]';
const int16ArrayTag = '[object Int16Array]';
const int32ArrayTag = '[object Int32Array]';
const bigInt64ArrayTag = '[object BigInt64Array]';
const float32ArrayTag = '[object Float32Array]';
const float64ArrayTag = '[object Float64Array]';

function eq(value, other) {
    return value === other || (Number.isNaN(value) && Number.isNaN(other));
}

function isEqualWith(a, b, areValuesEqual) {
    return isEqualWithImpl(a, b, undefined, undefined, undefined, undefined, areValuesEqual);
}
function isEqualWithImpl(a, b, property, aParent, bParent, stack, areValuesEqual) {
    const result = areValuesEqual(a, b, property, aParent, bParent, stack);
    if (result !== undefined) {
        return result;
    }
    if (typeof a === typeof b) {
        switch (typeof a) {
            case 'bigint':
            case 'string':
            case 'boolean':
            case 'symbol':
            case 'undefined': {
                return a === b;
            }
            case 'number': {
                return a === b || Object.is(a, b);
            }
            case 'function': {
                return a === b;
            }
            case 'object': {
                return areObjectsEqual(a, b, stack, areValuesEqual);
            }
        }
    }
    return areObjectsEqual(a, b, stack, areValuesEqual);
}
function areObjectsEqual(a, b, stack, areValuesEqual) {
    if (Object.is(a, b)) {
        return true;
    }
    let aTag = getTag(a);
    let bTag = getTag(b);
    if (aTag === argumentsTag) {
        aTag = objectTag;
    }
    if (bTag === argumentsTag) {
        bTag = objectTag;
    }
    if (aTag !== bTag) {
        return false;
    }
    switch (aTag) {
        case stringTag:
            return a.toString() === b.toString();
        case numberTag: {
            const x = a.valueOf();
            const y = b.valueOf();
            return eq(x, y);
        }
        case booleanTag:
        case dateTag:
        case symbolTag:
            return Object.is(a.valueOf(), b.valueOf());
        case regexpTag: {
            return a.source === b.source && a.flags === b.flags;
        }
        case functionTag: {
            return a === b;
        }
    }
    stack = stack ?? new Map();
    const aStack = stack.get(a);
    const bStack = stack.get(b);
    if (aStack != null && bStack != null) {
        return aStack === b;
    }
    stack.set(a, b);
    stack.set(b, a);
    try {
        switch (aTag) {
            case mapTag: {
                if (a.size !== b.size) {
                    return false;
                }
                for (const [key, value] of a.entries()) {
                    if (!b.has(key) || !isEqualWithImpl(value, b.get(key), key, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            case setTag: {
                if (a.size !== b.size) {
                    return false;
                }
                const aValues = Array.from(a.values());
                const bValues = Array.from(b.values());
                for (let i = 0; i < aValues.length; i++) {
                    const aValue = aValues[i];
                    const index = bValues.findIndex(bValue => {
                        return isEqualWithImpl(aValue, bValue, undefined, a, b, stack, areValuesEqual);
                    });
                    if (index === -1) {
                        return false;
                    }
                    bValues.splice(index, 1);
                }
                return true;
            }
            case arrayTag:
            case uint8ArrayTag:
            case uint8ClampedArrayTag:
            case uint16ArrayTag:
            case uint32ArrayTag:
            case bigUint64ArrayTag:
            case int8ArrayTag:
            case int16ArrayTag:
            case int32ArrayTag:
            case bigInt64ArrayTag:
            case float32ArrayTag:
            case float64ArrayTag: {
                if (typeof Buffer !== 'undefined' && Buffer.isBuffer(a) !== Buffer.isBuffer(b)) {
                    return false;
                }
                if (a.length !== b.length) {
                    return false;
                }
                for (let i = 0; i < a.length; i++) {
                    if (!isEqualWithImpl(a[i], b[i], i, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            case arrayBufferTag: {
                if (a.byteLength !== b.byteLength) {
                    return false;
                }
                return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
            }
            case dataViewTag: {
                if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) {
                    return false;
                }
                return areObjectsEqual(new Uint8Array(a), new Uint8Array(b), stack, areValuesEqual);
            }
            case errorTag: {
                return a.name === b.name && a.message === b.message;
            }
            case objectTag: {
                const areEqualInstances = areObjectsEqual(a.constructor, b.constructor, stack, areValuesEqual) ||
                    (isPlainObject.isPlainObject(a) && isPlainObject.isPlainObject(b));
                if (!areEqualInstances) {
                    return false;
                }
                const aKeys = [...Object.keys(a), ...isPlainObject.getSymbols(a)];
                const bKeys = [...Object.keys(b), ...isPlainObject.getSymbols(b)];
                if (aKeys.length !== bKeys.length) {
                    return false;
                }
                for (let i = 0; i < aKeys.length; i++) {
                    const propKey = aKeys[i];
                    const aProp = a[propKey];
                    if (!Object.hasOwn(b, propKey)) {
                        return false;
                    }
                    const bProp = b[propKey];
                    if (!isEqualWithImpl(aProp, bProp, propKey, a, b, stack, areValuesEqual)) {
                        return false;
                    }
                }
                return true;
            }
            default: {
                return false;
            }
        }
    }
    finally {
        stack.delete(a);
        stack.delete(b);
    }
}

function isEqual(a, b) {
    return isEqualWith(a, b, noop.noop);
}

function isFile(x) {
    if (typeof File === 'undefined') {
        return false;
    }
    return isBlob(x) && x instanceof File;
}

function isFunction(value) {
    return typeof value === 'function';
}

function isJSONValue(value) {
    switch (typeof value) {
        case 'object': {
            return value === null || isJSONArray(value) || isJSONObject(value);
        }
        case 'string':
        case 'number':
        case 'boolean': {
            return true;
        }
        default: {
            return false;
        }
    }
}
function isJSONArray(value) {
    if (!Array.isArray(value)) {
        return false;
    }
    return value.every(item => isJSONValue(item));
}
function isJSONObject(obj) {
    if (!isPlainObject.isPlainObject(obj)) {
        return false;
    }
    const keys = Reflect.ownKeys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        if (typeof key !== 'string') {
            return false;
        }
        if (!isJSONValue(value)) {
            return false;
        }
    }
    return true;
}

function isLength(value) {
    return Number.isSafeInteger(value) && value >= 0;
}

function isMap(value) {
    return value instanceof Map;
}

function isNil(x) {
    return x == null;
}

function isNotNil(x) {
    return x != null;
}

function isNull(x) {
    return x === null;
}

function isRegExp(value) {
    return value instanceof RegExp;
}

function isSet(value) {
    return value instanceof Set;
}

function isUndefined(x) {
    return x === undefined;
}

function isWeakMap(value) {
    return value instanceof WeakMap;
}

function isWeakSet(value) {
    return value instanceof WeakSet;
}

exports.argumentsTag = argumentsTag;
exports.booleanTag = booleanTag;
exports.eq = eq;
exports.getTag = getTag;
exports.isArrayBuffer = isArrayBuffer;
exports.isBlob = isBlob;
exports.isBuffer = isBuffer;
exports.isDate = isDate;
exports.isEqual = isEqual;
exports.isEqualWith = isEqualWith;
exports.isFile = isFile;
exports.isFunction = isFunction;
exports.isJSONArray = isJSONArray;
exports.isJSONObject = isJSONObject;
exports.isJSONValue = isJSONValue;
exports.isLength = isLength;
exports.isMap = isMap;
exports.isNil = isNil;
exports.isNotNil = isNotNil;
exports.isNull = isNull;
exports.isRegExp = isRegExp;
exports.isSet = isSet;
exports.isUndefined = isUndefined;
exports.isWeakMap = isWeakMap;
exports.isWeakSet = isWeakSet;
exports.numberTag = numberTag;
exports.stringTag = stringTag;
