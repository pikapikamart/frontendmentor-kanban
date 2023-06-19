import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { useSelectStore } from "@ariakit/react"


export const useShowTask = () => {
  const select = useSelectStore()
  const { currentBoard } = useCurrentBoard()

  return {
    select,
    currentBoard
  }
}