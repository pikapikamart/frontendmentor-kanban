import { MainWrapper } from "@/client/components/board/board.styled"
import { EmptyBoardSection } from "@/client/components/board/empty"
import { FourOhFour } from "@/client/components/collections/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useSetupBoards } from "@/client/components/layout/default/header/navbar/board/board.hook"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const BoardPage = () =>{
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
    <MainWrapper>
      { !(!!currentBoard.column.length)? 
      <EmptyBoardSection />
        :
      <></>
    }
    </MainWrapper>
  )
}


export default BoardPage