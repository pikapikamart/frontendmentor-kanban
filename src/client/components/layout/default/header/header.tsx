import { 
  LogoWrapper, 
  NextDesktopLogo, 
  NextMobileLogo, 
  Wrapper } from "./header.styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"
import darkDesktopLogo from "@/public/icons/logo-dark.svg"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { MobileNavbar } from "./navbar/mobile"
import { DesktopNavbar } from "./navbar/desktop"


const Header = () => {
  const isMobile = useDetectResponsiveness()

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
      { isMobile && <MobileNavbar /> }
      { !isMobile && <DesktopNavbar /> }
    </Wrapper>
  )
}


export default Header