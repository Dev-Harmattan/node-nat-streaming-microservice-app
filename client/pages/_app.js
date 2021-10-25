import 'bootstrap/dist/css/bootstrap.css';
import { Header } from '../components/Header';
import { buildClient } from '../api/build-client';

export default function MyApp({Component, pageProps, currentUser}){
  return <div className="container-fluid">
    <Header currentUser={currentUser}/>
    <Component {...pageProps}/>
  </div>
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
    let pageProps = {}
    try{
      const {data} = await client.get ('/api/users/currentuser');
      if (appContext.Component.getInitialProps){
          pageProps = await appContext.Component.getInitialProps(appContext.ctx);
      }
      return {pageProps, ...data};
    }
    catch(e){
        return {pageProps};
    }
}

