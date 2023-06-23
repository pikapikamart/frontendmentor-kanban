import { rem } from "@/client/styled/functions";
import styled, { css } from "styled-components";


export const SubtasksCount = styled.p`
  color: ${ ({ theme }) => theme.colors.default };
  font-size: ${ rem(12) };
  font-weight: 700;
`

export const TaskButton = styled.button`
  text-align: left;

  &::after {
    content: "";
    position: absolute;
  }
`

export const TaskTitle = styled.h4`
  color: ${ ({ theme }) => theme.colors.form.heading };
  font-size: ${ rem(15) };
  line-height: 1.2;
  margin-bottom: ${ rem(8) };
`

export const Wrapper = styled.li`
  background-color: ${ ({ theme }) => theme.colors.form.background };
  box-shadow: 0 4px 12px rgba(54, 78, 126, .1);
  border-radius: ${ rem(8) };
  padding: ${ rem(23) } ${ rem(16) };
  position: relative;

  &:not(:last-of-type) {
    margin-bottom: ${ rem(20) };
  }
`