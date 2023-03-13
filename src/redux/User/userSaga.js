import {all, put, takeLatest, call} from 'redux-saga/effects';
import userTypes from './userTypes';
import {signInSuccess} from './userAction';
import {auth, getCurrentuser, handleUserProfile} from '../../firebase/utils';
import {signInWithEmailAndPassword} from 'firebase/auth';

export function* getSnapshotFromUserAuth (user) {
  try {
    const useRef = yield call (handleUserProfile ({user: user}));
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
  const userAuth = yield getCurrentuser ();
  if (!userAuth) return;
  yield getSnapshotFromUserAuth (userAuth);
}

export function* onCheckUserSession () {
  yield takeLatest (userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export default function* userSagas () {
  yield all ([call (onEmailSignInStart), call (onCheckUserSession)]);
}
