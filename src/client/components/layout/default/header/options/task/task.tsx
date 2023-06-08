import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"
import { Wrapper } from "./task.styled"
import Image from "next/image"
import addTaskIcon from "@/public/icons/addTask.svg"
import { useExpansion } from "@/client/lib/hooks"


const Board = () => {
  const { isMobile } = useDetectResponsiveness()
  const [ isExpanded, handleExpansion ] = useExpansion()
  
  return (
    <>
      <Wrapper
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        { isMobile?
          <Image
            src={ addTaskIcon }
            alt=""
            aria-hidden="true" />
          :
          "+ Add Task"
         }
        <span className="sr-only">Add task</span>
      </Wrapper>
    </>
  )
}


export default Board