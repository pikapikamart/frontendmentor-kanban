import { useState } from "react"
import { 
  BoardExpansion,
  BoardHeader, 
  Wrapper } from "./navbar.styled"
import { useExpansion } from "@/client/lib/hooks"
import chevron from "@/public/icons/icon-chevron-down.svg"
import Image from "next/image"
import { Board } from "./board"
import { useDetectResponsiveness } from "@/client/lib/hooks/useDetectResponsiveness"


const Navbar = () => {
  const [isExpanded, handleExpansion] = useExpansion()
  const isMobile = useDetectResponsiveness()

  console.log(isMobile)
  return (
    <Wrapper>
      <BoardHeader>
        <BoardExpansion 
          onClick={handleExpansion}
          aria-expanded={isExpanded}>Platform Launch
          <Image src={chevron} alt="" aria-hidden="true" />
        </BoardExpansion>
      </BoardHeader>
      { isExpanded && <Board /> }
    </Wrapper>
  )
}


export default Navbar