import { AnimatePresence } from "framer-motion"
import { ExitCallback } from "types/utils"
import { 
  Description,
  RowOptionsWrapper,
  SecondaryButton,
  WarningButton,
  WarningHeading, 
  Wrapper } from "../../base/base.styled"
import { useDeleteBoard } from "./delete.hook"
import { LoadingSpinner } from "../../../spinner"


type DeleteProps = {
  exit: ExitCallback
}

const Delete = ({ exit }: DeleteProps) =>{
  const { handleDeletion, isLoading } = useDeleteBoard()

  return (
    <>
      <AnimatePresence>
        { isLoading && <LoadingSpinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleDeletion }>
        <WarningHeading>Delete this board?</WarningHeading>
        <Description>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</Description>
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