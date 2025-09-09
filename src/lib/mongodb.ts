import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL as string;
if (!uri) throw new Error("Please add your DATABASE_URL to .env");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // allow global var in dev
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
