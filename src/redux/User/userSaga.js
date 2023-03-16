import {all, put, takeLatest, call} from 'redux-saga/effects';
import userTypes from './userTypes';
import {
  resetPasswordSuccess,
  signInSuccess,
  signOutUserSuccess,
  userError,
} from './userAction';
import {
  auth,
  getCurrentuser,
  GoogleProvider,
  handleUserProfile,
} from '../../firebase/utils';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import {handleResetPasswordAPI} from './userHelper';

export function* getSnapshotFromUserAuth (user, data = {}) {
  try {
    const useRef = yield call (handleUserProfile ({user: user, data}));
    const snapshot = yield useRef.get ();
    yield put (
      signInSuccess ({
        id: snapshot.id,
        ...snapshot.data (),
      })
    );
  } catch (err) {}
}

export function* emailSignIn({payload: {email, password}}) {
  try {
    const {user} = signInWithEmailAndPassword (auth, email, password);
    yield getSnapshotFromUserAuth (user);
  } catch (err) {
    console.log (err);
  }
}

export function* onEmailSignInStart () {
  yield takeLatest (userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated () {
  try {
    const userAuth = yield getCurrentuser ();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth (userAuth);
  } catch (err) {
    //console.log(err)
  }
}

export function* onCheckUserSession () {
  yield takeLatest (userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser () {
  try {
    yield auth.signOut ();
    yield put (signOutUserSuccess ());
  } catch (err) {
    console.log (err);
  }
}

export function* onSignOutUserStart () {
  yield takeLatest (userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: {displayName, email, password, confirmPassword},
}) {
  if (password !== confirmPassword) {
    const err = ['Password does not match'];
    yield put (userError (err));
    try {
      const {user} = yield createUserWithEmailAndPassword (
        auth,
        email,
        password
      );
      const data = {displayName};
      yield getSnapshotFromUserAuth (user, data);
    } catch (err) {
      // console.log(err)
    }
  }
}

export function* resetPassword({payload: {email}}) {
  try {
    yield call (handleResetPasswordAPI, email);
    yield put (resetPasswordSuccess ());
  } catch (error) {
    yield put (userError (error));
  }
}

export function* onResetPasswordStart () {
  yield takeLatest (userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* onSignUpUserStart () {
  yield takeLatest (userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* googleSignIn () {
  try {
    const {user} = yield signInWithPopup (auth, GoogleProvider);
    yield getSnapshotFromUserAuth (user);
  } catch (err) {
    // console.log (err);
  }
}

export function* onGoogleSigInStart () {
  yield takeLatest (userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas () {
  yield all ([
    call (onEmailSignInStart),
    call (onCheckUserSession),
    call (onSignOutUserStart),
    call (onSignUpUserStart),
    call (onResetPasswordStart),
    call (onGoogleSigInStart),
  ]);
}
