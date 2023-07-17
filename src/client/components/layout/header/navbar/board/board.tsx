import Link from "next/link"
import { 
  BoardCounter, 
  BoardList,
  BoardLink,
  CreateBoardButton } from "./styled"
import { FullWidth } from "@/client/styled/shared/shared"
import { useExpansion } from "@/client/lib/hooks"
import { AnimatePresence } from "framer-motion"
import { ModalDocument } from "@/client/components/collections/modal"
import { useRef } from "react"
import { CreateBoardModal } from "@/client/components/collections/modal/board/create"
import { useTrackedState } from "@/store"
import { useCurrentBoard } from "@/client/lib/hooks/useCurrentBoard"


const Board = () => {
  const { currentBoard } = useCurrentBoard()
  const { boards } = useTrackedState()
  const [ isExpanded, handleExpansion ] = useExpansion()
  const focusBack = useRef<HTMLDivElement | null>(null)

  return (
    <FullWidth 
      ref={ focusBack }
      tabIndex={ -1 }>
      <BoardCounter>
        all boards
        <br />
        <span>({ boards.length })</span>
      </BoardCounter>
      <BoardList>
        { boards.map(board => (
          <li key={ board.title }>
            <Link legacyBehavior passHref href={ `/${ board.linkPath }` }>
              <BoardLink
                as="a" 
                aria-current={ currentBoard?.linkPath===board.linkPath? "page" : "false" }>
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
                  { board.title }
              </BoardLink>
            </Link>
          </li>
        )) }
      </BoardList>
      <CreateBoardButton
        type="button"
        onClick={ handleExpansion }
        aria-expanded={ isExpanded }>
        <svg width="16" aria-hidden="true" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" fill="#828FA3"/></svg>
        +Create New Board
      </CreateBoardButton>
      <AnimatePresence>
        { isExpanded && (
          <ModalDocument 
            focusBackRef={ focusBack.current } 
            exit={ handleExpansion }>
            <CreateBoardModal exit={ handleExpansion } />
            <button></button>
          </ModalDocument>
        ) }
      </AnimatePresence>
    </FullWidth>
  )
}


export default Board