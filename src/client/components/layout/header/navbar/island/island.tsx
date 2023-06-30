import { 
  Input, 
  Wrapper } from "./styled"
import lightMode from "@/public/icons/light.svg"
import darkMode from "@/public/icons/dark.svg"
import Image from "next/image"
import { useDispatch } from "@/store"


const Island = () =>{
  const dispatch = useDispatch()

  const handleDarkmode = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    dispatch({ type: "DARKMODE" })
  }

  return (
    <Wrapper>
      <legend className="sr-only">Dark mode</legend>
      <Input
        type="radio"
        id="light"
        name="theme"
        value="light"
        defaultChecked
        className="sr-only"
        onChange={ handleDarkmode } />
      <label htmlFor="light">
        <Image 
          src={ lightMode } 
          alt=""
          aria-hidden="true" />
      </label>
      <Input
        type="radio"
        id="dark"
        name="theme"
        value="dark"
        className="sr-only"
        onChange={ handleDarkmode } />
      <label htmlFor="dark">
        <Image 
          src={ darkMode } 
          alt=""
          aria-hidden="true" />
      </label>
    </Wrapper>
  )
}


export default Island