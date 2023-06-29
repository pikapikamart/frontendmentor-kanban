import { GlobalStyle } from "@/client/styled/base"
import { HTMLLayoutHead } from "../head"
import { Header } from "../header"


const Default = ( page: React.ReactElement ) =>{

  return (
    <>
      <HTMLLayoutHead />
      <GlobalStyle />
      <Header />
      { page }
    </>
  )
}


export default Default