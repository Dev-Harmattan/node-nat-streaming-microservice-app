import { useState } from "react";
import useRequest from "../../hooks/useRequest";
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {data, errors, doRequest} = useRequest({
    url: '/api/users/signup', 
    method: 'post', 
    body: {email, password},
    onSuccess: () => router.push('/')
  });

  const formSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  }
  return <form onSubmit={formSubmit}>
    <h1>Sign up</h1>
    <div className="form-group">
      <label>Email</label>
      <input value={email} onChange={e => setEmail(e.target.value)} className="form-control" type="email"></input>
    </div>
    <div className="form-group">
      <label>Password</label>
      <input value={password} onChange={e => setPassword(e.target.value)} className="form-control" type="password"></input>
    </div>
    {errors.length > 0 && <div className="alert alert-danger my-2">
      <h4>Ooops...</h4>
      <ul className="my-0">
        {
          errors.map(error => <li key={error.field}>{error.message}</li>)
        }
      </ul>
      </div>}
    <button className="btn btn-primary">Sign up</button>
  </form>
}