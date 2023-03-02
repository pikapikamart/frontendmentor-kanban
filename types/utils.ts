

export type ModifyType<Original, New> = Omit<Original, keyof New> & New

export type ArrayElement<A> = A extends readonly ( infer T )[]? T : never

// used as callback only
export type AnyFunction = ( ...args: any ) => void