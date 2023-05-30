import { 
  breakpoint, 
  fluid, 
  rem } from "@/client/styled/functions"
import styled from "styled-components"


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