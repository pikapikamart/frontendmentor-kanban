import Image from "next/image"
import { 
  Wrapper,
  Heading, 
  Label, 
  Input,
  Error,
  FieldWrapper,
  MainButton,
  Close,
  RowFieldWrapper,
  RemoveInput,
  SecondaryButton,
  RowFieldInner} from "../../base/base.styled"
import { useCreateBoard } from "./create.hook"
import removeIcon from "@/public/icons/remove.svg"
import { AnimatePresence } from "framer-motion"
import FocusTrap from "focus-trap-react"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"
import { LoadingSpinner } from "../../../spinner"
import { ToastError } from "../../../toast/error"


type CreateProps = {
  exit: () => void
}

const Create = ({ exit }: CreateProps) => {
  const {
    register,
    handleSubmit,
    formErrors,
    fields,
    handleAddColumn,
    removeColumn,
    isLoading,
    apiError } = useCreateBoard(exit)
    
  return (
    <>
      { apiError  && <ToastError message={ apiError.message }/> }
      <AnimatePresence>
        { isLoading && <LoadingSpinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Add New Board</Heading>
        <FieldWrapper>
          <Label
            htmlFor="title"
            id="titleError">Board Name</Label>
          <Input
            id="title"
            { ...register("title")}
            aria-invalid={ formErrors.title? "true" : "false" }
            aria-describedby={ formErrors.title? "titleError" : "" } />
          { formErrors.title && <Error id="titleError">{ formErrors.title.message }</Error> }
        </FieldWrapper>
        <FieldWrapper as="fieldset">
          <Label as="legend">Columns</Label>
          <AnimatePresence initial={ false }>       
            { fields.map((field, index) => (
              <RowFieldWrapper
                { ...variantNaming }
                variants={ swipeRightVariant }
                key={ field.id }>
                <RowFieldInner>
                  <Input
                    id={ `column${ index }` }
                    { ...register(`column.${ index }.title`) } 
                    aria-invalid={ formErrors.column?.[index] ? "true" : "false" }
                    aria-describedby={ formErrors.column?.[index]? `columnError${index}` : "" } />
                  <RemoveInput
                    type="button" 
                    onClick={ () => removeColumn(index) }>
                    <Image
                      src={ removeIcon }
                      alt=""
                      aria-hidden="true" />
                      <span className="sr-only">Remove field</span>
                  </RemoveInput>
                </RowFieldInner>
                { formErrors.column?.[index] && <Error id={ `columnError${ index }` }>{ formErrors.column?.[index]?.title?.message }</Error> }
              </RowFieldWrapper>
            )) }
          </AnimatePresence>
          <SecondaryButton
            type="button" 
            onClick={ () => handleAddColumn(fields.length+1) }>+ Add New Column</SecondaryButton>
        </FieldWrapper>
        <MainButton type="submit">Create New Board</MainButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Create