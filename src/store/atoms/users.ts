import { atom } from 'recoil';
import { initUser } from '../../model/User';

const usersAtom = atom({
    key: 'users',
    default: initUser()
});

const userAtom = atom({
    key: 'user',
    default: null
});

export { 
    usersAtom,
    userAtom
};