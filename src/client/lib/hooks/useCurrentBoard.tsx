import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useRouter } from "next/router"
import { trpc } from "../trpc"
import { useEffect } from "react"


export const useCurrentBoard = () => {
  const { boards } = useTrackedState()
  const { asPath } = useRouter()
  const dispatch = useDispatch()
  const currentBoard = boards.find(board => board.linkPath===asPath.slice(1))
  const { refetch } = trpc.board.get.useQuery({
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
    if ( !currentBoard?.hasLoaded && boards.length ) {
      refetch()
    }
  }, [ currentBoard, boards ])

  return {
    currentBoard: currentBoard,
    path: asPath.slice(1)
  }
}