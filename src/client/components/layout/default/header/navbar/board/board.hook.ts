import { trpc } from "@/client/lib/trpc"
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useBoard = () =>{
  const { boards, currentBoard } = useTrackedState()
  const dispatch = useDispatch()
  const { asPath } = useRouter()
  const { refetch } = trpc.board.getAll.useQuery(undefined, {
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
    if ( !boards.length ) {
      refetch()
    }
  }, [])

  useEffect(() =>{
    const board = boards.find(board => board.linkPath===asPath.slice(1))

    if ( board ) {
      dispatch({
        type: "SET_CURRENT_BOARD",
        payload: board.title
      })
    }
  }, [ boards.length ])

  return {
    boards,
    currentPath: asPath.slice(1),
  }
}