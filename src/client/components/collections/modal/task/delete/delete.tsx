import { ExitProps } from "types/utils"
import { 
  Description,
  RowOptionsWrapper,
  SecondaryButton,
  WarningButton,
  WarningHeading, 
  Wrapper } from "../../base/styled"
import { useTrackedState } from "@/store"
import { useDeleteTask } from "./delete.hook"
import { AnimatePresence } from "framer-motion"
import Spinner from "../../../spinner/spinner"


const Delete = ({ exit }: ExitProps) =>{
  const { handleDeletion, isLoading } = useDeleteTask()
  const { currentTask } = useTrackedState()

  return (
    <>
      <AnimatePresence>
        { isLoading && <Spinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleDeletion }>
        <WarningHeading>Delete this task?</WarningHeading>
        <Description>Are you sure you want to delete the <span style={{ fontWeight: 700 }}>‘{ currentTask?.title }’</span> task and its subtasks? This action cannot be reversed</Description>
        <RowOptionsWrapper>
          <WarningButton type="submit">Delete</WarningButton>
          <SecondaryButton
            type="button" 
            onClick={ exit }>Cancel</SecondaryButton>
        </RowOptionsWrapper>
      </Wrapper>
    </>
  )
}


export default Delete