import { useEffect } from "react";
import useRequest from '../../hooks/useRequest';
import { useRouter } from 'next/router';


export default () => {
  const router = useRouter();
  const {data, errors, doRequest} = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {}, 
    onSuccess: () => router.push('/')
  });


  useEffect(() => {
    doRequest();
  }, [])

  return <div>Signing out...</div>;
}