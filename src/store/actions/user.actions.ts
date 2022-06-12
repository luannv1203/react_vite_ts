import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil';
import { Auth } from '../../model/Auth';
import { User } from '../../model/User';

import { history, useFetchWrapper } from '../../plugins';
import { authAtom, usersAtom, userAtom } from '../atoms';

export { useUserActions };

interface TypeFormLogin {
  username: string,
  password: string
}

function useUserActions() {
  const baseUrl: string = `${process.env.REACT_APP_API_URL}/users`;
  const fetchWrapper = useFetchWrapper();
  const [auth, setAuth] = useRecoilState(authAtom);
  const setUsers = useSetRecoilState(usersAtom);
  const setUser = useSetRecoilState(userAtom);

  return {
    login,
    logout,
    register,
    getAll,
    getById,
    delete: _delete,
    resetUsers: useResetRecoilState(usersAtom),
    resetUser: useResetRecoilState(userAtom)
  }

  function login({ username, password }: TypeFormLogin) {
    return fetchWrapper.post(`${baseUrl}/authenticate`, { username, password })
      .then((token: Auth) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('jwt', JSON.stringify(token));
        setAuth(token);

        // get return url from location state or default to home page
        const { from }: any = history.location.state || { from: { pathname: '/' } };
        history.push(from);
      });
  }

  function logout() {
    // remove user from local storage, set auth state to null and redirect to login page
    localStorage.removeItem('jwt');
    setAuth({token: null});
    history.push('/login');
  }

  function register(user: User) {
    return fetchWrapper.post(`${baseUrl}/register`, user);
  }

  function getAll() {
    return fetchWrapper.get(baseUrl).then(setUsers);
  }

  function getById(id: Number) {
    return fetchWrapper.get(`${baseUrl}/${id}`).then(setUser);
  }

  // prefixed with underscored because delete is a reserved word in javascript
  function _delete(id: Number) {
    setUsers((users) => users.map((x: User) => {
      // add isDeleting prop to user being deleted
      if (x.id === id)
        return { ...x, isDeleting: true }
      return x
    }));

    return fetchWrapper.delete(`${baseUrl}/${id}`)
      .then(() => {
        // remove user from list after deleting
        setUsers(users => users.filter((x: User) => x.id !== id));
      });
  }
}
