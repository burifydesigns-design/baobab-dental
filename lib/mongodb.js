import { MongoClient } from "mongodb";
// Worker TCP connections are not reusable across invocations. Open and close
// one client per request instead of keeping a module-level pool.
export async function withDb(env, operation) {
  if (!env.MONGODB_URI) throw new Error("MongoDB is not configured. Set MONGODB_URI in the Pages environment.");
  const client = new MongoClient(env.MONGODB_URI, {
    maxPoolSize: 1, minPoolSize: 0, maxIdleTimeMS: 10000,
    serverSelectionTimeoutMS: 5000, appName: "baobab-dental-demo"
  });
  try {
    await client.connect();
    const db = client.db(env.MONGODB_DB || "baobab_dental");
    await Promise.all([
      db.collection("appointment_requests").createIndex({ createdAt: -1 }),
      db.collection("appointment_requests").createIndex({ status: 1, createdAt: -1 }),
      db.collection("admin_audit_logs").createIndex({ createdAt: -1 }),
      db.collection("admin_login_attempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
    ]);
    return await operation(db);
  } finally {
    await client.close().catch(error => console.error("MongoDB close failed:", error.message));
  }
}
