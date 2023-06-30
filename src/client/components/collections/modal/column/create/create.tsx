import { 
  Wrapper,
  Heading, 
  Label, 
  Input,
  FieldWrapper,
  MainFormButton,
  Close, 
  Error} from "../../base/styled"
import { ExitProps } from "types/utils"
import { useCreateColumn } from "./create.hook"
import { AnimatePresence } from "framer-motion"
import Spinner from "../../../spinner/spinner"


const Create = ({ exit }: ExitProps) => {
  const {
    register,
    formErrors,
    isLoading,
    handleSubmit
  } = useCreateColumn(exit)  

  return (
    <>
      <AnimatePresence>
        { isLoading && <Spinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Add New Column</Heading>
        <FieldWrapper>
          <Label
            htmlFor="title"
            id="titleError">Column Name</Label>
          <Input 
            id="title"
            { ...register("title") } 
            aria-invalid={ formErrors.title? "true" : "false" }
            aria-describedby={ formErrors.title? "titleError" : "" } />
          { formErrors.title && <Error id="titleError">{ formErrors.title.message }</Error> }
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