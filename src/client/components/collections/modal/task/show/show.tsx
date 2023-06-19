import { TaskSchema } from "@/server/controllers/task/query/schema"
import { 
  Description, 
  FieldWrapper, 
  Heading, 
  Label, 
  Select, 
  Wrapper } from "../../base/base.styled"
import { ExitCallback } from "types/utils"
import { 
  Checkbox, 
  Legend, 
  SubLabel, 
  SubtaskWrapper } from "./show.styled"
import { isArrayEmpty } from "@/client/lib/utils"
import * as Ariakit from "@ariakit/react"
import { useShowTask } from "./show.hook"


type ShowProps = {
  task: TaskSchema,
  exit: ExitCallback
}

const Show = ({ task }: ShowProps) =>{
  const { 
    select,
    currentBoard } = useShowTask()

  return (
    <>

      <Wrapper>
        <Heading>{ task.title }</Heading>
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
      </Wrapper>
    </>
  )
}


export default Show