import { 
  fluid, 
  rem } from "@/client/styled/functions";
import { MainButton } from "@/client/styled/shared/button";
import styled from "styled-components";


export const Wrapper = styled(MainButton)`
  height: ${ fluid(32, 6, 48) }; 
  margin-left: auto;
  padding: 0 ${ fluid(18, 4.8, 24) };
`