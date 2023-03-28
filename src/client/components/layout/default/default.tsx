import { GlobalStyle } from "@/client/styled/base"
import { HTMLLayoutHead } from "../head"
import { DefaultHeader } from "./header"


const Default = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLLayoutHead />
      <GlobalStyle />
      <DefaultHeader />
      { page }
      {/* <footer></footer> */}
    </>
  )
}


export default Default