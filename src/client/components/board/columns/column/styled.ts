import { rem } from "@/client/styled/functions";
import styled from "styled-components";


type TitleProps = {
  backgroundColor: string
}

export const Title = styled.h3<TitleProps>`
  color: ${ ({ theme }) => theme.colors.default };
  font-size: ${ rem(12) };
  font-weight: 700;
  line-height: 1.16;
  margin-bottom: ${ rem(10) };
  padding-left: ${ rem(24) };
  position: relative;

  &::before {
    content: "";
    background-color: ${ ({ backgroundColor }) => backgroundColor };
    border-radius: 50%;
    height: ${ rem(15) };
    inset: 0 auto auto 0;
    position: absolute;
    width: ${ rem(15) };
  }
`

export const Wrapper = styled.li`
  flex: 0 0 ${ rem(280) };
  
  &:not(:last-of-type) {
    margin-right: ${ rem(24) };
  }
`