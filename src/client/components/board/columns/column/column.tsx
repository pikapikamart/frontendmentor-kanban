import { BoardColumn } from "@/store"
import { 
  Title, 
  Wrapper } from "./column.styled"


type ColumnProps = {
  column: BoardColumn
}

const Column = ({ column }: ColumnProps) => {

  return (
    <Wrapper>
      <Title>
        { column.title }
        <br />
        <span>({ column.tasks.length })</span>
      </Title>
    </Wrapper>
  )
}


export default Column