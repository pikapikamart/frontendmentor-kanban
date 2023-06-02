import Image from "next/image"
import { 
  Wrapper,
  Heading, 
  Label, 
  Input,
  Error,
  FieldWrapper,
  Button,
  Close,
  RowFieldWrapper,
  RemoveInput,
  AddRowField,
  RowFieldInner} from "../../base/base.styled"
import { useCreateBoard } from "./create.hook"
import removeIcon from "@/public/icons/remove.svg"
import { AnimatePresence } from "framer-motion"
import FocusTrap from "focus-trap-react"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"


type CreateProps = {
  exit: () => void
}

const Create = ({ exit }: CreateProps) => {
  const {
    register,
    handleSubmit,
    errors,
    fields,
    handleAddColumn,
    removeColumn } = useCreateBoard()
    
  return (
    <FocusTrap>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Add New Board</Heading>
        <FieldWrapper>
          <Label
            htmlFor="title"
            id="titleError">Board Name</Label>
          <Input
            id="title"
            { ...register("title")}
            aria-invalid={ errors.title? "true" : "false" }
            aria-describedby={ errors.title? "titleError" : "" } />
          { errors.title && <Error id="titleError">{ errors.title.message }</Error> }
        </FieldWrapper>
        <FieldWrapper as="fieldset">
          <Label as="legend">Columns</Label>
          <AnimatePresence>       
            { fields.map((field, index) => (
              <RowFieldWrapper
                { ...variantNaming }
                variants={ swipeRightVariant }
                key={ field.id }>
                <RowFieldInner>
                  <Input
                    id={ `column${ index }` }
                    { ...register(`column.${ index }.title`) } 
                    aria-invalid={ errors.column?.[index] ? "true" : "false" }
                    aria-describedby={ errors.column?.[index]? `columnError${index}` : "" } />
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
                { errors.column?.[index] && <Error id={ `columnError${ index }` }>{ errors.column?.[index]?.title?.message }</Error> }
              </RowFieldWrapper>
            )) }
          </AnimatePresence>
          <AddRowField 
            type="button"
            onClick={ () => handleAddColumn(fields.length+1) }>+ Add New Column</AddRowField>
        </FieldWrapper>
        <Button type="submit">Create New Board</Button>
        <Close 
          type="button"
          onClick={ exit }>Close</Close>
      </Wrapper>
    </FocusTrap>
  )
}


export default Create