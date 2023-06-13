import { MainButton } from "@/client/styled/shared/button"
import { 
  SubHeading, 
  Wrapper } from "./empty.styled"


const Empty = () =>{

  return (
    <Wrapper>
      <SubHeading>This board is empty. Create a new column to get started</SubHeading>
      <MainButton>+ Add New Column</MainButton>
    </Wrapper>
  )
}


export default Empty