import { 
  useForm,
  SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import { useDispatch } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


export const createColumnSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title should not be empty")
    .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters")
})

export type CreateColumnSchema = z.infer<typeof createColumnSchema>

export const useCreateColumn = ( exit: ExitCallback ) => {
  const { currentBoard } = useCurrentBoard()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors }} = useForm<CreateColumnSchema>({ resolver: zodResolver(createColumnSchema)})
  const { 
    isLoading, 
    mutate,
    error: apiError } = trpc.column.create.useMutation({
    onSuccess: ( data ) => {

      currentBoard? dispatch({
        type: "CREATE_COLUMN",
        payload: {
          ...data.content,
          linkPath: currentBoard.linkPath
        }
      }) : null

      exit()
    }
  })
  
  const onSubmit: SubmitHandler<CreateColumnSchema> = data => currentBoard? mutate({
    title: data.title,
    linkPath: currentBoard.linkPath
  }): null

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    isLoading,
    apiError
  }
}