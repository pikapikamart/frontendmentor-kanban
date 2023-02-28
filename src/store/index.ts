import { useImmerReducer } from "use-immer"
import { createContainer } from "react-tracked"
import { Dispatch } from "react"


type Action = 
  | { type: "START_TRACKING" }

type Draft = {}

const initialState: Draft = {} 

const reducer = ( draft: Draft, action: Action ) =>{

  switch(action.type) {
    case "START_TRACKING":
      return draft
  }
}

const useValue = (): [ Draft, Dispatch<Action> ] =>{
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)
  
  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)