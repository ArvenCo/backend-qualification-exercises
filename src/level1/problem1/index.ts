export type Value = string | number | boolean | null | undefined |
  Date | Buffer | Map<unknown, unknown> | Set<unknown> |
  Array<Value> | { [key: string]: Value };

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

  }
  
  return value as unknown as T;
}
