import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  SubtasksCount,
  TaskButton,
  TaskTitle, 
  Wrapper } from "./styled"
import { isArrayEmpty } from "@/client/lib/utils"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "@/client/components/collections/modal"
import { ShowTaskModal } from "@/client/components/collections/modal/task/show"
import { useDispatch } from "@/store"


type TaskProps = {
  task: TaskSchema,
  status: string
}

const Task = ({ task, status }: TaskProps) =>{
  const dispatch = useDispatch()
  const [ isExpanded, handleExpansion ] = useExpansion()

  const handleShowTask = () => {
    dispatch({
      type: "SET_CURRENT_TASK",
      payload: {
        ...task,
        status
      }
    })
    handleExpansion()
  }

  return (
    <>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument exit={ handleExpansion }>
            <ShowTaskModal
              exit={ handleExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper>
        <TaskTitle>
          <TaskButton
            onClick={ handleShowTask }
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