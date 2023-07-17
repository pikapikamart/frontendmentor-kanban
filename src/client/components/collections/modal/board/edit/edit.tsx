import { ExitProps } from "types/utils"
import { 
  Close,
  Error,
  FieldWrapper,
  Heading, 
  Input, 
  Label, 
  MainFormButton, 
  Note, 
  RemoveInput, 
  RowFieldInner, 
  RowFieldWrapper, 
  SecondaryButton, 
  Wrapper } from "../../base/styled"
import { useEditBoard } from "./hook"
import { AnimatePresence } from "framer-motion"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"
import Spinner from "../../../spinner/spinner"
import { isArrayEmpty } from "@/client/lib/utils"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


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
  const { currentBoard } = useCurrentBoard()

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
                    <svg aria-hidden={ true } xmlns="http://www.w3.org/2000/svg" width="14.849" height="14.849" viewBox="0 0 14.849 14.849">
                      <g id="remove" transform="translate(-401 -13)">
                        <rect id="Rectangle" width="3" height="18" transform="translate(413.728 13) rotate(45)" fill="#828fa3"/>
                        <rect id="Rectangle_Copy" data-name="Rectangle Copy" width="3" height="18" transform="translate(401 15.121) rotate(-45)" fill="#828fa3"/>
                      </g>
                    </svg>
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
        { !isArrayEmpty(currentBoard?.column?? []) && (
          <Note as="div">
            <p>Note: Removing a column that contains tasks will also delete all the tasks.</p>
          </Note>
        ) }
        <MainFormButton type="submit">Save changes</MainFormButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Edit