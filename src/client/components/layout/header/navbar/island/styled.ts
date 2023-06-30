import { rem } from "@/client/styled/functions";
import styled from "styled-components";


export const Input = styled.input`
  height: ${ rem(18) };
  width: ${ rem(18) };

  &:first-of-type {
    
    + label {
      position: relative;
      padding-right: ${ rem(24) };
      z-index: 3;

      &::before {
        content: "";
        background-color: ${ ({ theme }) => theme.colors.colorSchemeInput };
        border-radius: ${ rem(12) };
        height: ${ rem(20) };
        position: absolute;
        right: -${ rem(40) };
        width: ${ rem(40) };
      }

      &::after {
        content: "";
        background-color: #FFFFFF;
        border-radius: 50%;
        height: ${ rem(14) };
        inset: ${ rem(3) } -${ rem(37) } auto auto;
        position: absolute;
        transition: transform .3s ease;
        width: ${ rem(14) };
      }
    }

    &:checked {

      + label {
        z-index: 1;

        &::after {
          transform: translateX(-17px);
        }
      }
    }
  }

  &:last-of-type {

    + label {
      padding-left: ${ rem(64) };
      position: relative;
      z-index: 2;
    }
  }
`

export const Wrapper = styled.fieldset`
  align-items: center;
  background-color: #F4F7FD;
  border-radius: ${ rem(8) };
  display: flex;
  height: ${ rem(48) };
  justify-content: center;
  margin: ${ rem(16) } 0 0 ${ rem(16) };
  position: relative;

  &:focus-within {

    ${ Input } {

      &:first-of-type {

        + label::before {
          outline: 2px dashed rgb(0, 36, 58);
          outline-offset: 1px;
        }
      }
    }
  }
`