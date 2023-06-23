import { 
  fluid, 
  rem } from "@/client/styled/functions";
import { motion } from "framer-motion";
import styled from "styled-components";


export const OptionTrigger = styled.button.attrs(() => ({
  type: "button"
}))`
  padding: ${ rem(10) } 0 ${ rem(12) };
  text-align: left;
  width: 100%;
`

export const OptionItem = styled.li`
  color: ${ ({ theme }) => theme.colors.navlinks };

  &:last-of-type {
    color: ${ ({ theme }) => theme.colors.button.warning };
  }
`

export const Dropdown = styled(motion.div)`
  background-color: ${ ({ theme }) => theme.colors.boardDropdown };
  border-radius: ${ rem(8) };
  box-shadow: 0 ${ rem(10) } ${ rem(40) } rgba(54, 78, 126, .25);
  font-size: ${ rem(13) };
  font-weight: 500;
  inset: calc(100% + ${ rem(32) }) 0 auto auto;
  padding: ${ rem(10) } ${ rem(16) } ${ rem(8) } ${ rem(16) };
  position: absolute;
  width: ${ rem(192) };
  z-index: 5;
`

export const Trigger = styled.button`
  padding: 0 ${ fluid(8, 1.7, 17) } 0 ${ fluid(8, 1.6, 16) };

  img {
    max-width: none;
  }
`

export const Wrapper = styled.div`
  position: relative;

  &:focus {
    outline: none;
  }
`