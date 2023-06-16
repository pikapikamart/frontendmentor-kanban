import { 
  useEffect, 
  useRef } from "react"


type UseBaseModalFocusProps =  HTMLElement | null


export const useBaseModalFocus = ( focusBackRef?: UseBaseModalFocusProps ) =>{
  const modalRef = useRef<HTMLDivElement | null>(null)
  
  useEffect(() =>{
    modalRef.current?.focus()

    return () => focusBackRef?.focus()
  }, [])

  return {
    modalRef
  }
}