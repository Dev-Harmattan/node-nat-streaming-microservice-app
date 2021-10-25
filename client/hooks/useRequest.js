import { useState } from 'react';
import axios from 'axios';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body)
      setData(response);
      setErrors([])
      if(onSuccess){
        onSuccess()
      }
    } catch (error) {
      if(error){
        setErrors(error.response.data.errors)
      }
    }
  };

  return { data, errors, doRequest };
};

export default useRequest;
