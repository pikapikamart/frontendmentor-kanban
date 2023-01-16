import { 
  useEffect, 
  useRef, 
  useState } from "react"
import { FormField } from "./utils/util"


type Fields = {
  [ key: string ] : string
}

type FormSubmitEvent = ( event: React.FormEvent ) => void
type AddFieldRef = ( field: FormField | null ) => void

type UseFormValidation = ( fields: Fields ) => {
  formValid: boolean,
  handleFormSubmit: FormSubmitEvent
}


export const useFormValidation: UseFormValidation = ( fields ) =>{
  const [ formValid, setFormValid ] = useState(false)
  const fieldsRef = useRef<FormField[]>([])

  const handleFormSubmit: FormSubmitEvent = ( event ) =>{
    event.preventDefault()
  }

  const addFieldRef: AddFieldRef = ( field ) =>{
  
  }

  return {
    formValid,
    handleFormSubmit
  }
}