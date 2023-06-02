import { 
  fluid, 
  rem } from "@/client/styled/functions"
import { motion } from "framer-motion"
import styled, { css } from "styled-components"


export const RemoveInput = styled.button`
  display: grid;
  height: ${ rem(15) };
  margin-left: ${ rem(16) };
  place-content: center;
  width: ${ rem(15) };
`

export const RowFieldInner = styled.div`
  align-items: center;
  display: flex;
`

export const RowFieldWrapper = styled(motion.div)`
  margin-bottom: ${ rem(12) };
`

export const Button = styled.button`
  background-color: ${ ({ theme }) => theme.colors.button.main };
  border-radius: ${ rem(32) };
  color: #FFFFFF;
  display: grid;
  font-size: ${ rem(13) };
  font-weight: 700;
  height: ${ rem(40) };
  place-content: center;
  width: 100%;
`

export const Close = styled(Button)`
  margin-top: ${ rem(8) };

  ${ ({ theme }) => css`
    background-color: ${  theme.colors.button.secondary };
    color: ${ theme.colors.button.main };
  ` }
`

export const AddRowField = styled(Close)``

export const Error = styled.span`
  color: rgb(255, 0, 0);
  display: block;
  font-size: ${ rem(12) };
  margin-top: ${ rem(4) };
`

export const Input = styled.input`
  border-radius: ${ rem(4) };
  border: 1px solid rgba(130, 143, 163, .25);
  display: block;
  font-size: ${ rem(13) };
  padding: ${ rem(12) } ${ rem(16) };
  width: 100%;

  &[aria-invalid="true"] {
    border-color: rgb(255, 0, 0);
  }
`

export const Textarea = styled(Input).attrs(() => ({
  as: "textarea"
}))`
  resize: none;
`

export const Label = styled.label`
  color: ${ ({ theme }) => theme.colors.form.label };
  display: block;
  font-size: ${ rem(12) };
  font-weight: 700;
  margin-bottom: ${ rem(8) };
`

export const FieldWrapper = styled.div`
  margin-bottom: ${ rem(24) };
`

export const Heading = styled.h2`
  color: ${ ({ theme }) => theme.colors.form.heading };
  font-size: ${ rem(18) };
  line-height: 1.2;
  margin-bottom: ${ fluid(24, 3.2, 32) };
`

export const Wrapper = styled.form`
  background-color: ${ ({ theme }) => theme.colors.form.background};
  border-radius: ${ rem(6) };
  max-width: ${ rem(480) };
  margin: 0 auto;
  padding: ${ fluid(24, 3.2, 32) };
  position: relative;
  z-index: 1;
`