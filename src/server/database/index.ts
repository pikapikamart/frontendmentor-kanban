import mongoose from 'mongoose';
import { env } from '../env';


if ( !env.MONGODB_URI ) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

type Mongoose = {
  conn: null | typeof mongoose,
  promise: null | Promise<typeof mongoose>
}

declare global {
  var mongooseGlobal: Mongoose;
}

let cached = global.mongooseGlobal;

if (!cached) {
  cached = global.mongooseGlobal = { conn: null, promise: null };
}

async function connectDatabase() {

  if (cached.conn) {
    return cached.conn;
  }   

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    if ( env.isDevelopment ){
      cached.promise = mongoose.connect(env.MONGODB_URI, opts).then((mongoose) => mongoose);
    } else if ( env.isProduction ) {
      cached.promise = mongoose.connect(env.MONGODB_URI_PROD, opts).then((mongoose) => mongoose);
    }
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }
  
  return cached.conn ;
}


export { connectDatabase };