import { rem } from "@/client/styled/functions"
import styled from "styled-components"


export const BoardCounter = styled.p`
  color: ${({ theme }) => theme.colors.default};
  font-size: ${ rem(12) };
  font-weight: bold;
  margin-bottom: ${ rem(4) };
  padding-left: ${ rem(24) };
  text-transform: uppercase;
`

export const BoardList = styled.ul`
  padding-right: ${ rem(8) };
`

export const BoardLink = styled.a`
  align-items: center;
  border-radius: 0 ${ rem(100) } ${ rem(100) } 0;
  color: ${({ theme }) => theme.colors.navlinks};
  display: flex;
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ rem(48) };
  padding-left: ${ rem(24) };

  &[aria-current=page] {
    background-color: ${({ theme }) => theme.colors.button.main};
    color: #FFFFFF;

    svg path {
      fill: #FFFFFF;
    }
  }

  svg {
    margin-right: ${ rem(12) };
    transform: translateY(1px);
  }
`

export const CreateBoardButton = styled.button`
  align-items: center;
  border-radius: 0 ${ rem(100) } ${ rem(100) } 0;
  color: ${({ theme }) => theme.colors.button.main};
  display: flex;
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ rem(48) };
  padding-left: ${ rem(24) };
  width: 100%;

  svg {
    margin-right: ${ rem(12) };
    transform: translateY(1px);

    path {
      fill: ${({ theme }) => theme.colors.button.main};
    }
  }
`
