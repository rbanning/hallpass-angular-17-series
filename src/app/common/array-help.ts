
function randomize<T>(arr: T[], count?: number): T[] {
  if (Array.isArray(arr)) {
    const clone = arr.slice();

    let length = clone.length;
    let index = 0;
    while (length > 0) {
      index = Math.floor(Math.random() * length);
      length--;

      //swap
      [ clone[length], clone[index] ] = [ clone[index], clone[length] ];
    }

    //how many items should we return?
    count = Math.max(typeof(count) === 'number' ? count : clone.length, 1);  //must be 1 or greater
    count = Math.min(count, clone.length);  //cannot be greater than array's length
    
    if (count >= clone.length) {
      return clone;
    } else {
      return clone.slice(0, count);
    }
  }
  //else
  return [];
}

function random<T>(arr: T[]): T {
  if (Array.isArray(arr)) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  //else
  throw new Error('arrayHelp.random() expects an array parameter');
}

function unique<T>(arr: T[]): T[] {
  if (Array.isArray(arr)) {
    //only include if it is the first occurrence of the value
    return arr.filter((v: T, index: number) => arr.indexOf(v) === index);  
  }

  //else
  return [];
}

function take<T>(arr?: T[], count?: number): T[] {
  arr = Array.isArray(arr) ? arr : [];
  count = typeof(count) === 'number' ? Math.min(count, arr.length) : arr.length;
  return arr.slice(0, count);
}

function first<T>(arr?: T[]): T | undefined {
  if (arr && arr.length > 0) {
    return arr[0];
  }
  //else
  return undefined;
}

function last<T>(arr?: T[]): T | undefined {
  if (arr && arr.length > 0) {
    return arr[arr?.length - 1];
  }
  //else
  return undefined;
}

export const arrayHelp = {
  randomize, 
  random,
  unique,
  take,
  first, last,
}
