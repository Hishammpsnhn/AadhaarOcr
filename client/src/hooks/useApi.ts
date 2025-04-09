// hooks/useApi.ts
import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';


type ApiState<T> = {
  loading: boolean;
  apiError: string | null;
  data: T | null;
};

const useApi = <T = any>() => {
  const [state, setState] = useState<ApiState<T>>({
    loading: false,
    apiError: null,
    data: null,
  });

  const makeRequest = async (config: AxiosRequestConfig) => {
    setState({ loading: true, apiError: null, data: null });
    try {
      const response = await axios(config);
      setState({ loading: false, apiError: null, data: response.data });
      return response.data;
    } catch (apiError: any) {
      setState({
        loading: false,
        apiError: apiError?.response?.data?.message || apiError.message || 'Error',
        data: null,
      });
      return null;
    }
  };

  return {
    ...state,
    makeRequest,
  };
};

export default useApi;
