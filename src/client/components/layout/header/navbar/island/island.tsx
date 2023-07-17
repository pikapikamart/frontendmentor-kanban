import { 
  Input, 
  Wrapper } from "./styled"
import lightModeIcon from "@/public/icons/light.svg"
import darkModeIcon from "@/public/icons/dark.svg"
import Image from "next/image"
import { 
  useDispatch, 
  useTrackedState } from "@/store"


const Island = () =>{
  const dispatch = useDispatch()
  const { darkmode } = useTrackedState()

  const handledarkModeIcon = ( event: React.ChangeEvent<HTMLInputElement> ) => dispatch({ type: "DARKMODE" })

  return (
    <Wrapper>
      <legend className="sr-only">Dark mode</legend>
      <Input
        type="radio"
        id="light"
        name="theme"
        value="light"
        checked={ !darkmode }
        className="sr-only"
        onChange={ handledarkModeIcon } />
      <label htmlFor="light">
        <Image 
          src={ lightModeIcon } 
          alt=""
          aria-hidden="true" />
      </label>
      <Input
        type="radio"
        id="dark"
        name="theme"
        checked={ darkmode }
        value="dark"
        className="sr-only"
        onChange={ handledarkModeIcon } />
      <label htmlFor="dark">
        <Image 
          src={ darkModeIcon } 
          alt=""
          aria-hidden="true" />
      </label>
    </Wrapper>
  )
}


export default Island