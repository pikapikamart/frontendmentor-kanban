import { useTrackedState } from "@/store"
import { useRouter } from "next/router"


export const useCurrentBoard = () =>{
  const { boards } = useTrackedState()
  const { query } = useRouter()

  return {
    currentBoard: boards.find(board => board.linkPath===query.board)
  }
}