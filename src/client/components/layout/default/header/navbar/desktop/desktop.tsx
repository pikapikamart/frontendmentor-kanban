import { FullWidth } from "@/client/styled/shared/shared"
import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  InnerWrapper, } from "../navbar.styled"
import { 
  HideSidebar, 
  ShowSidebar } from "../navbar.styled"
import { 
  fadeLeftToRightVariant, 
  fadeVariant } from "@/client/motion/variants"
import Image from "next/image"
import hideSidebar from "@/public/icons/hide-sidebar.svg"
import showSidebar from "@/public/icons/show-sidebar.svg"
import { AnimatePresence } from "framer-motion"


type Desktop = {
  isExpanded: boolean,
  handleExpansion: () => void
}

const Desktop = ({ isExpanded, handleExpansion }: Desktop) => {

  return (
    <AnimatePresence initial={false} >
      { isExpanded?
        <ShowSidebar 
          onClick={ handleExpansion }
          aria-expanded={ isExpanded }
          key="show-sidebar"
          { ...fadeVariant }>
            <span className="sr-only">show sidebar</span>
            <Image
              alt=""
              src={ showSidebar }
              aria-hidden="true" />
        </ShowSidebar>
        :
        <Wrapper
          key="sidebar" 
          { ...fadeLeftToRightVariant }>
          <InnerWrapper>
            <Board />
            <FullWidth>
              <Island />
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
            </FullWidth>
          </InnerWrapper>
        </Wrapper>
      }
    </AnimatePresence>
  )
}


export default Desktop