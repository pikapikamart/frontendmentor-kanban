import { useExpansion } from "@/client/lib/hooks"
import { 
  BoardItem,
  BoardItemTrigger,
  Dropdown,
  Trigger, 
  Wrapper } from "./board.styled"
import boardOption from "@/public/icons/boardOption.svg"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"
import { useRef } from "react"
import { ModalDocument } from "@/client/components/collections/modal"
import { DeleteBoardModal } from "@/client/components/collections/modal/board/delete"
import { EditBoardModal } from "@/client/components/collections/modal/board/edit"


const Board = () =>{
  const [ isExpanded, handleExpansion ] = useExpansion()
  const [ editExpansion, handleEditExpansion ] = useExpansion()
  const [ deleteExpansion, handleDeleteExpansion ] = useExpansion()
  const focusBack = useRef<HTMLDivElement | null>(null)

  return (
    <>
      <Wrapper
        ref={ focusBack }
        tabIndex={ -1 }>
        <Trigger
          onClick={ handleExpansion }
          aria-expanded={ isExpanded }>
          <Image
            src={ boardOption }
            alt=""
            aria-hidden="true" />
          <span className="sr-only">Board options</span>
        </Trigger>
        <AnimatePresence>
          { isExpanded && (
            <Dropdown
              { ...variantNaming }
              variants={ fadeVariant }>
              <ul>
                <BoardItem>
                  <BoardItemTrigger 
                    type="button"
                    onClick={ handleEditExpansion }
                    aria-expanded={ editExpansion }>Edit Board
                  </BoardItemTrigger>
                </BoardItem>
                <BoardItem>
                  <BoardItemTrigger
                    type="button" 
                    onClick={ handleDeleteExpansion }
                    aria-expanded={ deleteExpansion }>Delete Board
                  </BoardItemTrigger>
                </BoardItem>
              </ul>
            </Dropdown>
          ) }
        </AnimatePresence>
      </Wrapper>
      <AnimatePresence>
        { deleteExpansion && (
          <ModalDocument
            focusBackRef={ focusBack.current }
            exit={ handleDeleteExpansion }>
            <DeleteBoardModal exit={ handleDeleteExpansion } />
          </ModalDocument>
        ) }
        { editExpansion && (
          <ModalDocument
            focusBackRef={ focusBack.current }
            exit={ handleEditExpansion }>
            <EditBoardModal exit={ handleEditExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
    </>
  )
}


export default Board