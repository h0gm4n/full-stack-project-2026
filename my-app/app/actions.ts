'use server'

import { cookies } from "next/headers";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { MongoClient, ServerApiVersion } = require('mongodb');
const dbNameEnv = process.env.DB_NAME;
const nameEnv = process.env.USERNAME;
const passEnv = process.env.PASSWORD;
const clusterNameEnv = process.env.CLUSTER_NAME;
const userCollectionEnv = process.env.USER_COLLECTION;

const uri = `mongodb+srv://${nameEnv}:${passEnv}@${clusterNameEnv}.izhaz6k.mongodb.net/?appName=${clusterNameEnv}`

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

export async function logout() {
  (await cookies()).delete('auth_token');
  return "Logged out successfully";
}

export async function validateLogin(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  try {
    await client.connect();
    const database = client.db(dbNameEnv);
    const collection = database.collection(userCollectionEnv);
    const user = await collection.findOne({ username: username });

    if (user && await bcrypt.compare(password, user.password)) {
      console.log("Login successful");

      const userForToken = { username: user.username, id: user._id };
      const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

      const cookieStore = await cookies();
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600
      });

      return "Login successful";
    } else {
      console.log("Invalid username or password");
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Login failed");
  } finally {
    await client.close();
  }
}


export async function createUser(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await client.connect();
    const database = client.db("fsproject");
    const collection = database.collection("users");
    const doc = { username: username, password: hashedPassword };
    const result = await collection.insertOne(doc);
    console.log(`New document created with the following id: ${result.insertedId}`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

export async function verifyToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) {
      return { isValid: false, user: null };
    }
    
    const decoded = jwt.verify(token, process.env.SECRET);
    return { isValid: true, user: decoded };
  } catch (error) {
    return { isValid: false, user: null };
  }
}