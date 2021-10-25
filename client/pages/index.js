import { buildClient } from "../api/build-client";
const Landing = ({currentUser}) => {
  return currentUser ? <div>You are sign in</div> : <div>You are not sign in</div>
}

Landing.getInitialProps = async (context) => {
  console.log('LANDING PAGE')
  const {data} = await buildClient(context).get('/api/users/currentuser');
  return data;
}

export default Landing;

