import { MainButton } from "@/client/styled/shared/button"
import { 
  SubHeading, 
  Wrapper } from "./styled"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { CreateColumnModal } from "../../collections/modal/column/create"


const Empty = () =>{
  const [ isColumnExpanded, handleColumnExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isColumnExpanded && (
          <ModalDocument
            exit={ handleColumnExpansion }>
              <CreateColumnModal exit={ handleColumnExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper>
        <SubHeading>This board is empty. Create a new column to get started</SubHeading>
        <MainButton 
          aria-expanded={ isColumnExpanded }
          onClick={ handleColumnExpansion } >
          + Add New Column
        </MainButton>
      </Wrapper>
    </>
  )
}


export default Empty