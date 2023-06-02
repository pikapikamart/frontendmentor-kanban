import { useExpansion } from "@/client/lib/hooks"
import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  NavHeading,
  NavExpansion,
  InnerWrapper, 
  DropdownOverlay} from "../navbar.styled"
import Image from "next/image"
import chevron from "@/public/icons/icon-chevron-down.svg"
import { AnimatePresence } from "framer-motion"
import { fadeVariant, variantNaming } from "@/client/motion/variants"


const Mobile = () => {
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <AnimatePresence>
      <Wrapper>
        <NavHeading>
          <NavExpansion 
            onClick={handleExpansion}
            aria-expanded={isExpanded}>Platform Launch
            <Image 
              src={chevron} 
              alt="" 
              aria-hidden="true" />
          </NavExpansion>
        </NavHeading>
        <AnimatePresence>
          { isExpanded && <>
            <InnerWrapper 
              key="navbar-mobile"
              { ...variantNaming }
              variants={ fadeVariant }>
              <Board />
              <Island />
            </InnerWrapper>
            <DropdownOverlay 
              key="navbar-overlay"
              { ...variantNaming }
              variants={ fadeVariant } />
          </> }
        </AnimatePresence>
      </Wrapper>
    </AnimatePresence>
  )
}


export default Mobile