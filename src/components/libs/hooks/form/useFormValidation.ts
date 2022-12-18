import { useState } from "react"


type Fields = {
  [ key: string ] : string
}

type Options = {
  
}

type UseFormValidation = ( fields: Fields ) => {

}

export const useFormValidation: UseFormValidation = ( fields ) =>{
  const [ formValid, setFormValid ] = useState(false)


  return {
    formValid,
  }
}