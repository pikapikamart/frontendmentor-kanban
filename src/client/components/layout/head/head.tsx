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
      {/* Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      <title>FrontendMentor | Kanban Task</title>
    </Head>
  )
}


export default HTMLHead;