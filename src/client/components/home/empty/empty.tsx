import { MainButton } from "@/client/styled/shared/button"
import { 
  Wrapper,
  SubHeading } from "../styled"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../collections/modal"
import { CreateBoardModal } from "../../collections/modal/board/create"
import { useRef } from "react"


const Empty = () =>{
  const [ createExpanded, handleCreateExpansion ] = useExpansion()
  const focusBackRef = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <AnimatePresence>
        { createExpanded && (
          <ModalDocument
            focusBackRef={ focusBackRef.current } 
            exit={ handleCreateExpansion }>
            <CreateBoardModal exit={ handleCreateExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper ref={ focusBackRef }>
        <SubHeading as="h1">Seems you don't have a board. Create now to start creating your tasks.</SubHeading>
        <MainButton 
          aria-expanded={ createExpanded }
          onClick={ handleCreateExpansion } >Create new board
        </MainButton>
      </Wrapper>
    </>
  )
}


export default Empty