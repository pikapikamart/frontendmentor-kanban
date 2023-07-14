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
    opacity: 1,
    x: [ "0%", "0%" ],
  },  
  animate: {
    opacity: 1,
    x: [ "-100%", "0%" ],
    transition: {
      duration: .3
    }
  },
  exit: {
    opacity: 0,
    x: [ "0%", "-100%" ],
    transition: {
      duration: .3
    }
  }
}

export const swipeRightVariant: Variants = {
  initial: {
    opacity: 0,
    x: "-5%"
  },
  animate: {
    opacity: 1,
    x: "0%",
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