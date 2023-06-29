import { 
  Four04Heading, 
  Four04Information, 
  Four04Wrapper } from "./404.styled"

type FourOhFourProps = {
  children: React.ReactNode
}

const FourohFour = ({ children }: FourOhFourProps) =>{

  return (
    <Four04Wrapper>
      <Four04Heading>
        404
        <span>Sorry! Page not found!</span>
      </Four04Heading>
      <Four04Information>{ children }</Four04Information>
    </Four04Wrapper>
  )
}


export default FourohFour