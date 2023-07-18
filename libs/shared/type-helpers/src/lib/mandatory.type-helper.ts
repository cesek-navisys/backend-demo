/**
 * Set some of the properties required and keep the rest untouched.
 */
export type Mandatory<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
