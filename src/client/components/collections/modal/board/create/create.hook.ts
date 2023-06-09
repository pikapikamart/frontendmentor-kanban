import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import { useDispatch } from "@/store"


const createBoardSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title should not be empty")
    .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  column: z.array(z.object({
    title: z
      .string({ required_error: "Column title is required" })
      .min(1, "Column title should not be empty")
      .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  }))
})

type CreateBoardSchema = z.infer<typeof createBoardSchema>

export const useCreateBoard = ( exit: ExitCallback ) => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors }} = useForm<CreateBoardSchema>({
    resolver: zodResolver(createBoardSchema)
  })
  const { 
    fields, 
    append, 
    remove } = useFieldArray({
    name: "column",
    control
  })
  const { 
    isLoading, 
    mutate,
    error: apiError } = trpc.board.create.useMutation({
    onSuccess: ( data ) => {
      dispatch({
        type: "ADD_BOARD",
        payload: data.content
      })
      exit()
    }
  })
  
  const onSubmit: SubmitHandler<CreateBoardSchema> = data => {
    mutate(data)
  }

  const handleAddColumn = (index: number) =>{
    append({
      title: ""
    })
  }

  const removeColumn = ( index: number ) => {
    remove(index)
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formErrors,
    fields,
    handleAddColumn,
    removeColumn,
    isLoading,
    apiError
  }
}