import { useDispatch } from "@/store"
import { useRouter } from "next/router"
import { trpc } from "../trpc"
import { useEffect } from "react"
import { useCurrentBoard } from "./useCurrentBoard"


export const useSetupCurrentBoard = () => {
  const { currentBoard } = useCurrentBoard()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const { 
    refetch, 
    isLoading,
    isFetching,
    isFetched,
    isSuccess
  } = trpc.board.get.useQuery({ linkPath: (query.board?? "") as string }, {
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
    if ( currentBoard && currentBoard.hasLoaded ) return

    if ( query.board ) refetch()
  }, [ query.board ])

  return {
    currentBoard,
    isLoading: isLoading && isFetching,
    isFetched,
    isSuccess
  }
}