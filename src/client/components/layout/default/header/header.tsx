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
import { NavHeading } from "./navbar/navbar.styled"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { AddTask } from "./options/task"


const Header = () => {
  const { isMobile, hasDetected } = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()
  const { currentBoard } = useCurrentBoard()

  if ( !hasDetected ) return (
    <Wrapper isExpanded={ isExpanded }>
      <LogoWrapper />
    </Wrapper>
  )

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
        <>
          <DesktopNavbar
            isExpanded={ isExpanded }
            handleExpansion={ handleExpansion } />
          <NavHeading>{ currentBoard }</NavHeading>
        </>
      }
      { !!currentBoard && (
        <>

          <AddTask />
        </>
      ) }
    </Wrapper>
  )
}


export default Header