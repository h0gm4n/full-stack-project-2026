import LoginStatus from '../components/LoginStatus';
import { verifyToken } from '../actions';

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

export default async function HomePage() {
    const result = await verifyToken();
    const username = result.isValid ? result.user.username : null;

    return (
    <div className="p-8">
        <LoginStatus initialUsername={username} initialIsLoggedIn={!!username} />
        <h1 className="text-2xl font-bold">Home</h1>
        <p>
            Welcome to the home page! You are logged in as{' '}
            {username ? <span className="font-bold">{username}</span> : 'guest'}.
        </p>
    </div>
  );
}
