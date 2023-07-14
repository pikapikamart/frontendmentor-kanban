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
import { useEffect, useState } from "react"
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
                    <span className="sr-only">hide sidebar</span>
                  <Image
                    alt=""
                    src={ hideSidebar }
                    aria-hidden="true" />
                  Hide Sidebar
                </HideSidebar>
              </FullWidth>
            </DropdownWrapper>
          </Wrapper>
        }
      </AnimatePresence>
      <NavHeading>{ currentBoard?.title?? "" }</NavHeading>
    </>
  )
}


export default Desktop