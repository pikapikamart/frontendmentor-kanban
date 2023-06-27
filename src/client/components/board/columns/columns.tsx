import { 
  NewColumn, 
  Wrapper } from "./columns.styled"
import { Wrapper as ColumnWrapper } from "./column/column.styled"
import Column from "./column/column"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { CreateColumnModal } from "../../collections/modal/column/create"


export const Columns = () =>{
  const { currentBoard } = useCurrentBoard()
  const [ isColumnExpanded, handleColumnExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isColumnExpanded && (
          <ModalDocument exit={ handleColumnExpansion }>
            <CreateColumnModal exit={ handleColumnExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper>
        { currentBoard?.column.map(column => (
          <Column 
            key={ column.id }
            column={ column } />
        )) }
        <ColumnWrapper>
          <NewColumn
            onClick={ handleColumnExpansion }
            aria-expanded={ isColumnExpanded }>
            + New Column
          </NewColumn>
        </ColumnWrapper>
      </Wrapper>
    </>
  )
}


export default Columns