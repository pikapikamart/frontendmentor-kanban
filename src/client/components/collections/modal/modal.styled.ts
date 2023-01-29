import { rem } from "@/client/styled/functions"
import styled from "styled-components"


// customize the background color

export const BaseModalOnClickExit = styled.div`
  inset: 0;
  position: absolute;
`

export const ModalDocument = styled.div`
  max-width: 100%;
  padding: ${ rem(96) } ${ rem(16) } ${ rem(64) };
`

export const BaseModalWrapper = styled.div`
  inset: 0;
  outline: none;
  overflow: hidden scroll;
  position: fixed;
  z-index: 1000;
`