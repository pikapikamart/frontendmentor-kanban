import { BoardColumn } from "@/store"
import { 
  Title, 
  Wrapper } from "./styled"
import { ColumnTask } from "./task"


type ColumnProps = {
  column: BoardColumn
}

const Column = ({ column }: ColumnProps) => {

  return (
    <Wrapper>
      <Title backgroundColor={ column.backgroundColor }>
        { column.title }
        <br />
        <span>({ column.tasks.length })</span>
      </Title>
      <ul>
        { column.tasks.map(task => (
          <ColumnTask
            key={ task.id }
            task={ task } />
        )) }
      </ul>
    </Wrapper>
  )
}


export default Column