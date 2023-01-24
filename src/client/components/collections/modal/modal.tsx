import { createPortal } from "react-dom"
import { 
  BaseModalOnClickExit, 
  BaseModalWrapper, 
  ModalDocument} from "./modal.styled"
import { useBaseModalFocus } from "./modal.hook"


type ModalProps = {
  children: React.ReactNode,
  exit: () => void,
  focusBackRef: HTMLElement | null
}

const Modal = ({ children, exit, focusBackRef }: ModalProps) =>{
  const { modalRef } = useBaseModalFocus()

  const exitModal = () =>{
    focusBackRef?.focus()
    exit()
  }

  return createPortal(
    <BaseModalWrapper
      ref={ modalRef }
      role="dialog"
      tabIndex={ -1 }
      aria-labelledby="modal-heading" >
      <ModalDocument role="document">
        <BaseModalOnClickExit onClick={ exitModal } />
        { children }
      </ModalDocument>
    </BaseModalWrapper>,
    document.body
  )
}


export default Modal