import {sendPasswordResetEmail} from 'firebase/auth';
import {auth} from '../../firebase/utils';

export const handleResetPasswordAPI = email => {
  const config = {
    url: 'http://localhost:3000/login',
  };
  return new Promise ((resolve, reject) => {
    sendPasswordResetEmail (auth, email, config)
      .then (() => {
        resolve ();
      })
      .catch (() => {
        const err = ['Email not found!'];
        reject (err);
      });
  });
};
