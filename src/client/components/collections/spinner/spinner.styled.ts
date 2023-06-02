import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"


const anim1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`

const anim2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`

const anim3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`

export const SpinnerWrapper = styled(motion.div)`
  background-color: rgba(0, 0, 0, .7);
  display: grid;
  inset: 0;
  place-content: center;
  position: fixed;
  z-index: 100;
`

export const SpinnerInner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  
    :nth-child(1) {
      left: 8px;
      animation: ${ anim1 } 0.6s infinite;
    }

    :nth-child(2) {
      left: 8px;
      animation: ${ anim2 } 0.6s infinite;
    }

    :nth-child(3) {
      left: 32px;
      animation: ${ anim2 } 0.6s infinite;
    }

    :nth-child(4) {
      left: 56px;
      animation: ${ anim3 } 0.6s infinite;
    }
  }
`