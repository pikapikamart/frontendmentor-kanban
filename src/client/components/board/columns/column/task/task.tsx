import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  SubtasksCount,
  TaskButton,
  TaskTitle, 
  Wrapper } from "./task.styled"
import { isArrayEmpty } from "@/client/lib/utils"


type TaskProps = {
  task: TaskSchema
}

const Task = ({ task }: TaskProps) =>{

  return (
    <Wrapper>
      <TaskTitle>
        <TaskButton>{ task.title }</TaskButton>
      </TaskTitle>
      <SubtasksCount>
        { isArrayEmpty(task.subtasks)?
          <>No subtasks</>
          :
          <>{ task.subtasks.reduce((accu, curr) => curr.done? accu + 1 : accu, 0) } of { task.subtasks.length } subtasks</> 
        }
      </SubtasksCount>
    </Wrapper>
  )
}


export default Task