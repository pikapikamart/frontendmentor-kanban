import { 
  useEffect, 
  useState } from "react"


export const useDesktopNavbar = ( isExpanded: boolean ) =>{
  const [ initialLoad, setInitialLoad ] = useState(false)

  useEffect(() =>{
    if ( !initialLoad && !isExpanded ) {
      setInitialLoad(true)
    }
  }, [ isExpanded ])

  return {
    initialLoad
  }
}