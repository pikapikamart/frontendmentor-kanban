import { 
  ToastMessage, 
  ToastStatus, 
  ToastWrapper } from "../toast.styled"


type ErrorProps = {
  message: string
}

const Error = ({ message }: ErrorProps) =>{

  return (
    <ToastWrapper colored="red">
      <ToastMessage>{ message }</ToastMessage>
    </ToastWrapper>
  )
}


export default Error