import { AnimationProps } from "framer-motion"


export const fadeVariant: AnimationProps = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0
  }
}

export const fadeLeftToRightVariant: AnimationProps = {
  initial: {
    opacity: 0
  },  
  animate: {
    opacity: 1,
    x: [ "3%", "0%" ]
  },
  exit: {
    opacity: 0,
    x: [ "0%", "-50%" ]
  }
}