import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { trpc } from "@/client/lib/trpc"
import { useDispatch } from "@/store"
import { useRouter } from "next/router"


export const useDeleteBoard = () =>{
  const router = useRouter()
  const dispatch = useDispatch()
  const { mutate, isLoading } = trpc.board.delete.useMutation({
    onSuccess: (data) => {
      router.replace("/")
      dispatch({
        type: "DELETE_BOARD",
        payload: data.content
      })
    }
  })
  const { currentBoard, path } = useCurrentBoard()

  const handleDeletion = (event: React.FormEvent) =>{
    event.preventDefault()

    if ( !currentBoard ) return
    
    mutate({
      title: currentBoard.title,
      linkPath: path
    })
  }

  return {
    handleDeletion,
    isLoading
  }
}