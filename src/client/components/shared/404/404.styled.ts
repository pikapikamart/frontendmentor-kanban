import { 
  rem,
  fluid } from "@/client/styled/functions"
import styled from "styled-components"


export const Four04Information = styled.p`
  color: ${ ({ theme }) => theme.colors.heading.default };
  font-size: ${ fluid(14, 2, 18) };
  line-height: 1.4;
  margin-top: ${ fluid(16, 2.5, 32) };
  text-align: center;
`

export const Four04Heading = styled.h1`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: ${ fluid(20, 4, 48) };
  font-weight: 600;
  position: relative;

  > span {
    margin-top: ${ fluid(32, 4, 48) };
    font-size: ${ fluid(16, 2.5, 24) };
    font-weight: 400;
    position: relative;

    &::after {
      content: "";
      border-radius: ${ rem(8) };
      height: ${ rem(2) };
      inset: -${ rem(16) } auto auto 50%;
      position: absolute;
      transform: translateX(-50%);
      width: ${ fluid(56, 6, 80) };
    }
  }

  ${ ({ theme: { colors } }) => `
    color: ${ colors.heading.default };

    > span {
      color: ${ colors.heading.default };

      &::after {
        background-color: ${ colors.heading.default };
      }
    }
  ` }
`

export const Four04Wrapper = styled.div`
  margin: ${ fluid(48, 6, 80) } auto ${ rem(96) };
  max-width: ${ rem(432) };
  padding: 0 ${ rem(16) };
`