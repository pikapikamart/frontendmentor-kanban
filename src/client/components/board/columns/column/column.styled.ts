import { rem } from "@/client/styled/functions";
import styled from "styled-components";


export const TasksList = styled.ul`
  
`

export const Title = styled.h3`
  color: ${ ({ theme }) => theme.colors.default };
  font-size: ${ rem(12) };
  font-weight: 700;
  line-height: 1.16;
  margin-bottom: ${ rem(10) };
`

export const Wrapper = styled.li`
  flex: 0 0 ${ rem(280) };
  
  &:not(:last-of-type) {
    margin-right: ${ rem(24) };
  }
`