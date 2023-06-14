import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { 
  NewColumn, 
  Wrapper } from "./columns.styled"
import { Wrapper as ColumnWrapper } from "./column/column.styled"
import Column from "./column/column"


export const Columns = () =>{
  const { currentBoard } = useCurrentBoard()

  return (
    <Wrapper>
      { currentBoard?.column.map(column => (
        <Column 
          key={ column.id }
          column={ column } />
      )) }
      <ColumnWrapper>
        <NewColumn>+ New Column</NewColumn>
      </ColumnWrapper>
    </Wrapper>
  )
}


export default Columns