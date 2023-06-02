import { useEffect } from "react"
import { 
  SpinnerInner, 
  SpinnerWrapper } from "./spinner.styled"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"


const Spinner = () =>{

  useEffect(() =>{
    const cancelKeyboard = ( event: KeyboardEvent ) => {
      event.preventDefault()
    }

    document.body.addEventListener("keydown", cancelKeyboard)

    return () => document.body.removeEventListener("keydown", cancelKeyboard)
  }, [])

  return (
    <SpinnerWrapper
      { ...variantNaming }
      variants={ fadeVariant }>
      <SpinnerInner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SpinnerInner>
    </SpinnerWrapper>
  )
}


export default Spinner