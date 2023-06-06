import { 
  breakpoint, 
  fluid, 
  rem } from "@/client/styled/functions"
import styled from "styled-components"
import { Wrapper as IslandWrapper } from "@/client/components/layout/default/header/navbar/island/island.styled"
import { motion } from "framer-motion"
import { CreateBoardButton } from "./board/board.styled"


export const ShowSidebar = styled(motion.button)`
  background-color: ${ ({ theme }) => theme.colors.button.main };
  border-radius: 0 ${ rem(32) } ${ rem(32) } 0;
  display: grid;
  height: ${ rem(48) };
  inset: auto auto ${ rem(32) } 0; 
  place-content: center;
  position: fixed;
  width: ${ rem(56) };
`

export const HideSidebar = styled(CreateBoardButton)`
  color: ${ ({ theme }) => theme.colors.navlinks };
  margin-bottom: ${ rem(32) };

  img {
    margin-right: ${ rem(10) };
  }
`

export const InnerWrapper = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.navboard};
  border-radius: ${ rem(8) };
  inset: ${ rem(80) } 0 auto 0;
  margin: 0 auto;
  max-width: ${ rem(300) };
  padding: ${ rem(16) } ${ rem(16) } ${ rem(16) } 0;
  position: absolute;
  z-index: 1;
  
  ${ breakpoint("tablet", `
    border-radius: 0;
    display: flex;
    flex-direction: column;
    min-height: inherit;
    justify-content: space-between;
    margin-top: 0;
    position: static;
    padding: ${ rem(32) } ${ rem(20) } 0 0;

    ${ IslandWrapper } { 
      align-self: end;
      margin-bottom: ${ rem(16) };
    }
  `) }

  ${ breakpoint("desktop", `
    padding: ${ rem(14) } ${ rem(20) } 0 0;
  `) }
`

export const DropdownOverlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, .5);
  height: 100%;
  inset: ${ rem(64) } 0 0 0;
  position: fixed;
  top: ${ rem(64) };
  width: 100%;
`

export const Wrapper = styled(motion.nav)`

  ${ ({ theme }) => `
  
    ${ breakpoint("tablet", `
      background-color: ${ theme.colors.header };
      border-right: 1px solid #E4EBFA;
      inset: 100% auto auto 0;
      min-height: calc(100vh - ${ fluid(64, 10.5, 98) });
      position: absolute;
      width:${ fluid(260, 30, 300) };

      &::before {
        content: "";
        background-color: #E4EBFA;
        height: ${ fluid(64, 10.5, 98) };
        inset: 0 -1px auto auto;
        position: absolute;
        transform: translateY(-100%);
        width: 1px;
        z-index: 10;
      }
    `) }
  ` }

`

export const NavHeading = styled.h1`
  color: ${ ({ theme }) => theme.colors.boardHeading };
  font-size: ${ fluid(18, 2.6, 24) };
`

export const NavExpansion = styled.button`
  align-items: center;
  display: flex;
  position: relative;

  img {
    margin-left: ${ rem(8) };
    transition: transform .3s ease;
  }

  &[aria-expanded=true] {

    img {
      transform: rotate(180deg);
    }
  }
`