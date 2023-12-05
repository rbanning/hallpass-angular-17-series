import { Nullable } from "./nullable.type";
import { strHelp } from "./str-help";
import { primitive } from "./primitive";

const TrueStrings: string[] = ['true', 'yes', 'on'];

export const parsers = {
  trueStrings: TrueStrings,

  toBoolean(obj: unknown, defaultValue: Nullable<boolean> = null): Nullable<boolean> {
    let bool = defaultValue;
  
    if (primitive.isBoolean(obj)) { bool = (obj as boolean); }
    else if (primitive.isNumber(obj)) { bool = (obj as number) !== 0; }
    else if (primitive.isString(obj)) { bool = strHelp.stringEquals('true', obj as string, true); }
    
    return bool;
  },

  toBooleanStrict(obj: unknown, defaultValue: boolean = false): boolean {
    let bool = defaultValue;
  
    if (primitive.isBoolean(obj)) { bool = (obj as boolean); }
    else if (primitive.isNumber(obj)) { bool = (obj as number) !== 0; }
    else if (primitive.isString(obj)) { bool = strHelp.stringEquals('true', obj as string, true); }
    
    return bool;
  },

  
  toNumber (obj: unknown, defaultValue: Nullable<number> = null): Nullable<number> {
    let num = defaultValue;
    if (primitive.isNumber(obj)) {
      num = num as number;
    }
    else if (primitive.isString(obj)) {
      num = Number.parseFloat(obj as string);
      num = Number.isNaN(num) ? defaultValue : num;
    }
    else if (primitive.isBoolean(obj)) {
      num = (obj as boolean) ? 1 : 0;
    }
  
    return num;
  },
  
  toInt (obj: unknown, defaultValue: Nullable<number>): Nullable<number> {
    let num = defaultValue;
    if (primitive.isNumber(obj)) {
      num = Math.floor(obj as number);  //chop off any decimal
    }
    else if (primitive.isString(obj)) {
      num = Number.parseInt(obj as string);
      num = Number.isNaN(num) ? defaultValue : num;
    }
    else if (primitive.isBoolean(obj)) {
      num = (obj as boolean) ? 1 : 0;
    }

    return num;
  },

  //alias toNumber
  toFloat (obj: unknown, defaultValue: Nullable<number>): Nullable<number> {
    return this.toNumber(obj, defaultValue); 
  },

  toString (obj: unknown, defaultValue: Nullable<string>): Nullable<string> {
    if (primitive.isNotNullish(obj)) {
      return `${obj}`;
    }

    //else
    return defaultValue;
  },
  toStringStrict (obj: unknown, defaultValue: Nullable<string>): Nullable<string> {
    if (primitive.isString(obj)) {
      return obj as string;
    }
    //else
    return defaultValue;
  },

  //base64
  toBase64(text: unknown): Nullable<string> {
    if (primitive.isNotNullish(text)) {
      if ('btoa' in window) {
        return window.btoa(text as string);
      } else {
        throw new Error("'btoa' (convert to base64) is not available in current context");
      }
    }
    //else
    return null;
  },

  fromBase64(text: unknown): Nullable<string> {
    if (primitive.isNotNullish(text)) {
      if ('atob' in window) {
        return window.atob(text as string);
      } else {
        throw new Error("'atob' (convert from base64) is not available in current context");
      }
    }
    //else
    return null;
  },
}
