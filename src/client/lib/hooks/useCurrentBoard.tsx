import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useRouter } from "next/router"
import { trpc } from "../trpc"
import { useEffect } from "react"


export const useCurrentBoard = () => {
  const { boards } = useTrackedState()
  const { query } = useRouter()
  const dispatch = useDispatch()
  const currentBoard = boards.find(board => board.linkPath===query.board)
  const { refetch, isLoading } = trpc.board.get.useQuery({
    title: currentBoard?.title?? "",
    linkPath: currentBoard?.linkPath?? ""
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
    if ( currentBoard && !currentBoard.hasLoaded ) {

      refetch()
    }
  }, [ currentBoard ])

  return {
    currentBoard: currentBoard,
    path: query.board?? "",
    isLoading
  }
}