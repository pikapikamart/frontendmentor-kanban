import { trpc } from "@/client/lib/trpc"
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useRouter } from "next/router"
import { useEffect } from "react"


export const useBoard = () =>{
  const { boards } = useTrackedState()
  const dispatch = useDispatch()
  const { asPath } = useRouter()
  const { refetch, isLoading } = trpc.board.getAll.useQuery(undefined, {
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

  return {
    boards,
    currentPath: asPath.slice(1),
    isLoading
  }
}