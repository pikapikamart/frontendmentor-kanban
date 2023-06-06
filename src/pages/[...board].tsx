import { FourOhFour } from "@/client/components/collections/404"
import { useBoard } from "@/client/components/layout/default/header/navbar/board/board.hook"


const Board = () =>{
  const { boards, currentPath } = useBoard()

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