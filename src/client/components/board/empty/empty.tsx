import { MainButton } from "@/client/styled/shared/button"
import { 
  SubHeading, 
  Wrapper } from "./empty.styled"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { CreateTaskModal } from "../../collections/modal/task/create"


const Empty = () =>{
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument
            exit={ handleExpansion }>
              <CreateTaskModal exit={ handleExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper>
        <SubHeading>This board is empty. Create a new column to get started</SubHeading>
        <MainButton 
          aria-expanded={ isExpanded }
          onClick={ handleExpansion } >
          + Add New Column
        </MainButton>
      </Wrapper>
    </>
  )
}


export default Empty