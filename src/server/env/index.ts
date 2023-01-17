import { 
  cleanEnv,
  str } from "envalid"


const env = cleanEnv(process.env, {
  // change database selection
  MONGODB_URI: str(),
  // change database selection as well
  MONGODB_URI_PROD: str(),
  // unknown
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging']}),
})

export { env }