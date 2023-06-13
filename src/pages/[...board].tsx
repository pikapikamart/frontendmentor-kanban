import { FourOhFour } from "@/client/components/collections/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useBoard } from "@/client/components/layout/default/header/navbar/board/board.hook"


const Board = () =>{
  const { 
    boards, 
    currentPath,
    isLoading } = useBoard()

  if ( isLoading ) return <Spinner />

  if ( !boards.find(board => board.linkPath===currentPath) ) {
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