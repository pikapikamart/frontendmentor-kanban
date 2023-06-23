import { 
  Description, 
  FieldWrapper, 
  Heading, 
  Label, 
  MainFormButton, 
  Select, 
  Wrapper } from "../../base/base.styled"
import { ExitProps } from "types/utils"
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
import { TaskOptions } from "./options"
import { useTrackedState } from "@/store"


const Show = ({ exit }: ExitProps) =>{
  const { currentTask } = useTrackedState()
  const { 
    select,
    currentBoard,
    handleSubtaskChange,
    handleSubmitTaskPartialEdit,
    isLoading,
    hasChanged } = useShowTask(exit)
  
  if ( !currentTask ) return <><button>s</button></>
  
  return (
    <>
      <AnimatePresence>
        { isLoading && <Spinner /> }
      </AnimatePresence>
      <Wrapper as="div">
        <HeadingContainer>
          <Heading>{ currentTask.title }</Heading>
          <TaskOptions />
        </HeadingContainer>
        <form onSubmit={ handleSubmitTaskPartialEdit }>
          <Description>{ currentTask.description }</Description>
          { !isArrayEmpty(currentTask.subtasks) && (
            <FieldWrapper>
              <Legend>{ currentTask.subtasks.length > 1? "Subtasks" : "Subtask" } ({ currentTask.subtasks.reduce((accu, curr) => curr.done? accu + 1 : accu, 0) } of { currentTask.subtasks.length })</Legend>
              { currentTask.subtasks.map((subtask, index) => (
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
        </form>
      </Wrapper>
    </>
  )
}


export default Show