import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import * as Ariakit from '@ariakit/react'
import { useDispatch } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { 
  CreateTaskSchema, 
  createTaskSchema } from "./schema"


export const useCreateTask = ( exit: ExitCallback ) => {
  const { currentBoard } = useCurrentBoard()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors: formErrors }} = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      status: currentBoard?.column[0].title?? "",
      boardPath: currentBoard?.linkPath?? ""
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

      if ( !currentBoard ) return

      dispatch({
        type: "ADD_TASK",
        payload: {
          ...data.content,
          linkPath: currentBoard.linkPath
        }
      })
      exit()
    }
  })
  const select = Ariakit.useSelectStore({ 
    defaultValue: currentBoard?.column[0].title?? "",
    setValue: ( value ) => {
      setValue("status", value)
    }
  })
  
  const onSubmit: SubmitHandler<CreateTaskSchema> = data => {

    if ( currentBoard?.column.some(column => column.tasks.some(task => task.title===data.title)) ) {
      setError("title", { message: "Task title already exist" })

      return
    }

    mutate(data)
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