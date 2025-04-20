import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

let cached = global.mongoose

if(!cached){
    cached=global.mongoose={conn:null , promise:null}
}

export async function connectToDatabase(){
    // check if already connected
    if(cached.conn){
        return cached.conn
    }
    // promise in progress
    if(!cached.promise){
        const opts ={
            bufferCommands: true,
            maxPoolSize:10
        }
        // creating a new promise
        cached.promise =mongoose
        .connect(MONGODB_URI,opts)
        .then(()=>mongoose.connection)
    }
    try {
        // wait for the promise to resolve
        cached.conn = await cached.promise
        console.log("Connected to MongoDB")
        
    } catch (e) {
        // if error occurs, clear the promise
        cached.promise=null
        console.error("Error connecting to MongoDB",e)
        throw e 
    }
    return cached.conn
}