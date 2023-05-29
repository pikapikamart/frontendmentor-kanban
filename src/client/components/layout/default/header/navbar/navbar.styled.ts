import { rem } from "@/client/styled/functions"
import styled from "styled-components"


export const Wrapper = styled.nav`
`

export const BoardHeader = styled.h1`
  font-size: ${ rem(18) };
`

export const BoardExpansion = styled.button`
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