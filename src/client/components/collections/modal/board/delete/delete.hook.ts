import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { trpc } from "@/client/lib/trpc"
import { useRouter } from "next/router"


export const useDeleteBoard = () =>{
  const router = useRouter()
  const { mutate, isLoading } = trpc.board.delete.useMutation({
    onSuccess: () => {
      router.replace("/")
    }
  })
  const { currentBoard, path } = useCurrentBoard()

  const handleDeletion = (event: React.FormEvent) =>{
    event.preventDefault()
    console.log(123)
    mutate({
      title: currentBoard,
      linkPath: path
    })
  }

  return {
    handleDeletion,
    isLoading
  }
}