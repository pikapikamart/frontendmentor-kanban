import { FullWidth } from "@/client/styled/shared/shared"
import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  DropdownWrapper,
  NavHeading, } from "../styled"
import { 
  HideSidebar, 
  ShowSidebarButton } from "../styled"
import { 
  fadeLeftToRightVariant, 
  fadeVariant, 
  variantNaming} from "@/client/motion/variants"
import Image from "next/image"
import hideSidebar from "@/public/icons/hide-sidebar.svg"
import showSidebar from "@/public/icons/show-sidebar.svg"
import { AnimatePresence } from "framer-motion"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { useDesktopNavbar } from "./hook"


type Desktop = {
  isExpanded: boolean,
  handleExpansion: () => void
}

const Desktop = ({ isExpanded, handleExpansion }: Desktop) => {
  const { currentBoard } = useCurrentBoard()
  const { initialLoad } = useDesktopNavbar(isExpanded)

  return (
    <>
      <AnimatePresence initial={false} >
        { !isExpanded?
          <ShowSidebarButton 
            onClick={ handleExpansion }
            aria-expanded={ !isExpanded }
            key="show-sidebar"
            { ...variantNaming }
            variants={ fadeVariant }>
              <span className="sr-only">show sidebar</span>
              <Image
                alt=""
                src={ showSidebar }
                aria-hidden="true" />
          </ShowSidebarButton>
          :
          <Wrapper
            key="sidebar" 
            { ...variantNaming }
            animate={ !initialLoad? "initial" : "animate" }
            variants={ fadeLeftToRightVariant }>
            <DropdownWrapper>
              <Board />
              <FullWidth>
                <Island />
                <HideSidebar 
                  onClick={ handleExpansion }
                  aria-expanded={ !isExpanded }>
                  <svg aria-hidden={ true } xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16">
                    <g id="hide" transform="translate(0 -2)">
                      <path id="Shape" d="M13.855,18a.375.375,0,0,1-.307-.16L3.191,3.044a.374.374,0,0,1,.092-.522l.648-.454a.374.374,0,0,1,.522.092L6.188,4.639a10.326,10.326,0,0,1,7.953.985,10.134,10.134,0,0,1,3.652,3.615,1.5,1.5,0,0,1,0,1.523,10.076,10.076,0,0,1-4.486,4.046l1.5,2.148a.375.375,0,0,1-.092.523l-.648.454A.373.373,0,0,1,13.855,18Zm-1.1-11A4.239,4.239,0,0,1,11.6,12.365l.834,1.192A8.686,8.686,0,0,0,16.5,10,8.679,8.679,0,0,0,9.745,5.781,1.75,1.75,0,1,0,12.75,7ZM9,15.75a10.273,10.273,0,0,1-5.14-1.374A10.134,10.134,0,0,1,.208,10.761a1.5,1.5,0,0,1,0-1.523A10.151,10.151,0,0,1,3.4,5.906l.86,1.23A8.635,8.635,0,0,0,1.5,10,8.721,8.721,0,0,0,9,14.25c.089,0,.167,0,.238,0l1,1.43A10.41,10.41,0,0,1,9,15.75Zm-.478-2.527h0A4.252,4.252,0,0,1,4.868,8l3.653,5.218Z" fill="#828fa3"/>
                    </g>
                  </svg>
                  Hide Sidebar
                </HideSidebar>
              </FullWidth>
            </DropdownWrapper>
          </Wrapper>
        }
      </AnimatePresence>
      <NavHeading>{ currentBoard?.title?? "Frontendmentor" }</NavHeading>
    </>
  )
}


export default Desktop