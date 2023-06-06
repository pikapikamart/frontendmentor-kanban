import { 
  breakpoint, 
  fluid, 
  rem } from "@/client/styled/functions"
import styled, { css } from "styled-components"


export const LogoWrapper = styled.div`
  margin-right: ${ rem(16) };

  ${ breakpoint("tablet", `
    align-items: center;
    border-right: 1px solid #E4EBFA;
    display: flex;
    flex-basis: calc(${ fluid(260, 30, 300) } - ${ fluid(16, 3.4, 34) });
    min-height: inherit;
    position: relative;
    transition: flex-basis .3s ease;
  `) }

  ${ breakpoint("desktop", `
    
  `) }
`

type WrapperProps = {
  isExpanded: boolean
}

export const Wrapper = styled.header<WrapperProps>`
  align-items: center;
  background-color: ${ ({ theme }) => theme.colors.header };
  border-bottom: 1px solid #E4EBFA;
  display: flex;
  min-height: ${ fluid(64, 10.5, 98) };
  padding: 0 ${ fluid(16, 3.4, 34) } 0 ${ fluid(16, 3.4, 34) };

  ${ breakpoint("tablet", `
    position: relative;
  `) }

  ${ ({ isExpanded }) => `
    ${ isExpanded && breakpoint("tablet", `
      ${ LogoWrapper } {
        flex-basis: calc(${ rem(200) } - ${ fluid(16, 3.4, 34) });
      }
    `) }
    ${ breakpoint("desktop", `
      ${ LogoWrapper } {
        border-right: none;
        flex-basis: calc(${ fluid(260, 30, 300) } - ${ fluid(16, 3.4, 34) });
      }
    `) }
  ` }
`