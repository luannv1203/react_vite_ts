import { atom } from 'recoil';
import { initAuth } from '../../model/Auth';

const authAtom = atom({
    key: 'auth',
    // get initial state from local storage to enable user to stay logged in
    default: initAuth()
});

export { authAtom };