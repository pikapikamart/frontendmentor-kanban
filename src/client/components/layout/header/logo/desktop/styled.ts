import styled from "styled-components";


type WrapperProps = {
  isDarkmode: boolean
}

export const Wrapper = styled.div<WrapperProps>`

  svg {
    
    path {
      ${ ({ isDarkmode }) => isDarkmode? "fill: #FFFFFF": "" }
    }
  }
`