import { isPlainObject } from '../predicate/isPlainObject.mjs';

function flattenObject(object) {
    return flattenObjectImpl(object);
}
function flattenObjectImpl(object, prefix = '') {
    const result = {};
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = object[key];
        const prefixedKey = prefix ? `${prefix}.${key}` : key;
        if (isPlainObject(value) && Object.keys(value).length > 0) {
            Object.assign(result, flattenObjectImpl(value, prefixedKey));
            continue;
        }
        if (Array.isArray(value)) {
            Object.assign(result, flattenObjectImpl(value, prefixedKey));
            continue;
        }
        result[prefixedKey] = value;
    }
    return result;
}

export { flattenObject };
