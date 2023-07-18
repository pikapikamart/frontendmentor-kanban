import { 
  OptionItem, 
  OptionTrigger } from "@/client/components/shared/options/options.styled"
import { Options as SharedOptions } from "@/client/components/shared/options"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "../../.."
import { EditTaskModal } from "../../edit"
import { DeleteTaskModel } from "../../delete"
import { ExitCallback } from "@/types/utils"


type OptionsProps = {
  exit: ExitCallback
}

const Options = ({ exit }: OptionsProps) =>{
  const [ editExpansion, handleEditExpansion ] = useExpansion()
  const [ deleteExpansion, handleDeleteExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { editExpansion && (
          <ModalDocument
            exit={ handleEditExpansion }>
              <EditTaskModal exit={ () => {
                handleEditExpansion()
                exit()
              } } />
          </ModalDocument>
        ) }
        { deleteExpansion && (
          <ModalDocument exit={ handleDeleteExpansion }>
            <DeleteTaskModel exit={ handleDeleteExpansion } />
          </ModalDocument>
        ) }
      </AnimatePresence>
      <SharedOptions>
        <OptionItem>
          <OptionTrigger 
            onClick={ handleEditExpansion }
            aria-expanded={ editExpansion }>Edit Task</OptionTrigger>
        </OptionItem>
        <OptionItem>
          <OptionTrigger
            onClick={ handleDeleteExpansion }
            aria-expanded={ deleteExpansion }>Delete Task</OptionTrigger>
        </OptionItem>
      </SharedOptions>
    </>
  )
}


export default Options