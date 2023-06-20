import { trpc } from "@/client/lib/trpc"
import { isArrayEmpty } from "@/client/lib/utils"
import { TaskSchema } from "@/server/controllers/task/query/schema"
import { Subtask } from "@/store"
import { useSelectStore } from "@ariakit/react"
import { useImmerReducer } from "use-immer"


type TaskPartialChanges = {
  newState: string,
  subtasks: Subtask[]
}

type Action = 
  { type: "SET_NEW_STATUS", payload: string } |
  { type: "ADD_SUBTASK_CHANGE", payload: Subtask }

const reducer = ( state: TaskPartialChanges, action: Action ) =>{

  switch(action.type) {
    case "SET_NEW_STATUS":
      state.newState = action.payload

      return state
    case "ADD_SUBTASK_CHANGE":
      const { payload } = action
      state.subtasks = state.subtasks.find(subtask => subtask.id===payload.id)? 
        state.subtasks.filter(subtask => subtask.id!==payload.id) :
        state.subtasks.concat(payload)
     
      return state
    default:
      return state
  }
}

const initialState: TaskPartialChanges = {
  newState: "",
  subtasks: []
}

export const useShowTask = ( task: TaskSchema ) => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState, ( s ) => {

    return {
      newState: task.status,
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
  const { mutate } = trpc.task.editPartial.useMutation({
    onSuccess: data => {

    }
  })

  const handleSubtaskChange = ( subtask: Subtask ) => dispatch({
    type: "ADD_SUBTASK_CHANGE",
    payload: subtask
  })

  const handleSubmitTaskPartialEdit = ( event: React.FormEvent ) => {
    event.preventDefault()
    mutate({
      id: task.id,
      status: state.newState,
      subtasks: state.subtasks
    })
  }

  return {
    select,
    handleSubtaskChange,
    handleSubmitTaskPartialEdit,
    hasChanged: !isArrayEmpty(state.subtasks) || task.status!==state.newState
  }
}