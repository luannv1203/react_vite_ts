import { atom } from 'recoil';

interface ModelAlert {
    message: string,
    type: string
}

const initAlert = (): ModelAlert => ({
    message: '',
    type: ''
})

const alertAtom = atom({
    key: 'alert',
    default: initAlert()
});

export { alertAtom };