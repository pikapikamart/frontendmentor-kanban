import { 
  LogoWrapper, 
  NextDesktopLogo, 
  NextMobileLogo, 
  Wrapper } from "./header.styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"
import darkDesktopLogo from "@/public/icons/logo-dark.svg"
import { Navbar } from "./navbar"


const Header = () => {

  return (
    <Wrapper>
      <LogoWrapper>
        <NextMobileLogo
          src={ mobileLogo }
          alt="Frontendmentor Kanban Task" />
        <NextDesktopLogo
          src={ darkDesktopLogo }
          alt="Frontendmentor Kanban Task" />
      </LogoWrapper>
      <Navbar />
    </Wrapper>
  )
}


export default Header