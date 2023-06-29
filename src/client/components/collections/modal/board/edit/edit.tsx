import { ExitProps } from "types/utils"
import { 
  Close,
  Error,
  FieldWrapper,
  Heading, 
  Input, 
  Label, 
  MainFormButton, 
  RemoveInput, 
  RowFieldInner, 
  RowFieldWrapper, 
  SecondaryButton, 
  Wrapper } from "../../base/base.styled"
import { useEditBoard } from "./hook"
import { AnimatePresence } from "framer-motion"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"
import Image from "next/image"
import removeIcon from "@/public/icons/remove.svg"
import Spinner from "../../../spinner/spinner"


const Edit = ({ exit }: ExitProps) =>{
  const {
    register,
    formErrors,
    fields,
    removeColumn,
    handleAddColumn,
    handleSubmit,
    isLoading
  } = useEditBoard(exit)

  return (
    <>
      <AnimatePresence>
        { isLoading && <Spinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Edit Board</Heading>
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
          <Label as="legend">Columns { formErrors.column && <Error id="columnsError">*{ formErrors.column.message }</Error> }</Label>
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
            onClick={ handleAddColumn }>+ Add New Column</SecondaryButton>
        </FieldWrapper>
        <MainFormButton type="submit">Save changes</MainFormButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Edit