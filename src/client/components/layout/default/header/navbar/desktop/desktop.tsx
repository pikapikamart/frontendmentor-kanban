import { FullWidth } from "@/client/styled/shared/shared"
import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  InnerWrapper, } from "../navbar.styled"


type Desktop = {
  children: React.ReactNode
}

const Desktop = ({ children }: Desktop) => {

  return (
    <Wrapper>
      <InnerWrapper>
        <Board />
        <FullWidth>
          <Island />
          { children }
        </FullWidth>
      </InnerWrapper>
    </Wrapper>
  )
}


export default Desktop