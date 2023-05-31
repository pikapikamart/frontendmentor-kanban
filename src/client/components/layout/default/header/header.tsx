import { 
  LogoWrapper, 
  Wrapper } from "./header.styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"
import darkDesktopLogo from "@/public/icons/logo-dark.svg"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { MobileNavbar } from "./navbar/mobile"
import { DesktopNavbar } from "./navbar/desktop"
import { useExpansion } from "@/client/lib/hooks"
import Image from "next/image"


const Header = () => {
  const isMobile = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <Wrapper isExpanded={ isExpanded }>
      <LogoWrapper>
        { isMobile? 
          <Image
            src={ mobileLogo }
            alt="Frontendmentor Kanban Task" /> 
          :
          <Image
            src={ darkDesktopLogo }
            alt="Frontendmentor Kanban Task" /> 
        }
      </LogoWrapper>
      { isMobile?
        <MobileNavbar /> :
        <DesktopNavbar
          isExpanded={ isExpanded }
          handleExpansion={ handleExpansion } />
      }
    </Wrapper>
  )
}


export default Header