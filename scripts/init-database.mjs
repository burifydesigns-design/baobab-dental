import { MongoClient } from "mongodb";
import { collectionDefinitions } from "../lib/database-schema.js";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "baobab_dental";

if (!uri) {
  console.error("MONGODB_URI is required. Set it in your local shell; do not commit it.");
  process.exit(1);
}
if (!/^[a-zA-Z0-9_-]{1,63}$/.test(databaseName)) {
  console.error("MONGODB_DB must be a valid MongoDB database name.");
  process.exit(1);
}

const client = new MongoClient(uri, {
  maxPoolSize: 1,
  serverSelectionTimeoutMS: 10000,
  appName: "baobab-dental-db-init"
});

try {
  await client.connect();
  const db = client.db(databaseName);
  console.log("Initializing database " + databaseName + "...");

  for (const definition of collectionDefinitions) {
    const exists = await db.listCollections({ name: definition.name }, { nameOnly: true }).hasNext();
    if (!exists) {
      await db.createCollection(definition.name, {
        validator: definition.validator,
        validationLevel: "strict",
        validationAction: "error"
      });
      console.log("Created collection: " + definition.name);
    } else {
      await db.command({
        collMod: definition.name,
        validator: definition.validator,
        validationLevel: "strict",
        validationAction: "error"
      });
      console.log("Updated validator: " + definition.name);
    }

    const collection = db.collection(definition.name);
    for (const index of definition.indexes) {
      await collection.createIndex(index.key, index.options);
      console.log("Ensured index: " + definition.name + "." + index.options.name);
    }
  }

  console.log("Database initialization completed. No patient or admin records were inserted.");
} catch (error) {
  console.error("Database initialization failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.close().catch(() => {});
}
