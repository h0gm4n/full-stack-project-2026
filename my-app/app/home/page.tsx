import HomeClient from '../components/HomeClient';
import { verifyToken, fetchUserInfo } from '../actions';


export default async function HomePage() {
  const result = await verifyToken();
  const username = result.isValid ? result.user.username : null;
  const userid = result.isValid ? result.user.userid : null;
  const loggedInUserDataRaw = await fetchUserInfo(userid);
  const loggedInUserData = JSON.parse(JSON.stringify(loggedInUserDataRaw));

  return (
    <HomeClient
      username={username}
      userData={loggedInUserData}
    />
  );
}