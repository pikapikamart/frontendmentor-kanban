import { 
  breakpoint, 
  fluid, 
  rem } from "@/client/styled/functions"
import Image from "next/image"
import styled, { css } from "styled-components"
import { CreateBoardButton } from "./navbar/board/board.styled"


export const ShowSidebar = styled.button`
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

type WrapperProps = {
  isExpanded: boolean
}

export const Wrapper = styled.header<WrapperProps>`
  align-items: center;
  background-color: ${ ({ theme }) => theme.colors.header };
  display: flex;
  min-height: ${ fluid(64, 10.5, 98) };
  padding: 0 ${ fluid(16, 3.4, 34) } 0 ${ fluid(16, 3.4, 34) };
  transition: transform .3s ease;

  ${ breakpoint("tablet", `
    position: relative;
  `) }
`

export const LogoWrapper = styled.div`
  margin-right: ${ rem(16) };

  ${ breakpoint("tablet", `
    border-right: 
    flex-basis: ${ fluid(260, 30, 300) };
  `) }
`

export const NextMobileLogo = styled(Image)`

  ${ breakpoint("tablet", `
    display: none;
  `) }
`

export const NextDesktopLogo = styled(Image)`
  display: none;

  ${ breakpoint("tablet", `
    display: block;
  `) }
`