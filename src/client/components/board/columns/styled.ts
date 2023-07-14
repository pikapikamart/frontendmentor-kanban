import { 
  fluid, 
  rem } from "@/client/styled/functions";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";


export const NewColumn = styled.button`
  border-radius: ${ rem(6) };
  display: grid;
  flex-basis: ${ rem(280) };
  font-size: ${ fluid(18, 2.4, 24) };
  font-weight: 700;
  height: 100%;
  min-height: calc(100vh - ${ fluid(108, 14, 146) });
  place-content: center;
  width: 100%;

  ${ ({ theme }) => css`
    background-color: ${ theme.colors.columnAddition };
    color: ${ theme.colors.default };
  ` }
`

export const Wrapper = styled(motion.ul)`
  align-items: flex-start;
  display: flex;
  min-height: calc(100vh - ${ fluid(64, 10.5, 98) });
  overflow-x: auto;
  padding: ${ rem(24) } ${ fluid(16, 2.4, 24) }
`