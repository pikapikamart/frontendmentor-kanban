import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { trpc } from "@/client/lib/trpc"
import { 
  useDispatch, 
  useTrackedState } from "@/store"


export const useDeleteTask = () =>{
  const { currentTask } = useTrackedState()
  const { currentBoard } = useCurrentBoard()
  const dispatch = useDispatch()
  const { mutate, isLoading } = trpc.task.delete.useMutation({
    onSuccess: (data) => {
      
      if ( !currentBoard ) return

      dispatch({
        type: "DELETE_TASK",
        payload: data.content
      })
    }
  })

  const handleDeletion = (event: React.FormEvent) =>{
    event.preventDefault()

    if ( !currentTask || !currentBoard ) return
    
    mutate({
      id: currentTask.id,
      linkPath: currentBoard.linkPath
    })
  }

  return {
    handleDeletion,
    isLoading
  }
}