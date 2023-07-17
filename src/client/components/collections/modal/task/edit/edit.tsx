import Image from "next/image"
import { 
  Wrapper,
  Heading, 
  Label, 
  Input,
  Error,
  FieldWrapper,
  MainFormButton,
  Close,
  RowFieldWrapper,
  RemoveInput,
  SecondaryButton,
  RowFieldInner,
  Textarea, 
  Select} from "../../base/styled"
import { useEditTask } from "./hook"
import removeIcon from "@/public/icons/remove.svg"
import { AnimatePresence } from "framer-motion"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"
import { LoadingSpinner } from "../../../spinner"
import { ToastError } from "../../../toast/error"
import * as Ariakit from "@ariakit/react"
import { ExitProps } from "types/utils"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const Edit = ({ exit }: ExitProps) => {
  const {
    register,
    handleSubmit,
    formErrors,
    fields,
    handleAddSubtask,
    removeSubtask,
    isLoading,
    apiError,
    select } = useEditTask(exit)
  const { currentBoard } = useCurrentBoard()

  return (
    <>
      { apiError  && <ToastError message={ apiError.message }/> }
      <AnimatePresence>
        { isLoading && <LoadingSpinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Edit Task</Heading>
        <FieldWrapper>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            { ...register("title")}
            aria-invalid={ formErrors.title? "true" : "false" }
            aria-describedby={ formErrors.title? "titleError" : "" } />
          { formErrors.title && <Error id="titleError">{ formErrors.title.message }</Error> }
        </FieldWrapper>
        <FieldWrapper>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            { ...register("description") }
            aria-invalid={ formErrors.description? "true" : "false" }
            aria-describedby={ formErrors.description? "descriptionError" : "" } ></Textarea>
          { formErrors.description && <Error id="descriptionError">{ formErrors.description.message }</Error> }
        </FieldWrapper>
        <FieldWrapper as="fieldset">
          <Label as="legend">Subtasks</Label>
          <AnimatePresence initial={ false }>       
            { fields.map((field, index) => (
              <RowFieldWrapper key={ field.id }>
                <RowFieldInner>
                  <Input
                    id={ `subtasks${ index }` }
                    { ...register(`subtasks.${ index }.title`) } 
                    aria-invalid={ formErrors.subtasks?.[index] ? "true" : "false" }
                    aria-describedby={ formErrors.subtasks?.[index]? `subtasksError${index}` : "" } />
                  <RemoveInput
                    type="button" 
                    onClick={ () => removeSubtask(index) }>
                    <svg aria-hidden={ true } xmlns="http://www.w3.org/2000/svg" width="14.849" height="14.849" viewBox="0 0 14.849 14.849">
                      <g id="remove" transform="translate(-401 -13)">
                        <rect id="Rectangle" width="3" height="18" transform="translate(413.728 13) rotate(45)" fill="#828fa3"/>
                        <rect id="Rectangle_Copy" data-name="Rectangle Copy" width="3" height="18" transform="translate(401 15.121) rotate(-45)" fill="#828fa3"/>
                      </g>
                    </svg>
                    <span className="sr-only">Remove field</span>
                  </RemoveInput>
                </RowFieldInner>
                { formErrors.subtasks?.[index] && <Error id={ `subtasksError${ index }` }>{ formErrors.subtasks?.[index]?.title?.message }</Error> }
              </RowFieldWrapper>
            )) }
          </AnimatePresence>
          <SecondaryButton
            type="button" 
            onClick={ () => handleAddSubtask() }>+ Add New Subtask</SecondaryButton>
        </FieldWrapper>
        <FieldWrapper>
          <Select>
            <Label>
              <Ariakit.SelectLabel
                className="select-label" 
                store={ select }>Status</Ariakit.SelectLabel>
            </Label>
            <Ariakit.Select
              store={ select }
              className="select" />
              <Ariakit.SelectPopover
                store={ select }
                gutter={ 3 }
                sameWidth
                className="popover">
                { currentBoard?.column.map(column => (
                  <Ariakit.SelectItem
                    key={ `task-${ column.title }` }
                    className="select-item"
                    value={ column.title } />
                )) }
              </Ariakit.SelectPopover>
          </Select>
        </FieldWrapper>
        <MainFormButton type="submit">Edit Task</MainFormButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Edit