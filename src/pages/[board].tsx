import { MainWrapper } from "@/client/components/board/board.styled"
import { BoardColumnsSection } from "@/client/components/board/columns"
import { EmptyBoardSection } from "@/client/components/board/empty"
import { FourOhFour } from "@/client/components/shared/404"
import Spinner from "@/client/components/collections/spinner/spinner"
import { useSetupBoards } from "@/client/components/layout/default/header/navbar/board/board.hook"
import { useSetupCurrentBoard } from "@/client/lib/hooks/useSetupCurrentBoard"
import { isArrayEmpty } from "@/client/lib/utils"


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