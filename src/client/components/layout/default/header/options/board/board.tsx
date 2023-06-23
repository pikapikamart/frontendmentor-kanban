import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { ModalDocument } from "@/client/components/collections/modal"
import { DeleteBoardModal } from "@/client/components/collections/modal/board/delete"
import { EditBoardModal } from "@/client/components/collections/modal/board/edit"
import { Options } from "@/client/components/shared/options"
import { 
  OptionItem, 
  OptionTrigger } from "@/client/components/shared/options/options.styled"


const Board = () =>{
  const [ editExpansion, handleEditExpansion ] = useExpansion()
  const [ deleteExpansion, handleDeleteExpansion ] = useExpansion()
  const focusBack = useRef<HTMLDivElement | null>(null)

  return (
    <>
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
      <div
        ref={ focusBack }
        tabIndex={ -1 }>
        <Options>
          <OptionItem>
            <OptionTrigger
              onClick={ handleEditExpansion }
              aria-expanded={ editExpansion }>
                Edit Board
            </OptionTrigger>
          </OptionItem>
          <OptionItem>
            <OptionTrigger
              onClick={ handleDeleteExpansion }
              aria-expanded={ deleteExpansion }>
                Delete Board
            </OptionTrigger>
          </OptionItem>
        </Options>
      </div>
    </>
  )
}


export default Board