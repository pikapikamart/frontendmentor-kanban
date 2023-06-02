import { 
  useFieldArray, 
  useForm } from "react-hook-form"


type CreateFormValues = {
  title: string,
  column: {
    title: string
  }[]
}

export const useCreateBoard = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CreateFormValues>()
  const { 
    fields, 
    append, 
    remove } = useFieldArray({
    name: "column",
    control
  })

  const onSubmit = ( data: CreateFormValues  ) => {
    console.log(data)
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
    errors,
    fields,
    handleAddColumn,
    removeColumn
  }
}