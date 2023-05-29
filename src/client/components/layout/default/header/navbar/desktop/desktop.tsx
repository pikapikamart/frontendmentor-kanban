import { Board } from "../board"
import { Island } from "../island"
import { 
  Wrapper,
  InnerWrapper, } from "../navbar.styled"


const Desktop = () => {

  return (
    <Wrapper>
      <InnerWrapper>
          <Board />
          <Island />
        </InnerWrapper>
    </Wrapper>
  )
}


export default Desktop