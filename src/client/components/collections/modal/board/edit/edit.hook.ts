import { 
  useFieldArray, 
  useForm,
  SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "@/client/lib/trpc"
import { ExitCallback } from "types/utils"
import { 
  useDispatch, 
  useTrackedState } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"
import { createBoardSchema } from "../create/create.hook"
import z from "zod"


const editBoardSchema = createBoardSchema.merge(z.object({
  linkPath: z.string({required_error: "Linkpath is required"})
}))

type EditBoardSchema = z.infer<typeof editBoardSchema>

export const useEditBoard = ( exit: ExitCallback ) => {
  const { boards } = useTrackedState()
  const { path } = useCurrentBoard()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors }} = useForm<EditBoardSchema>({
    resolver: zodResolver(editBoardSchema),
    defaultValues: {
      title: boards.find(board => board.linkPath===path)?.title?? "",
      linkPath: path,
      column: boards
        .find(board => board.linkPath===path)
        ?.column
          .reduce((accu, curr) => accu.concat({ title: curr.title }), [] as { title: string }[])
    }
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
    error: apiError } = trpc.board.edit.useMutation({
    onSuccess: ( data ) => {
      dispatch({
        type: "ADD_BOARD",
        payload: data.content
      })
      exit()
    }
  })
  const onSubmit: SubmitHandler<EditBoardSchema> = data => {
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