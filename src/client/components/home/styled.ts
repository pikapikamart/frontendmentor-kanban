import { rem } from "@/client/styled/functions";
import styled from "styled-components";


export const SubHeading = styled.h2`
  color: ${ ({ theme }) => theme.colors.default };
  font-size: ${ rem(18) };
  line-height: 1.16;
  margin-bottom: ${ rem(32) };
`

export const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  min-height: inherit;
  padding: 0 ${ rem(16) };
  place-content: center; 
  text-align: center;
`