import { 
  ToastMessage, 
  ToastWrapper } from "../toast.styled"


type ErrorProps = {
  message: string
}

const Success = ({ message }: ErrorProps) =>{

  return (
    <ToastWrapper colored="success">
      <ToastMessage>{ message }</ToastMessage>
    </ToastWrapper>
  )
}


export default Success