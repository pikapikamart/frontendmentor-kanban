import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import { useDispatch, useTrackedState } from "@/store"
import { 
  createBoardSchema,
  CreateBoardSchema } from "./schema"


export const useCreateBoard = ( exit: ExitCallback ) => {
  const { boards } = useTrackedState()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors: formErrors }} = useForm<CreateBoardSchema>({ resolver: zodResolver(createBoardSchema) })
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
    boards.some(board => board.title===data.title)? setError("title", { message: "Board title already exist" }) : mutate(data)
  }

  const handleAddColumn = () => append({ title: "" })

  const removeColumn = ( index: number ) => remove(index)

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