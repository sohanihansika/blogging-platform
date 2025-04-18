// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI!;
// const options = {};

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//   throw new Error("Incorrect MongoDB URI");
// }

// if (!global._mongoClientPromise) {
//   client = new MongoClient(uri, options);
//   global._mongoClientPromise = client.connect().then((client) => {
//     console.log('MongoDB connected successfully');
//     return client;
//   });
// }
// clientPromise = global._mongoClientPromise;

// export default clientPromise;

import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

if( !uri) {
  throw new Error ("MongoDB URI is not defined");
}

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(uri, {
    dbName: "blogdb",
  });
};
