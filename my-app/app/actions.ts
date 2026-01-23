'use server'

const { MongoClient, ServerApiVersion } = require('mongodb');
  const dbNameEnv = process.env.DB_NAME;
  const nameEnv = process.env.USERNAME;
  const passEnv = process.env.PASSWORD;
  const uri = `mongodb+srv://${nameEnv}:${passEnv}@${dbNameEnv}.izhaz6k.mongodb.net/?appName=${dbNameEnv}`

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function consoleLog() {
  console.log("Button clicked!"); 
}

export async function pingMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export async function createDummyItem(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  console.log(`Username: ${username}, Password: ${password}`);
  try {
    await client.connect();
    const database = client.db("fsproject");
    const collection = database.collection("users");
    const doc = { username: username, password: password };
    const result = await collection.insertOne(doc);
    console.log(`New document created with the following id: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}