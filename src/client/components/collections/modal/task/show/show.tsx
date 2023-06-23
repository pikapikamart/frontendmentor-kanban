import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  Description, 
  FieldWrapper, 
  Heading, 
  Label, 
  MainFormButton, 
  Select, 
  Wrapper } from "../../base/base.styled"
import { ExitCallback } from "types/utils"
import { 
  Checkbox, 
  HeadingContainer, 
  Legend, 
  SubLabel, 
  SubtaskWrapper } from "./show.styled"
import { isArrayEmpty } from "@/client/lib/utils"
import * as Ariakit from "@ariakit/react"
import { useShowTask } from "./show.hook"
import { AnimatePresence } from "framer-motion"
import Spinner from "../../../spinner/spinner"
import { Options } from "@/client/components/shared/options"
import { OptionItem, OptionTrigger } from "@/client/components/shared/options/options.styled"
import { useExpansion } from "@/client/lib/hooks"


type ShowProps = {
  task: TaskSchema,
  exit: ExitCallback
}

const Show = ({ task, exit }: ShowProps) =>{
  const { 
    select,
    currentBoard,
    handleSubtaskChange,
    handleSubmitTaskPartialEdit,
    isLoading,
    hasChanged } = useShowTask(task, exit)
  const [ editExpansion, handleEditExpansion ] = useExpansion()
  const [ deleteExpansion, handleDeleteExpansion ] = useExpansion()

  return (
    <>
      <AnimatePresence>
        { isLoading && <Spinner /> }
      </AnimatePresence>
      <Wrapper onSubmit={ handleSubmitTaskPartialEdit }>
        <HeadingContainer>
          <Heading>{ task.title }</Heading>
          <Options>
            <OptionItem>
              <OptionTrigger 
                onClick={ handleEditExpansion }
                aria-expanded={ editExpansion }>Edit Task</OptionTrigger>
            </OptionItem>
            <OptionItem>
              <OptionTrigger
                onClick={ handleDeleteExpansion }
                aria-expanded={ deleteExpansion }>Delete Task</OptionTrigger>
            </OptionItem>
          </Options>
        </HeadingContainer>
        <Description>{ task.description }</Description>
        { !isArrayEmpty(task.subtasks) && (
          <FieldWrapper>
            <Legend>{ task.subtasks.length > 1? "Subtasks" : "Subtask" } ({ task.subtasks.reduce((accu, curr) => curr.done? accu + 1 : accu, 0) } of { task.subtasks.length })</Legend>
            { task.subtasks.map((subtask, index) => (
              <SubtaskWrapper key={ `subtask-${ index }` }>
                <Checkbox
                  defaultChecked={ subtask.done }
                  id={ `subtask-${ index }` }
                  type="checkbox"
                  onChange={ () => handleSubtaskChange(subtask) }
                  onKeyDown={ e => e.key==="Enter"? e.preventDefault() : null } />
                <SubLabel htmlFor={ `subtask-${ index }` }>{ subtask.title }</SubLabel>
              </SubtaskWrapper>
            )) }
          </FieldWrapper>
        ) }
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
        <AnimatePresence>
          { hasChanged && <MainFormButton type="submit">Save changes</MainFormButton> }
        </AnimatePresence>
      </Wrapper>
    </>
  )
}


export default Show