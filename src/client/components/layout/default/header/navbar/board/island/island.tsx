import { 
  Input, 
  Wrapper } from "./island.styled"
import lightMode from "@/public/icons/light.svg"
import darkMode from "@/public/icons/dark.svg"
import Image from "next/image"


const Island = () =>{

  return (
    <Wrapper>
      <legend className="sr-only">Dark mode</legend>
      <Input
        type="radio"
        id="light"
        name="darkmode"
        defaultChecked
        className="sr-only" />
      <label htmlFor="light">
        <Image 
          src={ lightMode } 
          alt=""
          aria-hidden="true" />
      </label>
      <Input
        type="radio"
        id="dark"
        name="darkmode"
        className="sr-only" />
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