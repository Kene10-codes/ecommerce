import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import {auth, GoogleProvider, handleUserProfile} from '../../firebase/utils';
import userTypes from './userTypes';

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const setCurrentUser = user => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_,
});

export const resetAuthAllForms = () => ({
  type: userTypes.AUTH_RESET_FORM,
});

// export const signInUser = ({email, password}) => async dispatch => {
//   try {
//     await signInWithEmailAndPassword (auth, email, password);
//     dispatch ({
//       type: userTypes.SIGN_IN_SUCCESS,
//       payload: true,
//     });
//   } catch (err) {
//     console.log (err);
//   }
// };

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword,
}) => async dispatch => {
  if (password !== confirmPassword) {
    const err = ['Password does not match'];
    dispatch ({
      type: userTypes.SIGN_UP_ERROR,
      payload: err,
    });
    return;
  }

  try {
    const {user} = await createUserWithEmailAndPassword (auth, email, password);
    await handleUserProfile (user, {displayName});
    dispatch ({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true,
    });
  } catch (err) {
    // console.log (err.message);
  }
};

export const resetPassword = ({email}) => async dispatch => {
  // Email reset configurations
  const config = {
    url: 'http://localhost:3000/login',
  };
  try {
    await sendPasswordResetEmail (auth, email, config)
      .then (() => {
        dispatch ({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch (() => {
        const err = ['Email not found!'];
        dispatch ({
          type: userTypes.RESET_PASSWORD_FAILURE,
          payload: err,
        });
      });
  } catch (error) {}
};

export const signInWithGoogle = () => async dispatch => {
  try {
    await signInWithPopup (auth, GoogleProvider).then (() => {
      dispatch ({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true,
      });
    });
  } catch (err) {
    // console.log (err);
  }
};
