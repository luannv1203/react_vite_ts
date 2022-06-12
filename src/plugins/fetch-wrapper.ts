import { useRecoilState } from 'recoil';

import { history } from './history';
import { authAtom } from '../store/atoms';
import { useAlertActions } from '../store/actions';
import { useRequest } from 'ahooks';

export { useFetchWrapper };

function useFetchWrapper() {
  const [auth, setAuth] = useRecoilState(authAtom);
  const alertActions = useAlertActions();

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
  };

  function request(method: string) {
    return (url: string, body: any = null) => {
      const requestOptions: any = {
        method,
        headers: authHeader(url)
      };
      if (body) {
        requestOptions.headers['Content-Type'] = 'application/json';
        requestOptions.body = JSON.stringify(body);
      }

      const { data } = useRequest(async () => {
        return await fetch(url, requestOptions).then(handleResponse);
      })
      
      return data
    }
  }

  // helper functions

  function authHeader(url: string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const token = localStorage.getItem('jwt')
    const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL ?? '');
    if (token && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  function handleResponse(response: any) {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          localStorage.removeItem('user');
          setAuth({token: null});
          history.push('/account/login');
        }

        const error = (data && data.message) || response.statusText;
        alertActions.error(error);
        return Promise.reject(error);
      }

      return data;
    });
  }
}
