import { FourOhFour } from "@/client/components/collections/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useSetupBoards } from "@/client/components/layout/default/header/navbar/board/board.hook"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const Board = () =>{
  const { isLoading } = useSetupBoards()
  const { currentBoard } = useCurrentBoard()
  
  if ( isLoading ) return <Spinner />

  if ( !currentBoard ) {
    return (
      <FourOhFour>
        Make sure to check the url if correct
      </FourOhFour>
    )
  }
 
  return (
    <main></main>
  )
}


export default Board