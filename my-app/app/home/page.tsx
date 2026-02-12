import LoginStatus from '../components/LoginStatus';
import { verifyToken, fetchUserInfo } from '../actions';

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
    const userid = result.isValid ? result.user.userid : null;
    const loggedInUserData = await fetchUserInfo(userid)
    const pleaseEnter = <p className="font-semibold">Please enter</p>

    return (
    <div className="p-8">
        <LoginStatus initialUsername={username} initialIsLoggedIn={!!username} />
        <h1 className="text-2xl font-bold">Home</h1>
        <p>
            Welcome to the home page! You are logged in as{' '}
            {username ? <span className="font-bold">{username}</span> : 'guest'}.
        </p>
        <div>
          <p>Your information:</p>
          <p>Username: {loggedInUserData.username}</p>
          <p>First name: {loggedInUserData.firstName !== null ? loggedInUserData.firstName : <span className="font-bold">Please enter</span>}</p>
          <p>Last name: {loggedInUserData.lastName !== null ? loggedInUserData.lastName : <span className="font-bold">Please enter</span>}</p>
          <p>Email: {loggedInUserData.email !== null ? loggedInUserData.email : <span className="font-bold">Please enter</span>}</p>
          <p>Current residence: {loggedInUserData.residenceId !== null ? loggedInUserData.residenceId : <span className="font-bold">Please enter</span>}</p>
        </div>
    </div>
  );
}