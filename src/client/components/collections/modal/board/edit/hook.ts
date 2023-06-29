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
import { 
  editBoardSchema,
  EditBoardSchema } from "./schema"
import { useRouter } from "next/router"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


export const useEditBoard = ( exit: ExitCallback ) => {
  const { boards } = useTrackedState()
  const { currentBoard } = useCurrentBoard()
  const { query, replace } = useRouter()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors: formErrors }} = useForm<EditBoardSchema>({
    resolver: zodResolver(editBoardSchema),
    defaultValues:  {
      title: currentBoard?.title?? "",
      linkPath: query.board as string?? "",
      column: currentBoard?.column.reduce((accu, curr) => accu.concat({ title: curr.title }), [] as { title: string }[])?? []
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
        type: "EDIT_BOARD",
        payload: data.content
      })
      
      data.content.oldPath? replace(data.content.linkPath) : null

      exit()
    }
  })
  const onSubmit: SubmitHandler<EditBoardSchema> = data => {

    if ( !currentBoard ) return

    boards.some(board => board.linkPath!==currentBoard.linkPath && board.title===data.title)? 
      setError("title", { message: "Board title already exist" }) :
      mutate(data)
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