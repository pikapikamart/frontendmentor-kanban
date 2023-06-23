import { useExpansion } from "@/client/lib/hooks"
import { 
  Wrapper,  
  Trigger, 
  Dropdown} from "./options.styled"
import Image from "next/image"
import boardOption from "@/public/icons/boardOption.svg"
import { AnimatePresence } from "framer-motion"
import { fadeVariant, variantNaming } from "@/client/motion/variants"


type OptionsProps = {
  children: React.ReactNode
}

const Options = ({ children }: OptionsProps) =>{
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <>
      <Wrapper>
        <Trigger
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
    </>
  )
}


export default Options