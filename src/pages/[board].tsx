import { MainWrapper } from "@/client/components/board/styled"
import { BoardColumnsSection } from "@/client/components/board/columns"
import { EmptyBoardSection } from "@/client/components/board/empty"
import { FourOhFour } from "@/client/components/shared/404"
import { useSetupCurrentBoard } from "@/client/lib/hooks/useSetupCurrentBoard"
import { isArrayEmpty } from "@/client/lib/utils"
import { useSetupBoards } from "@/client/lib/hooks/useSetupBoards"
import { AnimatePresence } from "framer-motion"
import { HomeLoading } from "@/client/components/home/loading"


const BoardPage = () =>{
  useSetupBoards()
  const { 
    currentBoard, 
    isLoading,
    isSuccess,
    isFetched } = useSetupCurrentBoard()

  if ( isFetched && !isSuccess ) return <FourOhFour>Make sure to check the url if correct</FourOhFour>
 
  return (
    <MainWrapper key="board-page">
      <AnimatePresence>
        { isLoading && <HomeLoading key={ `board-page-spinner` } /> }
        { currentBoard && currentBoard?.hasLoaded && <>
          { isArrayEmpty(currentBoard.column)? <EmptyBoardSection key={ `board-${ currentBoard.title }-page` } /> : <BoardColumnsSection key={ `board-${ currentBoard.title }-column` } /> }
        </> }
      </AnimatePresence>
      {  }
    </MainWrapper>
  )
}


export default BoardPage