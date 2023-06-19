import styled, { css } from "styled-components";
import { Label } from "../../base/base.styled";
import { rem } from "@/client/styled/functions";


export const SubLabel = styled.label`
  color: ${ ({ theme }) => theme.colors.form.input };
  font-size: ${ rem(12) };
  font-weight: 700;
`

export const Checkbox = styled.input`
  height: ${ rem(16) };
  margin-right: ${ rem(16) };
  width: ${ rem(16) };

  &:checked + ${ SubLabel } {
    opacity: .5;
    text-decoration: line-through;
  }

`

export const SubtaskWrapper = styled.div`
  align-items: center;
  background-color: ${ ({ theme }) => theme.colors.body };
  border-radius: ${ rem(4) };
  display: flex;
  padding: ${ rem(12) };
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: ${ rem(8) };
  }
`

export const Legend = styled(Label)`
  margin-bottom: ${ rem(16) };
`