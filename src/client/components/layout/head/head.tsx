import Head from "next/head";


const HTMLHead = () =>{

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* add description */}
      <meta name="description" content=""/>
      {/* add keywords */}
      <meta name="keywords" content="" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* change title */}
      <title>Next.Js</title>
    </Head>
  )
}


export default HTMLHead;