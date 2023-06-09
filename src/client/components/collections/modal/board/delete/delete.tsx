import FocusTrap from "focus-trap-react"
import { AnimatePresence } from "framer-motion"
import { ExitCallback } from "types/utils"
import { 
  Description,
  RowOptionsWrapper,
  SecondaryButton,
  WarningButton,
  WarningHeading, 
  Wrapper } from "../../base/base.styled"


type DeleteProps = {
  exit: ExitCallback
}

const Delete = ({ exit }: DeleteProps) =>{

  return (
    <>
      <AnimatePresence>
        {/* loading in here if success mutation */}
      </AnimatePresence>
      <FocusTrap>
        <Wrapper>
          <WarningHeading>Delete this board?</WarningHeading>
          <Description>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</Description>
          <RowOptionsWrapper>
            <WarningButton>Delete</WarningButton>
            <SecondaryButton onClick={ exit }>Cancel</SecondaryButton>
          </RowOptionsWrapper>
        </Wrapper>
      </FocusTrap>
    </>
  )
}


export default Delete