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
import { 
  CreateTaskSchema, 
  createTaskSchema } from "../create/create.hook"
import z from "zod"
import { EditTaskSchema } from "@/server/controllers/task/mutation/schema"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const editTaskSchema = createTaskSchema
  .omit({ subtasks: true })
  .merge(z.object({
    subtasks: z.array(z.object({
      title: z
        .string({ required_error: "Column title is required" })
        .min(1, "Column title should not be empty")
        .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
      done: z
        .boolean()
        .optional(),
      id: z
        .string()
        .optional()
    }))
  }))

export const useEditTask = ( exit: ExitCallback ) => {
  const { currentBoard } = useCurrentBoard()
  const { currentTask } = useTrackedState()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setValue,
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
  
  const onSubmit: SubmitHandler<CreateTaskSchema> = data => {
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