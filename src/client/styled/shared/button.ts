import { 
  breakpoint, 
  rem } from "@/client/styled/functions";
import { motion } from "framer-motion";
import styled from "styled-components";


export const MainButton = styled(motion.button)`
  background-color: ${ ({ theme }) => theme.colors.button.main };
  border-radius: ${ rem(32) };
  color: #FFFFFF;
  display: grid;
  font-size: ${ rem(15) };
  font-weight: 700;
  height: ${ rem(48) };
  padding: 0 ${ rem(18) };
  place-content: center;

  ${ ({ theme }) => breakpoint("desktop", `
    transition: background-color .3s ease;

    &:hover {
      background-color ${ theme.colors.button.mainHover };  
    }

    &[aria-disabled=true]:hover {
      background-color: ${ theme.colors.button.main };
    }
  `) }
`