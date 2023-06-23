import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import * as Ariakit from '@ariakit/react'
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { 
  CreateTaskSchema, 
  createTaskSchema } from "../create/create.hook"


export const useEditTask = ( exit: ExitCallback ) => {
  const { currentTask } = useTrackedState()
  const { currentBoard } = useCurrentBoard()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors: formErrors }} = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
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
    error: apiError } = trpc.task.create.useMutation({
    onSuccess: ( data ) => {
      dispatch({
        type: "ADD_TASK",
        payload: {
          ...data.content,
          boardPath: currentBoard?.linkPath?? ""
        }
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
  
  const onSubmit: SubmitHandler<CreateTaskSchema> = data => {
    // mutate(data)
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