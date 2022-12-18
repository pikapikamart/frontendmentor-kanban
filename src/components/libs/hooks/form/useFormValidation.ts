import { useState } from "react"


export const useFormValidation = () =>{
  const [ valid, setValid ] = useState(false)

  return {
    valid,
    setValid
  }
}