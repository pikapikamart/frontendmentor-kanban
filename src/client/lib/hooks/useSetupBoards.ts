import { trpc } from "@/client/lib/trpc"
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useEffect } from "react"


export const useSetupBoards = () =>{
  const { boardsLoaded } = useTrackedState()
  const dispatch = useDispatch()
  const { 
    refetch,
    isLoading,
    isFetching } = trpc.board.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: (data) => {
      dispatch({
        type: "SET_BOARDS",
        payload: data.content
      })
    }
  })
  
  useEffect(() => {
    if ( !boardsLoaded ) refetch()
  }, [])

  return {
    isLoading: isLoading && isFetching
  }
}