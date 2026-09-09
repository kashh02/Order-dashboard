import { MongoClient } from "mongodb";

function getClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to .env.local (see .env.example).");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!globalThis._mongoClientPromiseProd) {
    globalThis._mongoClientPromiseProd = new MongoClient(uri).connect();
  }
  return globalThis._mongoClientPromiseProd;
}

export async function getOrdersCollection() {
  const client = await getClientPromise();
  const dbName = process.env.MONGODB_DB || "analytics";
  return client.db(dbName).collection("orders");
}
