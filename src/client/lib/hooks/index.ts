import { 
  useRef, 
  useState } from "react"


type AnyFocusableELement = HTMLElement & {}
export type RegisterControl = ( element: AnyFocusableELement | null ) => void
type RegisterTrapContainer = ( event: React.KeyboardEvent ) => void

export const useTrapFocus = () =>{
  const firstControl = useRef<AnyFocusableELement | null>(null)
  const lastControl = useRef<AnyFocusableELement | null>(null)

  const registerControl: RegisterControl = ( element ) =>{
    if ( !firstControl.current ) {
      firstControl.current = element
    } else {
      lastControl.current = element
    }
  }

  const registerTrapContainer: RegisterTrapContainer = ( event ) => {

    if ( !firstControl.current || !lastControl.current ) {
      return
    }    

    const currentElement = document.activeElement

    if ( currentElement===firstControl.current && event.shiftKey && event.key==="Tab" ) {
      event.preventDefault()
      lastControl.current.focus()
    } else if ( currentElement===lastControl.current && !event.shiftKey && event.key==="Tab" ) {
      event.preventDefault()
      firstControl.current.focus()
    }
  }

  return [
    registerControl,
    registerTrapContainer
  ] as const
}

export const useExpansion = () =>{
  const [ isExpanded, setIsExpanded ] = useState(false)

  const handleExpansion = () => {
    setIsExpanded(prev => !prev)
  }

  return [ isExpanded, handleExpansion ] as const
}