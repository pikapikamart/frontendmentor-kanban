import Head from "next/head";


const HTMLHead = () =>{

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      {/* add description */}
      <meta name="description" content="Frontendmentor Kanban Task Management Application"/>
      {/* add keywords */}
      <meta name="keywords" content="Kanban task, task, kanban, frontendmentor" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* change title */}
      <title>FrontendMentor | Kanban Task</title>
    </Head>
  )
}


export default HTMLHead;