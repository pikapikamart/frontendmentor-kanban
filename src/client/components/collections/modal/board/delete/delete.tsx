import { AnimatePresence } from "framer-motion"
import { ExitProps } from "types/utils"
import { 
  Description,
  RowOptionsWrapper,
  SecondaryButton,
  WarningButton,
  WarningHeading, 
  Wrapper } from "../../base/styled"
import { useDeleteBoard } from "./hook"
import { LoadingSpinner } from "../../../spinner"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const Delete = ({ exit }: ExitProps) =>{
  const { handleDeletion, isLoading } = useDeleteBoard()
  const { currentBoard } = useCurrentBoard()

  return (
    <>
      <AnimatePresence>
        { isLoading && <LoadingSpinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleDeletion }>
        <WarningHeading>Delete this board?</WarningHeading>
        <Description>Are you sure you want to delete the <span style={{ fontWeight: 700 }}>‘{ currentBoard?.title }’</span> board? This action will remove all columns and tasks and cannot be reversed.</Description>
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