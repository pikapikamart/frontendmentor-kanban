import { 
  LogoWrapper, 
  NextDesktopLogo, 
  NextMobileLogo, 
  HideSidebar, 
  Wrapper, 
  ShowSidebar} from "./header.styled"
import mobileLogo from "@/public/icons/logo-mobile.svg"
import darkDesktopLogo from "@/public/icons/logo-dark.svg"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { MobileNavbar } from "./navbar/mobile"
import { DesktopNavbar } from "./navbar/desktop"
import { useExpansion } from "@/client/lib/hooks"
import Image from "next/image"
import hideSidebar from "@/public/icons/hide-sidebar.svg"
import showSidebar from "@/public/icons/show-sidebar.svg"


const Header = () => {
  const isMobile = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <Wrapper isExpanded={ isExpanded }>
      <LogoWrapper>
        <NextMobileLogo
          src={ mobileLogo }
          alt="Frontendmentor Kanban Task" />
        <NextDesktopLogo
          src={ darkDesktopLogo }
          alt="Frontendmentor Kanban Task" />
      </LogoWrapper>
      { isMobile && <MobileNavbar /> }
      { !isMobile && <>
        { isExpanded && (
          <ShowSidebar 
            onClick={ handleExpansion }
            aria-expanded={ isExpanded }>
            <span className="sr-only">show sidebar</span>
            <Image
              alt=""
              src={ showSidebar }
              aria-hidden="true" />
          </ShowSidebar>
        ) }
        { !isExpanded && (
          <DesktopNavbar>
            <HideSidebar 
              onClick={ handleExpansion }
              aria-expanded={ isExpanded }>
                <span className="sr-only">hide sidebar</span>
              <Image
                alt=""
                src={ hideSidebar }
                aria-hidden="true" />
              Hide Sidebar
            </HideSidebar>
          </DesktopNavbar>
        ) }
      </> }
    </Wrapper>
  )
}


export default Header