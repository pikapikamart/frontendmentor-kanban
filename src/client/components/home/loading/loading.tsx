import Spinner from "../../collections/spinner/spinner"
import { Wrapper } from "./styled"


const Loading = () =>{

  return (
    <Wrapper>
      <Spinner
        backgroundColor="none"
        position="absolute"
        circleColor="#635FC7" />
    </Wrapper>
  )
}


export default Loading