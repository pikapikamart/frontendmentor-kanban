import mongoose from "mongoose"


export type ModifyType<Original, New> = Omit<Original, keyof New> & New

export type ArrayElement<A> = A extends readonly ( infer T )[]? T : never

// used as callback only
export type AnyFunction = ( ...args: any ) => void

export type ExitCallback = () => void

export type MongooseDocument<T = mongoose.Types.ObjectId> = mongoose.Document<T> & {
  _id: T
}