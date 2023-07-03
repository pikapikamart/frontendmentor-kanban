import { MainWrapper } from "@/client/components/board/styled"
import { HomeEmpty } from "@/client/components/home/empty"
import { HomeLoading } from "@/client/components/home/loading"
import { useSetupBoards } from "@/client/lib/hooks/useSetupBoards"
import { isArrayEmpty } from "@/client/lib/utils"
import { useTrackedState } from "@/store"
import { AnimatePresence } from "framer-motion"
import {
  Wrapper,
  SubHeading } from "@/client/components/home/styled"


const Homepage = () => {
  const { boards, boardsLoaded } = useTrackedState()
  const { isLoading } = useSetupBoards()

  return (
    <MainWrapper>
      <AnimatePresence>
        { isLoading && <HomeLoading key="home-loading" /> }
        { boardsLoaded && (
          <Wrapper key="home-main">
            { isArrayEmpty(boards)?
              <HomeEmpty />
              :
              <SubHeading as="h1">Head over to one of your board now to start creating your tasks.</SubHeading> 
            }
          </Wrapper>
        ) }
      </AnimatePresence>
    </MainWrapper>
  )
}


export default Homepage