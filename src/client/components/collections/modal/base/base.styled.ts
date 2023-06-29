import { 
  breakpoint,
  fluid, 
  rem } from "@/client/styled/functions"
import { MainButton } from "@/client/styled/shared/button"
import { motion } from "framer-motion"
import styled, { css } from "styled-components"


export const Description = styled.p`
  color: ${ ({ theme }) => theme.colors.default };
  font-size: ${ rem(13) };
  font-weight: 500;
  line-height: 1.8;
  margin-bottom: ${ rem(26) };
`

export const RowOptionsWrapper = styled.div`
  display: grid;
  gap: ${ rem(16) } 0;
  grid-template-columns: 1fr;

  ${ breakpoint("tablet", `
    grid-template-columns: 1fr 1fr;
    gap: 0 ${ rem(16) };
  `) }
`

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

export const MainFormButton = styled(MainButton)`
  font-size: ${ rem(13) };
  height: ${ rem(40) };
  width: 100%;
`

export const WarningButton = styled(MainFormButton)`
  background-color: ${ ({ theme }) => theme.colors.button.warning };
`

export const SecondaryButton = styled(MainFormButton)`
  margin-top: 0;

  ${ ({ theme }) => css`
    background-color: ${  theme.colors.button.secondary };
    color: ${ theme.colors.button.main };
  ` }
`

export const Close = styled(SecondaryButton)`
  margin-top: ${ rem(8) };
`

export const Error = styled.span`
  color: rgb(255, 0, 0);
  display: block;
  font-size: ${ rem(12) };
  margin-top: ${ rem(4) };
`

const inputCss = css`
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

export const Select = styled.div`

  .select {
    ${ inputCss };
    display: flex;
    justify-content: space-between;
  }

  .popover {
    background-color: ${ ({ theme }) => theme.colors.boardDropdown };
    border-radius: ${ rem(8) };
    box-shadow: 0 10px 40px 0 rgba(54, 78, 126, .25);
    overflow: hidden;
    z-index: 5;

    &:focus-visible {
      outline: none;
    }
  }

  .select-item {
    color: ${ ({ theme }) => theme.colors.default };
    font-size: ${ rem(13) };
    font-weight: 500;

    padding: ${ rem(10) } 0 ${ rem(8) } ${ rem(16) };

    &[data-active-item] {
      background-color: ${ ({ theme }) => theme.colors.button.main };
      color: #FFFFFF;
    }
  }
`

export const Input = styled.input`
  ${ inputCss };
`

export const Textarea = styled(Input).attrs(() => ({
  as: "textarea",
  rows: 6
}))`
  line-height: 1.5;
  resize: none;
`

export const Label = styled.label`
  color: ${ ({ theme }) => theme.colors.form.label };
  display: block;
  font-size: ${ rem(12) };
  font-weight: 700;
  margin-bottom: ${ rem(8) };

  ${ Error } {
    display: inline;
  }
`

export const FieldWrapper = styled.div`
  margin-bottom: ${ rem(24) };
`

export const Heading = styled.h2`
  color: ${ ({ theme }) => theme.colors.form.heading };
  font-size: ${ rem(18) };
  line-height: 1.2;
  margin: 0 ${ rem(24) } ${ fluid(24, 3.2, 32) } 0;
`

export const WarningHeading = styled(Heading)`
  color: ${ ({ theme }) => theme.colors.button.warning };
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