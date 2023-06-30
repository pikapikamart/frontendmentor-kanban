import { 
  breakpoint, 
  fluid, 
  rem } from "@/client/styled/functions"
import styled, { css } from "styled-components"


export const LogoWrapper = styled.div`
  margin-right: ${ fluid(16, 3, 32) };

  ${ ({ theme }) => breakpoint("tablet", `
    align-items: center;
    border-right: 1px solid ${ theme.colors.border };
    display: flex;
    flex-basis: calc(${ fluid(260, 30, 300) } - ${ fluid(16, 3.4, 34) });
    min-height: inherit;
    position: relative;
    transition: flex-basis .3s ease;
  `) }
`

type WrapperProps = {
  isExpanded: boolean
}

export const Wrapper = styled.header<WrapperProps>`
  align-items: center;
  display: flex;
  min-height: ${ fluid(64, 10.5, 98) };
  padding: 0 ${ rem(8) } 0 ${ fluid(16, 3.4, 34) };
  
  ${ ({ theme }) => css`
    background-color: ${ theme.colors.header };
    border-bottom: 1px solid ${ theme.colors.border };
  ` }

  ${ breakpoint("tablet", `
    position: relative;
  `) }

  ${ ({ isExpanded }) => `
    ${ isExpanded && breakpoint("tablet", `
      ${ LogoWrapper } {
        flex-basis: calc(${ rem(200) } - ${ fluid(16, 3.4, 34) });
      }

      & + main {
        padding-left: 0;
      }
    `) }
    ${ breakpoint("desktop", `
      ${ LogoWrapper } {
        flex-basis: calc(${ rem(244) } - ${ fluid(16, 3.4, 34) });
      }
    `) }
  ` }
`