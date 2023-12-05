import { IsNullish } from "./nullable.type";

export type TypeOfName = 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'object' | 'function' | 'undefined';

const isNullish = (obj: unknown) => obj === null || obj === undefined || typeof(obj) === 'undefined';

export const primitive = {
  isNotNullish: (obj: unknown) => !isNullish(obj),
  isNullish: (obj: unknown): obj is IsNullish => isNullish(obj),
  
  isNumber: (obj: unknown): obj is number => Number.isFinite(obj),
  isInteger: (obj: unknown): obj is number => Number.isInteger(obj),

  isBoolean: (obj: unknown): obj is boolean => typeof(obj) === 'boolean',
  isString: (obj: unknown): obj is string => typeof(obj) === 'string',

  isArray: (obj: unknown) => Array.isArray(obj),
  isArrayOfType: <T>(obj: unknown): obj is T[] => Array.isArray(obj),
  
}


//NOTE: TypeScript cannot use arrow functions for assertions
//      so the assertions are defined here

function assertNotNull<T>(obj: unknown, message?: string): asserts obj is NonNullable<T> {
  if (isNullish(obj)) {
    throw Error(message || "Value was nullish");
  }
}

function assertIsArray<T>(obj: unknown, message?: string): asserts obj is T[] {
  if (!Array.isArray(obj)) {
    throw Error(message || "Value was not an array");
  }
}

//NOTE: "primitive" below needs to have explicit type (to work with assertions)
export type PrimitiveAssertionsType = {
  assertNotNull: typeof assertNotNull,
  assertIsArray: typeof assertIsArray,
};
export const primitiveAssertions: PrimitiveAssertionsType = {
  assertNotNull,
  assertIsArray,
}
