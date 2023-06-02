import { Variants } from "framer-motion"


export const fadeVariant: Variants = {
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

export const fadeLeftToRightVariant: Variants = {
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

export const swipeRightVariant: Variants = {
  initial: {
    opacity: 0,
    x: "-5%"
  },
  animate: {
    opacity: 1,
    x: "0%"
  },
  exit: {
    opacity: 0,
    y: "50%"
  }
}

export const variantNaming = {
  initial: "initial",
  animate: "animate",
  exit: "exit"
}