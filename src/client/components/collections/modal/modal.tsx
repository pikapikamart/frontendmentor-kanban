import { createPortal } from "react-dom"
import { 
  BaseModalOnClickExit, 
  BaseModalWrapper, 
  ModalDocument} from "./modal.styled"
import { useBaseModalFocus } from "./modal.hook"
import { fadeVariant, variantNaming } from "@/client/motion/variants"


type ModalProps = {
  children: React.ReactNode,
  exit: () => void,
  focusBackRef: HTMLElement | null
}

const Modal = ({ children, exit, focusBackRef }: ModalProps) =>{
  const { modalRef } = useBaseModalFocus( focusBackRef )

  const exitModal = () =>{
    focusBackRef?.focus()
    exit()
  }

  return createPortal(
    <BaseModalWrapper
      ref={ modalRef }
      role="dialog"
      tabIndex={ -1 }
      key="baseModal"
      { ...variantNaming }
      variants={ fadeVariant }
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