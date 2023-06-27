import { ExitProps } from "types/utils"
import { 
  Description,
  RowOptionsWrapper,
  SecondaryButton,
  WarningButton,
  WarningHeading, 
  Wrapper } from "../../base/base.styled"
import { useTrackedState } from "@/store"


const Delete = ({ exit }: ExitProps) =>{
  const { currentTask } = useTrackedState()

  return (
    <>
      <Wrapper>
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