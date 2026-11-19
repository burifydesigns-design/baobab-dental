const { MongoClient } = require("mongodb");

let clientPromise;
async function getDb() {
  if (!process.env.MONGODB_URI) throw new Error("MongoDB is not configured. Set MONGODB_URI in the deployment environment.");
  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 5000
    });
    clientPromise = client.connect().catch(error => {
      clientPromise = undefined;
      throw error;
    });
  }
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "baobab_dental");
  await Promise.all([
    db.collection("appointment_requests").createIndex({ createdAt: -1 }),
    db.collection("appointment_requests").createIndex({ status: 1, createdAt: -1 }),
    db.collection("admin_audit_logs").createIndex({ createdAt: -1 })
  ]);
  return db;
}
module.exports = { getDb };
