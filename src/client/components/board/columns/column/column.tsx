import { BoardColumn } from "@/store"
import { 
  TasksList,
  Title, 
  Wrapper } from "./column.styled"
import { ColumnTask } from "./task"


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
      <TasksList>
        { column.tasks.map(task => (
          <ColumnTask
            key={ task.id }
            task={ task } />
        )) }
      </TasksList>
    </Wrapper>
  )
}


export default Column