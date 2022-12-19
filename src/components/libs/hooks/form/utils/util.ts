

export type FormField = HTMLInputElement | HTMLTextAreaElement

export const addFieldErrors = ( field: FormField ) =>{
  field.setAttribute("aria-invalid", "true")
}

export const checkFieldForError = ( field: FormField ) =>{
  
  if ( 
    field.getAttribute("aria-required") !== "true" ||
    field.value ) {
    return false
  }

  return true
}

export const removeFieldErrors = ( field: FormField ) =>{
  field.removeAttribute("aria-invalid")
}