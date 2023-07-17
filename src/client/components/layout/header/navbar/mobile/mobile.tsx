import { useExpansion } from "@/client/lib/hooks"
import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  NavHeading,
  NavExpansion,
  DropdownWrapper, 
  DropdownOverlay} from "../styled"
import Image from "next/image"
import chevron from "@/public/icons/icon-chevron-down.svg"
import { AnimatePresence } from "framer-motion"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"
import { useMobileNavbar } from "./hook"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const Mobile = () => {
  const { currentBoard } = useCurrentBoard()
  const { isExpanded, handleExpansion } = useMobileNavbar()

  return (
    <Wrapper>
      <NavHeading>
        <NavExpansion 
          onClick={handleExpansion}
          aria-expanded={isExpanded}>{ currentBoard?.title?? "Frontendmentor" }
          <Image 
            src={chevron} 
            alt="" 
            aria-hidden="true" />
        </NavExpansion>
      </NavHeading>
      <AnimatePresence>
        { isExpanded && (
          <>
            <DropdownWrapper 
              key="navbar-mobile"
              { ...variantNaming }
              variants={ fadeVariant }>
              <Board />
              <Island />
            </DropdownWrapper>
            <DropdownOverlay 
              key="navbar-overlay"
              { ...variantNaming }
              variants={ fadeVariant } />
          </>
        ) }
      </AnimatePresence>
    </Wrapper>
  )
}


export default Mobile