import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import * as Ariakit from '@ariakit/react'
import { useDispatch } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title should not be empty")
    .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description should not be empty"),
  subtasks: z.array(z.object({
    title: z
      .string({ required_error: "Column title is required" })
      .min(1, "Column title should not be empty")
      .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  })),
  status: z
    .string({ required_error: "Status is required" })
    .min(1, "Status should not be empty"),
  boardPath: z
    .string({ required_error: "Boardpath is required" })
    .min(1, "Boardpath should not be empty"),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>

export const useCreateTask = ( exit: ExitCallback ) => {
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
  
  const onSubmit: SubmitHandler<CreateTaskSchema> = data => mutate(data)

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