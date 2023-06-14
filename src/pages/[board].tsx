import { MainWrapper } from "@/client/components/board/board.styled"
import { EmptyBoardSection } from "@/client/components/board/empty"
import { FourOhFour } from "@/client/components/collections/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useSetupBoards } from "@/client/components/layout/default/header/navbar/board/board.hook"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { isArrayEmpty } from "@/client/lib/utils"


const BoardPage = () =>{
  useSetupBoards()
  const { currentBoard, isLoading } = useCurrentBoard()
  
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
      { isArrayEmpty(currentBoard.column)? 
      <EmptyBoardSection />
        :
      <></>
    }
    </MainWrapper>
  )
}


export default BoardPage