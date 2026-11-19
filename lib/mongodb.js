const { MongoClient } = require("mongodb");

let clientPromise;
let indexesPromise;
async function getDb() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB is not configured. Set MONGODB_URI in the deployment environment.");
  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 0,
      maxIdleTimeMS: 60_000,
      serverSelectionTimeoutMS: 5_000,
      appName: "baobab-dental-demo"
    });
    clientPromise = client.connect().catch(error => {
      clientPromise = undefined;
      indexesPromise = undefined;
      throw error;
    });
  }
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "baobab_dental");
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      db.collection("appointment_requests").createIndex({ createdAt: -1 }),
      db.collection("appointment_requests").createIndex({ status: 1, createdAt: -1 }),
      db.collection("admin_audit_logs").createIndex({ createdAt: -1 }),
      db.collection("admin_login_attempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    ]).catch(error => {
      indexesPromise = undefined;
      throw error;
    });
  }
  await indexesPromise;
  return db;
}
module.exports = { getDb };
