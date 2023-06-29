import { useExpansion } from "@/client/lib/hooks"
import { 
  Wrapper,  
  Trigger, 
  Dropdown} from "./options.styled"
import Image from "next/image"
import boardOption from "@/public/icons/boardOption.svg"
import { AnimatePresence } from "framer-motion"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"
import { forwardRef } from "react"


type OptionsProps = {
  children: React.ReactNode
}

const Options = forwardRef<HTMLButtonElement, OptionsProps>(({ children }, ref) =>{
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <Wrapper>
      <Trigger
        ref={ ref }
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }
        type="button">
        <Image
          src={ boardOption }
          alt=""
          aria-hidden="true" />
        <span className="sr-only">Board options</span>
      </Trigger>
      <AnimatePresence>
        { isExpanded && (
          <Dropdown
            { ...variantNaming }
            variants={ fadeVariant }>
            <ul>
              { children }
            </ul>
          </Dropdown>
        ) }
      </AnimatePresence>
    </Wrapper>
  )
})


export default Options