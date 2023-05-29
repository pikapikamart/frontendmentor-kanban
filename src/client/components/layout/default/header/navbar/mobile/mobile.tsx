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


const Mobile = () => {
  const [isExpanded, handleExpansion] = useExpansion()

  return (
    <Wrapper>
      <NavHeading>
        <NavExpansion 
          onClick={handleExpansion}
          aria-expanded={isExpanded}>Platform Launch
          <Image src={chevron} alt="" aria-hidden="true" />
        </NavExpansion>
      </NavHeading>
      { isExpanded && <>
        <InnerWrapper>
          <Board />
          <Island />
        </InnerWrapper>
        <DropdownOverlay />
      </> }
    </Wrapper>
  )
}


export default Mobile