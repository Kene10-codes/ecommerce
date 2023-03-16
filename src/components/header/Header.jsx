import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signOutUserStart} from '../../redux/User/userAction';
import logo from '../../assets/logo.png';
import '../styles.scss';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
});

function Header () {
  const {currentUser} = useSelector (mapState);
  const dispatch = useDispatch ();

  // sign out func
  const signOut = () => {
    dispatch (signOutUserStart ());
  };

  return (
    <header className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>

        <div className="cta">
          {currentUser && <Link to="/dashboard">My Account</Link>}
          {currentUser && <Link to="/" onClick={() => signOut ()}>LogOut</Link>}
          {!currentUser && <Link to="/registration">Register</Link>}
          {!currentUser && <Link to="/login">Login</Link>}
        </div>
      </div>
    </header>
  );
}

Header.defaultProps = {
  currentUser: null,
};

export default Header;
