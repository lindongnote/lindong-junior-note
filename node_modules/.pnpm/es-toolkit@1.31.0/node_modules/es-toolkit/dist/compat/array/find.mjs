import { property } from '../object/property.mjs';
import { matches } from '../predicate/matches.mjs';
import { matchesProperty } from '../predicate/matchesProperty.mjs';

function find(source, doesMatch) {
    if (!source) {
        return undefined;
    }
    const values = Array.isArray(source) ? source : Object.values(source);
    switch (typeof doesMatch) {
        case 'function': {
            if (!Array.isArray(source)) {
                const keys = Object.keys(source);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const value = source[key];
                    if (doesMatch(value, key, source)) {
                        return value;
                    }
                }
                return undefined;
            }
            return values.find(doesMatch);
        }
        case 'object': {
            if (Array.isArray(doesMatch) && doesMatch.length === 2) {
                const key = doesMatch[0];
                const value = doesMatch[1];
                return values.find(matchesProperty(key, value));
            }
            else {
                return values.find(matches(doesMatch));
            }
        }
        case 'symbol':
        case 'number':
        case 'string': {
            return values.find(property(doesMatch));
        }
    }
}

export { find };
