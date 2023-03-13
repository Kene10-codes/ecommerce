import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {auth, handleUserProfile} from './firebase/utils';
import {onSnapshot} from 'firebase/firestore';
import {setCurrentUser} from './redux/User/userAction';
import HomeLayout from './components/homeLayout'; // Home Layout
import MainLayout from './components/mainLayout'; // Main Layout
import Registration from './pages/Registration';
import RecoveryPassword from './pages/Recovery';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WithAuth from './components/hoc/withAuth';

function App () {
  // const dispatch = useDispatch ();

  // useEffect (() => {
  //   const unsubscribe = auth.onAuthStateChanged (async user => {
  //     if (user) {
  //       const useRef = await handleUserProfile (auth);
  //       onSnapshot (useRef, snapshot => {
  //         dispatch (
  //           setCurrentUser ({
  //             id: snapshot.id,
  //             ...snapshot.data (),
  //           })
  //         );
  //       });
  //     }
  //     dispatch (setCurrentUser (user));
  //   });

  //   return () => unsubscribe ();
  // });

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />

        <Route
          path="/registration"
          element={
            <MainLayout>
              <Registration />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path="/recovery"
          element={
            <MainLayout>
              <RecoveryPassword />
            </MainLayout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
