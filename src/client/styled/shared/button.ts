import { 
  fluid, 
  rem } from "@/client/styled/functions";
import styled from "styled-components";


export const MainButton = styled.button`
  background-color: ${ ({ theme }) => theme.colors.button.main };
  border-radius: ${ rem(32) };
  color: #FFFFFF;
  display: grid;
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ rem(48) };
  padding: 0 ${ rem(18) };
  place-content: center;
`