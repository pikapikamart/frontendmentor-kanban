import { 
  fluid, 
  rem } from "@/client/styled/functions";
import styled from "styled-components";


export const Wrapper = styled.button`
  background-color: ${ ({ theme }) => theme.colors.button.main };
  border-radius: ${ rem(32) };
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ fluid(32, 6, 48) }; 
  margin-left: auto;
  padding: 0 ${ fluid(18, 4.8, 24) };
  place-content: center;
`