import { 
  LogoWrapper, 
  Wrapper } from "./styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { MobileNavbar } from "./navbar/mobile"
import { DesktopNavbar } from "./navbar/desktop"
import { useExpansion } from "@/client/lib/hooks"
import Image from "next/image"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { HeaderOptions } from "./options"
import { DesktopLogo } from "./logo/desktop"


const Header = () => {
  const { isMobile, hasDetected } = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()
  const { currentBoard } = useCurrentBoard()

  if ( !hasDetected ) {

    return (
      <Wrapper isExpanded={ isExpanded }>
        <LogoWrapper />
      </Wrapper>
    )
  }

  return (
    <Wrapper isExpanded={ isExpanded }>
      <LogoWrapper>
        { isMobile? 
          <Image
            priority={ true }
            src={ mobileLogo }
            alt="Frontendmentor Kanban Task" /> 
          :
          <DesktopLogo />
        }
      </LogoWrapper>
      { isMobile?
        <MobileNavbar /> :
        <DesktopNavbar
          isExpanded={ !isExpanded }
          handleExpansion={ handleExpansion } />
      }
      { currentBoard && <HeaderOptions /> }
    </Wrapper>
  )
}


export default Header