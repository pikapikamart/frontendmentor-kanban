import { useExpansion } from "@/client/lib/hooks"
import { 
  BoardItem,
  BoardItemTrigger,
  Dropdown,
  Trigger, 
  Wrapper } from "./board.styled"
import boardOption from "@/public/icons/boardOption.svg"
import Image from "next/image"
import { AnimatePresence } from "framer-motion"
import { 
  fadeVariant, 
  variantNaming } from "@/client/motion/variants"


const Board = () =>{
  const [ isExpanded, handleExpansion ] = useExpansion()

  return (
    <Wrapper>
      <Trigger
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
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
              <BoardItem>
                <BoardItemTrigger 
                  type="button">Edit Board
                </BoardItemTrigger>
              </BoardItem>
              <BoardItem>
                <BoardItemTrigger 
                  type="button">Delete Board
                </BoardItemTrigger>
              </BoardItem>
            </ul>
          </Dropdown>
        ) }
      </AnimatePresence>
    </Wrapper>
  )
}


export default Board