import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import * as Ariakit from '@ariakit/react'
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { 
  editTaskSchema,
  EditTaskSchema } from "./schema"


export const useEditTask = ( exit: ExitCallback ) => {
  const { currentBoard } = useCurrentBoard()
  const { currentTask } = useTrackedState()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors: formErrors }} = useForm<EditTaskSchema>({
    resolver: zodResolver(editTaskSchema),
    defaultValues: {
      ...currentTask,
      boardPath: currentBoard?.linkPath?? "",
    }
  })
  const { 
    fields, 
    append, 
    remove } = useFieldArray({
    name: "subtasks",
    control
  })
  const { 
    isLoading, 
    mutate,
    error: apiError } = trpc.task.edit.useMutation({
    onSuccess: ( data ) => {
      dispatch({
        type: "EDIT_TASK",
        payload: {
          ...data.content,
          linkPath: currentBoard?.linkPath?? ""
        }
      })
      dispatch({
        type: "SET_CURRENT_TASK",
        payload: data.content
      })
      exit()
    }
  })
  const select = Ariakit.useSelectStore({ 
    defaultValue: currentTask?.status?? "",
    setValue: ( value ) => {
      setValue("status", value)
    }
  })
  
  const onSubmit: SubmitHandler<EditTaskSchema> = data => {

    if ( currentBoard?.column.some(column => column.tasks.some(task => task.id!==currentTask?.id && task.title===data.title)) ) {
      setError("title", { message: "Task title already exist" })

      return
    }

    mutate({
      ...data,
      id: currentTask?.id?? "",
      boardPath: currentBoard?.linkPath?? ""
    })
  }

  const handleAddSubtask = () => append({ title: "" })

  const removeSubtask = ( index: number ) => remove(index)

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    fields,
    handleAddSubtask,
    removeSubtask,
    isLoading,
    apiError,
    select
  }
}