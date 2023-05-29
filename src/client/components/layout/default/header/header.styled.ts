import { breakpoint, fluid, rem } from "@/client/styled/functions"
import Image from "next/image"
import styled from "styled-components"


export const Wrapper = styled.header`
  align-items: center;
  display: flex;
  min-height: ${ fluid(64, 10.5, 98) };
  padding: 0 ${ fluid(16, 3.4, 34) } 0 ${ fluid(16, 3.4, 34) }; 
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