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
  Select} from "../../base/base.styled"
import { useCreateTask } from "./create.hook"
import removeIcon from "@/public/icons/remove.svg"
import { AnimatePresence } from "framer-motion"
import { 
  swipeRightVariant, 
  variantNaming } from "@/client/motion/variants"
import { LoadingSpinner } from "../../../spinner"
import { ToastError } from "../../../toast/error"
import * as Ariakit from "@ariakit/react"
import { useTrackedState } from "@/store"
import { ExitProps } from "types/utils"


const Create = ({ exit }: ExitProps) => {
  const {
    register,
    handleSubmit,
    formErrors,
    fields,
    handleAddSubtask,
    removeSubtask,
    isLoading,
    apiError,
    select } = useCreateTask(exit)
  const { currentBoard } = useTrackedState()

  return (
    <>
      { apiError  && <ToastError message={ apiError.message }/> }
      <AnimatePresence>
        { isLoading && <LoadingSpinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmit }>
        <Heading>Add New Task</Heading>
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
              <RowFieldWrapper
                { ...variantNaming }
                variants={ swipeRightVariant }
                key={ field.id }>
                <RowFieldInner>
                  <Input
                    id={ `subtasks${ index }` }
                    { ...register(`subtasks.${ index }.title`) } 
                    aria-invalid={ formErrors.subtasks?.[index] ? "true" : "false" }
                    aria-describedby={ formErrors.subtasks?.[index]? `subtasksError${index}` : "" } />
                  <RemoveInput
                    type="button" 
                    onClick={ () => removeSubtask(index) }>
                    <Image
                      src={ removeIcon }
                      alt=""
                      aria-hidden="true" />
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
                    value={ column.title }
                     />
                )) }
              </Ariakit.SelectPopover>
          </Select>
        </FieldWrapper>
        <MainFormButton type="submit">Create Task</MainFormButton>
        <Close
          type="button" 
          onClick={ exit }>Close</Close>
      </Wrapper>
    </>
  )
}


export default Create