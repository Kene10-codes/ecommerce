import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {checkUserSession} from './redux/User/userAction';
import HomeLayout from './components/homeLayout'; // Home Layout
import MainLayout from './components/mainLayout'; // Main Layout
import Registration from './pages/Registration';
import RecoveryPassword from './pages/Recovery';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WithAuth from './components/hoc/withAuth';
import WithAdminAuth from './components/hoc/withAdminAuth';
import Admin from './pages/Admin';
import AdminToolbar from './components/adminToolbar';

function App () {
  const dispatch = useDispatch ();

  useEffect (() => {
    dispatch (checkUserSession ());
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
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

        <Route
          path="/admin"
          element={
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
