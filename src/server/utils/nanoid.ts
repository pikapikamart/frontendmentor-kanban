import { customAlphabet } from "nanoid"


export const customNanoid = ( length: number ) =>{
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"

  return customAlphabet(alphabet)(length)
}