import { 
  useDispatch, 
  useTrackedState } from ".."

export type ClientDraft = {} 
export type ClientAction = |
  { type: "INITIALIZE_CLIENT" }

export const clientDraft: ClientDraft = {}

export const clientReducer = ( draft: ClientDraft, action: ClientAction ) =>{
  switch(action.type) {
    case "INITIALIZE_CLIENT":
      
      return
  }
}

export const useClientDispatch = () => {
  const dispatch = useDispatch()

  return ( action: ClientAction ) => dispatch({
    type: "CLIENT",
    action
  })
}

export const useClientState = () => {
  const { client } = useTrackedState()

  return client
}