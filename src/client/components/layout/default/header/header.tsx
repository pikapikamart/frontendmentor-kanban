import Image from "next/image"
import { Wrapper } from "./header.styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"


const Header = () => {

  return (
    <Wrapper>
      <Image 
        src={ mobileLogo }
        alt="Frontendmentor Kanban Task" />
    </Wrapper>
  )
}


export default Header