import { GlobalStyle } from "@/client/styled/base"
import { HTMLLayoutHead } from "../head"


const Default = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLLayoutHead />
      <GlobalStyle />
      {/* <header></header> */}
      { page }
      {/* <footer></footer> */}
    </>
  )
}


export default Default