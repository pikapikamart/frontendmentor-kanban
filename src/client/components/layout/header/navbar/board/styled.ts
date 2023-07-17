import { breakpoint, rem } from "@/client/styled/functions"
import styled, { css } from "styled-components"


export const BoardCounter = styled.p`
  color: ${({ theme }) => theme.colors.default};
  font-size: ${ rem(12) };
  font-weight: bold;
  margin-bottom: ${ rem(4) };
  padding-left: ${ rem(24) };
  text-transform: uppercase;
`

export const BoardList = styled.ul`
  padding-right: ${ rem(8) };
`

const NavBoardButton = styled.button`
  align-items: center;
  border-radius: 0 ${ rem(100) } ${ rem(100) } 0;
  display: flex;
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ rem(48) };
  padding-left: ${ rem(24) };

  svg {
    margin-right: ${ rem(12) };
    transform: translateY(1px);
  }

  ${ breakpoint("desktop", `
    transition: 
      background-color .3s ease,
      color .3s ease;

    svg path {
      transition: .3s ease
    }
  `) }
`

export const BoardLink = styled(NavBoardButton)`
  ${ ({ theme }) => css`
    color: ${ theme.colors.navlinks };

    &[aria-current=page] {
      background-color: ${ theme.colors.button.main};
      color: #FFFFFF;

      svg {
        
        path {
          fill: #FFFFFF;
        }
      }
    }

    ${ breakpoint("desktop", `
      &:not([aria-current=page]):hover {
        background-color: ${ theme.colors.navlinksHover };
        color: ${ theme.colors.button.main };

        svg path {
          fill: ${ theme.colors.button.main };
        }
      }
    `) }
  ` }

`

export const CreateBoardButton = styled(NavBoardButton)`
  color: ${({ theme }) => theme.colors.button.main};
  width: 100%;

  svg {

    path {
      fill: ${({ theme }) => theme.colors.button.main};
    }
  }
`
