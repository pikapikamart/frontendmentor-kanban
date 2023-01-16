import { trpc } from "@/lib/trpc"
import { AppProps } from "next/app"


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <Component {...pageProps} />
  )
}


export default trpc.withTRPC(App)