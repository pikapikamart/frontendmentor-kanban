import { createPortal } from "react-dom"


type ModalProps = {
  chilren: React.ReactNode
}

const Modal = ({ chilren }: ModalProps) =>{

  return (
    <>
    {/* add an exiter in here */}
      { createPortal(chilren, document.body) }
    </>
  )
}


export default Modal