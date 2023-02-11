import { 
  useEffect, 
  useRef } from "react"


export const useBaseModalFocus = ( exit: () => void ) =>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    modalRef.current?.focus()

    return () => exit()
  }, [])

  return {
    modalRef
  }
}