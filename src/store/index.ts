import { 
  BoardWithTaskSchema, 
  BoardsWithTaskSchema } from "@/server/controllers/board/query/schema"
import { TaskSchema } from "@/server/controllers/task/query/schema"
import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { ArrayElement } from "@/types/utils"
import { useImmerReducer } from "use-immer"
import { DeleteTaskSchema } from "@/server/controllers/task/mutation/schema"


type BoardWithTask = BoardWithTaskSchema & { hasLoaded?: boolean }
export type BoardColumn = ArrayElement<BoardWithTask["column"]>
export type Subtask = ArrayElement<TaskSchema["subtasks"]>

type Draft = {
  darkmode: boolean,
  boardsLoaded: boolean,
  boards: BoardWithTask[],
  currentTask?: TaskSchema
}

type TaskWithLinkPath = TaskSchema & { linkPath: string }
type CreateColumn = {
  title: string,
  id: string,
  backgroundColor: string,
  tasks: TaskSchema[],
  linkPath: string
}

type Action = |
  { type: "DARKMODE", payload?: boolean } |
  { type: "SET_BOARDS", payload: BoardsWithTaskSchema } |
  { type: "ADD_BOARD", payload: BoardWithTaskSchema } |
  { type: "DELETE_BOARD", payload: string } |
  { type: "EDIT_BOARD", payload: BoardWithTaskSchema & { oldPath?: string } } |
  { type: "CREATE_COLUMN", payload: CreateColumn } |
  { type: "SET_BOARD", payload: BoardWithTask } |
  { type: "ADD_TASK", payload: TaskWithLinkPath } |
  { type: "EDIT_TASK", payload: TaskWithLinkPath } |
  { type: "SET_CURRENT_TASK", payload?: TaskSchema } |
  { type: "DELETE_TASK", payload: DeleteTaskSchema } 

 
const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = action.payload?? !draft.darkmode

      window.localStorage.setItem("darkmode", `${ draft.darkmode }`)

      return
    case "SET_BOARDS":
      draft.boards = action.payload
      draft.boardsLoaded = true

      return
    case "ADD_BOARD":
      draft.boards = draft.boards.concat(action.payload)

      return
    case "DELETE_BOARD":
      draft.boards = draft.boards.filter(board => board.linkPath!==action.payload)

      return
    case "EDIT_BOARD":
      const { oldPath, ...editedBoard } = action.payload
      draft.boards = draft.boards.map(board => board.linkPath===editedBoard.linkPath || board.linkPath===oldPath? {
        ...editedBoard,
        hasLoaded: true
      } : board)

      return
    case "CREATE_COLUMN": {
      const { linkPath, ...column } = action.payload
      draft.boards = draft.boards.map(board => board.linkPath===linkPath? {
        ...board,
        column: board.column.concat({ ...column })
      }: board)
      
      return
    }
    case "SET_BOARD":
      draft.boards = draft.boards.map(board => board.linkPath===action.payload.linkPath? {
        ...action.payload,
        hasLoaded: true
      } : board)

      return
    case "ADD_TASK": {
      const { linkPath, ...newTask } = action.payload
      draft.boards = draft.boards.map(board => board.linkPath!==linkPath? board : {
        ...board,
        column: board.column.map(column => column.title!==newTask.status? column : {
          ...column,
          tasks: column.tasks.concat(newTask)
        })
      })

      return
    }
    case "EDIT_TASK":
      const { boards } = draft
      const { payload: { linkPath, ...updatedTask } } = action
      const boardIndex = boards.findIndex(board => board.linkPath===linkPath)
      const collumnIndex = boards[boardIndex].column.findIndex(column => !!column.tasks.find(task => task.id===updatedTask.id))
      const taskIndex = boards[boardIndex].column[collumnIndex].tasks.findIndex(task => task.id===updatedTask.id)
      const oldTask = { ...boards[boardIndex].column[collumnIndex].tasks[taskIndex] }
      const statusChanged = updatedTask.status!==oldTask.status
      
      if ( statusChanged ) {
        boards[boardIndex].column[collumnIndex].tasks = boards[boardIndex].column[collumnIndex].tasks.filter(task => task.id!==updatedTask.id)
        const newColumnIndex = boards[boardIndex].column.findIndex(column => column.title===updatedTask.status)
        boards[boardIndex].column[newColumnIndex].tasks.push(updatedTask)
        
        return
      }
      
      boards[boardIndex].column[collumnIndex].tasks[taskIndex] = updatedTask
      
      return
    case "SET_CURRENT_TASK":
      draft.currentTask = action.payload? JSON.parse(JSON.stringify(action.payload)) : undefined
      
      return
    case "DELETE_TASK": {
      const { boards } = draft
      const { payload: { linkPath, id } } = action
      const boardIndex = boards.findIndex(board => board.linkPath===linkPath)
      const collumnIndex = boards[boardIndex].column.findIndex(column => !!column.tasks.find(task => task.id===id))
      boards[boardIndex].column[collumnIndex].tasks = boards[boardIndex].column[collumnIndex].tasks.filter(task => task.id!==id)

      return
    }
    default:
      return draft
  }
}

const initialState: Draft = {
  darkmode: false,
  boardsLoaded: false,
  boards: []
}

const useValue = (): [ Draft, Dispatch<Action> ] => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)
 
  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)