import { 
  breakpoint, 
  fluid } from "@/client/styled/functions";
import styled from "styled-components";


export const MainWrapper = styled.main`
  min-height: calc(100vh - ${ fluid(64, 10.5, 98) });
  transition: padding-left .3s ease;

  ${ breakpoint("tablet", `
    padding-left: ${ fluid(260, 30, 300) };
  `) }
`