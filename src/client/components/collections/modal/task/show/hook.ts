import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { trpc } from "@/client/lib/trpc"
import { isArrayEmpty } from "@/client/lib/utils"
import { 
  Subtask, 
  useDispatch, 
  useTrackedState} from "@/store"
import { useSelectStore } from "@ariakit/react"
import { useEffect } from "react"
import { ExitCallback } from "types/utils"
import { useImmerReducer } from "use-immer"


type TaskPartialChanges = {
  newStatus: string,
  subtasks: Subtask[]
}

type Action = 
  { type: "SET_NEW_STATUS", payload: string } |
  { type: "ADD_SUBTASK_CHANGE", payload: Subtask }

const reducer = ( draft: TaskPartialChanges, action: Action ) =>{

  switch(action.type) {
    case "SET_NEW_STATUS":
      draft.newStatus = action.payload

      return draft
    case "ADD_SUBTASK_CHANGE":
      const { payload } = action
      draft.subtasks = draft.subtasks.find(subtask => subtask.id===payload.id)? 
        draft.subtasks.filter(subtask => subtask.id!==payload.id) :
        draft.subtasks.concat(payload)
     
      return draft
    default:
      return draft
  }
}

const initialdraft: TaskPartialChanges = {
  newStatus: "",
  subtasks: []
}

export const useShowTask = ( exit: ExitCallback ) => {
  const { currentTask } = useTrackedState()
  const [ draft, dispatch ] = useImmerReducer(reducer, initialdraft, (s) =>{

    return {
      newStatus: currentTask?.status?? "",
      subtasks: []
    }
  })
  const select = useSelectStore({
    setValue: (data: string) =>{
      dispatch({
        type: "SET_NEW_STATUS",
        payload: data
      })
    }
  })
  const { currentBoard } = useCurrentBoard()
  const storeDispatch = useDispatch()
  const { mutate, isLoading } = trpc.task.editPartial.useMutation({
    onSuccess: data => {
      storeDispatch({
        type: "EDIT_TASK",
        payload: {
          ...data.content,
          linkPath: currentBoard?.linkPath?? ""
        }
      })
      exit()
    }
  })
  const appDispatch = useDispatch()

  const handleSubtaskChange = ( subtask: Subtask ) => dispatch({
    type: "ADD_SUBTASK_CHANGE",
    payload: subtask
  })

  const handleSubmitTaskPartialEdit = ( event: React.FormEvent ) => {
    event.preventDefault()

    if ( !currentTask || !currentBoard ) return

    mutate(Object.assign({
      id: currentTask.id,
      subtasks: draft.subtasks,
      linkPath: currentBoard.linkPath
    }, currentTask.status!==draft.newStatus? { status: draft.newStatus } : null))
  }

  useEffect(() =>{
    select.setValue(currentTask?.status?? "")

  }, [ currentTask, select ])
  
  useEffect(() => () => appDispatch({ type: "SET_CURRENT_TASK" }), [])

  return {
    select,
    currentBoard,
    handleSubtaskChange,
    handleSubmitTaskPartialEdit,
    isLoading,
    hasChanged: !isArrayEmpty(draft.subtasks) || currentTask?.status!==draft.newStatus
  }
}