import { useTrackedState } from "@/store"
import { useRouter } from "next/router"


export const useCurrentBoard = () => {
  const { boards } = useTrackedState()
  const { asPath } = useRouter()

  return {
    currentBoard: boards.find(board => board.linkPath===asPath.slice(1)),
    path: asPath.slice(1)
  }
}