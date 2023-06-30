import styled from "styled-components";
import { Heading, Label } from "../../base/styled";
import { rem } from "@/client/styled/functions";
import { RowJustifyCenter } from "@/client/styled/shared/shared";


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

export const HeadingContainer = styled(RowJustifyCenter)`
  margin-bottom: ${ rem(32) };

  ${ Heading } {
    margin-bottom: 0;
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