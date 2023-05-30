import { motion } from "framer-motion";
import styled from "styled-components";


export const VariantWrapper = styled(motion.div).attrs(() => ({
  initial: "initial",
  animate: "animate",
  exit: "exit"
}))`
`