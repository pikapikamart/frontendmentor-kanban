import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  SubtasksCount,
  TaskButton,
  TaskHeading, 
  Wrapper } from "./task.styled"


type TaskProps = {
  task: TaskSchema
}

const Task = ({ task }: TaskProps) =>{

  return (
    <Wrapper>
      <TaskHeading>
        <TaskButton>{ task.title }</TaskButton>
      </TaskHeading>
      <SubtasksCount>{ task.subtasks.length } of { task.subtasks.length } subtasks</SubtasksCount>
    </Wrapper>
  )
}


export default Task