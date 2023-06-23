import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useRouter } from "next/router"
import { trpc } from "../trpc"
import { useEffect } from "react"


export const useSetupCurrentBoard = () => {
  const { currentBoard } = useTrackedState()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const { refetch, isLoading, isFetching } = trpc.board.get.useQuery({
    linkPath: (query.board?? "") as string
  }, {
    refetchOnWindowFocus: false,
    enabled: false,
    onSuccess: data => {
      dispatch({
        type: "SET_BOARD",
        payload: data.content
      })
    }
  })
  
  useEffect(() =>{
    if ( !currentBoard && query.board ) refetch()
  }, [ currentBoard, query ])

  return {
    currentBoard,
    isLoading: isLoading && isFetching
  }
}