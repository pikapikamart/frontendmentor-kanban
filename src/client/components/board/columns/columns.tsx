import { 
  NewColumn, 
  Wrapper } from "./styled"
import { Wrapper as ColumnWrapper } from "./column/styled"
import Column from "./column/column"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { CreateColumnModal } from "../../collections/modal/column/create"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"
import { isArrayEmpty } from "@/client/lib/utils"


export const Columns = () =>{
  const { currentBoard } = useCurrentBoard()
  const [ isColumnExpanded, handleColumnExpansion ] = useExpansion()

  if ( !currentBoard ) return <></>

  return (
    <>
      <AnimatePresence>
        { isColumnExpanded && (
          <ModalDocument exit={ handleColumnExpansion }>
            <CreateColumnModal exit={ handleColumnExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper
        { ...variantNaming } 
        variants={ fadeVariant }>
        { currentBoard.column.map(column => (
          <Column 
            key={ column.id }
            column={ column } />
        )) }
        { !isArrayEmpty(currentBoard.column) && (
          <ColumnWrapper>
            <NewColumn
              onClick={ handleColumnExpansion }
              aria-expanded={ isColumnExpanded }>
              + New Column
            </NewColumn>
          </ColumnWrapper>
        ) }
      </Wrapper>
    </>
  )
}


export default Columns