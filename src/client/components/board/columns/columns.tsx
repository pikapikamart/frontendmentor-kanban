import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { 
  NewColumn, 
  Wrapper } from "./columns.styled"
import { Wrapper as ColumnWrapper } from "./column/column.styled"
import Column from "./column/column"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { CreateTaskModal } from "../../collections/modal/task/create"


export const Columns = () =>{
  const { currentBoard } = useCurrentBoard()
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument exit={ handleExpansion }>
            <CreateTaskModal exit={ handleExpansion } />
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
            onClick={ handleExpansion }
            aria-expanded={ isExpanded }>
            + New Column
          </NewColumn>
        </ColumnWrapper>
      </Wrapper>
    </>
  )
}


export default Columns