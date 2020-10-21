/**
 * Returns true if a value is null or undefined
 *
 * Obs: null is of type 'object' while undefined is of type 'undefined'
 * And null is only loosely equal to itself and undefined, not to the other falsy values
 * So one could also use v == null, since null is loosely equal to undefined
 *
 * @param value the value to check against null or undefined
 */
export const isNil = (value: any) => value === undefined || value === null;

/**
 * Checks if value is defined and false
 *
 * @param value true if value is defined and equals false
 */
export const isFalse = (value: boolean): boolean => !isNil(value) && !value;
