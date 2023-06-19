import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  SubtasksCount,
  TaskButton,
  TaskTitle, 
  Wrapper } from "./task.styled"
import { isArrayEmpty } from "@/client/lib/utils"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "@/client/components/collections/modal"
import { ShowTaskModal } from "@/client/components/collections/modal/task/show"


type TaskProps = {
  task: TaskSchema
}

const Task = ({ task }: TaskProps) =>{
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument exit={ handleExpansion }>
            <ShowTaskModal
              exit={ handleExpansion }
              task={ task } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper>
        <TaskTitle>
          <TaskButton
            onClick={ handleExpansion }
            aria-expanded={ isExpanded }>{ task.title }</TaskButton>
        </TaskTitle>
        <SubtasksCount>
          { isArrayEmpty(task.subtasks)?
            <>No subtasks</>
            :
            <>{ task.subtasks.reduce((accu, curr) => curr.done? accu + 1 : accu, 0) } of { task.subtasks.length } subtasks</> 
          }
        </SubtasksCount>
      </Wrapper>
    </>
  )
}


export default Task