import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { Wrapper } from "./task.styled"
import Image from "next/image"
import addTaskIcon from "@/public/icons/addTask.svg"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "@/client/components/collections/modal"
import { CreateTaskModal } from "@/client/components/collections/modal/task/create"


const Board = () => {
  const { isMobile } = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()
  
  return (
    <>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument exit={ handleExpansion }>
            <CreateTaskModal exit={ handleExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <Wrapper
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        { isMobile?
          <Image
            src={ addTaskIcon }
            alt=""
            aria-hidden="true" />
          :
          "+ Add new Task"
         }
        <span className="sr-only">Add new task</span>
      </Wrapper>
    </>
  )
}


export default Board