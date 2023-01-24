import { 
  useEffect, 
  useRef } from "react"


export const useBaseModalFocus = () =>{
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() =>{
    modalRef.current?.focus()
  }, [])

  return {
    modalRef
  }
}