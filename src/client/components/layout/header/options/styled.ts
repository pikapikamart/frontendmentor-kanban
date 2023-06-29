import { 
  fluid, 
  rem } from "@/client/styled/functions";
import { MainButton } from "@/client/styled/shared/button";
import styled from "styled-components";



export const TaskButton = styled(MainButton)`
  height: ${ fluid(32, 6, 48) }; 
  margin: 0 ${ rem(8) } 0 auto;
  padding: 0 ${ fluid(18, 4.8, 24) };

  &[aria-disabled="true"] {
    cursor: not-allowed;
    opacity: .25;
  }
`