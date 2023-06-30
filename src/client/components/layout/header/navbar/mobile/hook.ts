import { useExpansion } from "@/client/lib/hooks"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useMobileNavbar = () =>{
  const [ isExpanded, handleExpansion ] = useExpansion()
  const { query } = useRouter()

  useEffect(() =>{

    if ( isExpanded && query.board ) handleExpansion()

  }, [ query ])

  return {
    isExpanded,
    handleExpansion
  }
}