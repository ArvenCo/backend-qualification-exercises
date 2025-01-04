export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

function isObjectOfValues(value: unknown): value is { [key: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isArrayOfValues(value: unknown): value is Array<Value> {
  return Array.isArray(value);
}

/**
 * Transforms JavaScript scalars and objects into JSON
 * compatible objects.
 */
export function serialize(value: Value): unknown {
  /**
   * insert your code here
   */


  if (value instanceof Buffer){
    return {
      __t: 'Buffer',
      __v: Array.from(value)
    }
  }

  if (value instanceof Date){
    return {
      __t: 'Date',
      __v: value.getTime()
    }
  }
  
  if (value instanceof Set){
    return {
      __t: 'Set',
      __v: Array.from(value)
    }
  }

  if (value instanceof Map){
    return {
      __t: 'Map',
      __v: Array.from(value)
    }
  }

  if (isObjectOfValues(value)){
    const obj: { [key: string]: unknown } = {};
    for (const key in value) {
      obj[key] = serialize(value[key]);
    }
    return obj;
  }

  if (isArrayOfValues(value)){
    return value.map(serialize);
  }
  
  
  return value;
}

/**
 * Transforms JSON compatible scalars and objects into JavaScript
 * scalar and objects.
 */
export function deserialize<T = unknown>(value: unknown): T {
  /**
   * insert your code here
   */

  if (typeof value === 'object' && value !== null){
    const { __t, __v } = value as { __t: string, __v: unknown };
    if (__t === 'Buffer'){
      return Buffer.from(__v as number[]) as unknown as T;
    }

    if (__t === 'Date'){
      return new Date(__v as number) as unknown as T;
    }

    if (__t === 'Set'){
      return new Set(__v as unknown[]) as unknown as T;
    }

    if (__t === 'Map'){
      return new Map(__v as [unknown, unknown][]) as unknown as T;
    }

    if (isObjectOfValues(value)){
      const obj: { [key: string]: unknown } = {};
      for (const key in value) {
        obj[key] = deserialize(value[key]);
      }
      return obj as unknown as T;
    }
  
    if (isArrayOfValues(value)){
      return value.map(deserialize) as unknown as T;
    }

  }
  
  return value as unknown as T;
}
