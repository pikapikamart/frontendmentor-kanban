import { useEffect } from "react"
import { 
  SpinnerInner, 
  SpinnerWrapper } from "./styled"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"


type SpinnerProps = {
  backgroundColor?: "none",
  position?: "absolute",
  circleColor?: string,
}

const Spinner = ({ 
  position, 
  circleColor,
  backgroundColor 
}: SpinnerProps) =>{

  useEffect(() =>{
    const cancelKeyboard = ( event: KeyboardEvent ) => event.preventDefault()

    document.body.addEventListener("keydown", cancelKeyboard)

    return () => document.body.removeEventListener("keydown", cancelKeyboard)
  }, [])

  return (
    <SpinnerWrapper
      position={ position }
      $backgroundColor={ backgroundColor }
      { ...variantNaming }
      variants={ fadeVariant }>
      <SpinnerInner circleColor={ circleColor }>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerInner>
    </SpinnerWrapper>
  )
}


export default Spinner