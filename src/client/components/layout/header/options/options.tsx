import { ModalDocument } from "@/client/components/collections/modal"
import { DeleteBoardModal } from "@/client/components/collections/modal/board/delete"
import { EditBoardModal } from "@/client/components/collections/modal/board/edit"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { useRef } from "react"
import { Options as SharedOptions } from "@/client/components/shared/options"
import { OptionItem, OptionTrigger } from "@/client/components/shared/options/options.styled"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { CreateTaskModal } from "@/client/components/collections/modal/task/create"
import { TaskButton } from "./styled"
import Image from "next/image"
import addTaskIcon from "@/public/icons/addTask.svg"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { isArrayEmpty } from "@/client/lib/utils"


const Options = () =>{
  const { currentBoard } = useCurrentBoard()
  const [ isEditExpanded, handleEditExpansion ] = useExpansion()
  const [ isDeleteExpanded, handleDeleteExpansion ] = useExpansion()
  const [ isTaskExpanded, handleTaskExpansion ] = useExpansion()
  const focusBack = useRef<HTMLButtonElement | null>(null)
  const { isMobile } = useDetectResponsiveness()

  if ( !currentBoard ) return <></>

  return (
    <>
      <AnimatePresence>
        { isDeleteExpanded && (
          <ModalDocument
            focusBackRef={ focusBack.current }
            exit={ handleDeleteExpansion }>
            <DeleteBoardModal exit={ handleDeleteExpansion } />
         </ModalDocument>
        ) }
        { isEditExpanded && (
          <ModalDocument
            focusBackRef={ focusBack.current }
            exit={ handleEditExpansion }>
            <EditBoardModal exit={ handleEditExpansion } />
         </ModalDocument>
        ) }
        { isTaskExpanded && (
          <ModalDocument 
            focusBackRef={ focusBack.current }
            exit={ handleTaskExpansion }>
            <CreateTaskModal exit={ handleTaskExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <TaskButton
        onClick={ () => isArrayEmpty(currentBoard.column)? null : handleTaskExpansion() }
        aria-expanded={ isTaskExpanded }
        aria-disabled={ isArrayEmpty(currentBoard.column) }>
        { isMobile?
          <>
            <Image
              src={ addTaskIcon }
              alt=""
              aria-hidden="true" />
            <span className="sr-only">Add new task</span>
          </>
          :
          "+ Add new Task"
         }
         { isArrayEmpty(currentBoard.column)? <span className="sr-only">Have atleast 1 column in your board first.</span> : "" }
      </TaskButton>
      <SharedOptions ref={ focusBack }>
        <OptionItem>
          <OptionTrigger
            onClick={ handleEditExpansion }
            aria-expanded={ isEditExpanded }>
              Edit Board
          </OptionTrigger>
        </OptionItem>
        <OptionItem>
          <OptionTrigger
            onClick={ handleDeleteExpansion }
            aria-expanded={ isDeleteExpanded }>
              Delete Board
          </OptionTrigger>
        </OptionItem>
      </SharedOptions>
    </>
  )
}


export default Options