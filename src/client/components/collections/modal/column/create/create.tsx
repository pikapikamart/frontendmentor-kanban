import { 
  Wrapper,
  Heading, 
  Label, 
  Input,
  FieldWrapper,
  MainFormButton,
  Close } from "../../base/base.styled"
import { ExitProps } from "types/utils"


const Create = ({ exit }: ExitProps) => {
    
  return (
    <>
      <Wrapper>
        <Heading>Add New Column</Heading>
        <FieldWrapper>
          <Label
            htmlFor="title"
            id="titleError">Column Name</Label>
          <Input id="title"/>
        </FieldWrapper>
        <MainFormButton type="submit">Create New Column</MainFormButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Create