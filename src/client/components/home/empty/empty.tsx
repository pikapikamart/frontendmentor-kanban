import { MainButton } from "@/client/styled/shared/button"
import { 
  Wrapper,
  SubHeading } from "../styled"
import { useExpansion } from "@/client/lib/hooks"


const Empty = () =>{
  const [ createExpanded, handleCreateExpansion ] = useExpansion()

  return (
    <Wrapper>
      <SubHeading as="h1">Seems you don't have a board. Create now to start creating your tasks.</SubHeading>
      <MainButton 
        aria-expanded={ createExpanded }
        onClick={ handleCreateExpansion } >Create new board
      </MainButton>
    </Wrapper>
  )
}


export default Empty