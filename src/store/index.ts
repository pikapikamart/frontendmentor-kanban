import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"
import { 
  ClientAction, 
  ClientDraft, 
  clientDraft, 
  clientReducer } from "./drafts/client"

  
type Draft = {
  client: ClientDraft
}
type Selection = |
  { type: "CLIENT", action: ClientAction }

const reducer = ( draft: Draft, selection: Selection ) => {
  
  switch(selection.type) {
    case "CLIENT":
      clientReducer(draft.client, selection.action)

      return
    default:
      return draft
  } 
}

const initialState: Draft = {
  client: clientDraft
}

const useValue = (): [ Draft, Dispatch<Selection> ] => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)

  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)