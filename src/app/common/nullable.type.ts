import { OptionalOfType } from "./optional-of-type";

export type Nullable<T> = OptionalOfType<T>;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type IsNullish = null | undefined;
