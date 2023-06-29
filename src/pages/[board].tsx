import { MainWrapper } from "@/client/components/board/board.styled"
import { BoardColumnsSection } from "@/client/components/board/columns"
import { EmptyBoardSection } from "@/client/components/board/empty"
import { FourOhFour } from "@/client/components/shared/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useSetupCurrentBoard } from "@/client/lib/hooks/useSetupCurrentBoard"
import { isArrayEmpty } from "@/client/lib/utils"
import { useSetupBoards } from "@/client/lib/hooks/useSetupBoards"


const BoardPage = () =>{
  useSetupBoards()
  const { 
    currentBoard, 
    isLoading,
    isSuccess } = useSetupCurrentBoard()

  if ( isLoading ) return <Spinner />

  if ( !currentBoard && !isSuccess ) {
    return (
      <FourOhFour>
        Make sure to check the url if correct
      </FourOhFour>
    )
  }

  return (
    <MainWrapper>
      { isArrayEmpty(currentBoard?.column?? [])? 
      <EmptyBoardSection />
        :
      <BoardColumnsSection />
    }
    </MainWrapper>
  )
}


export default BoardPage