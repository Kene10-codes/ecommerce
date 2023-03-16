import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {signUpUserStart} from '../../redux/User/userAction';
import Button from '../../components/forms/Button';
import FormInput from '../forms/FormInput';
import AuthWrapper from '../authWrapper';

import './styles.scss';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
  userError: user.userError,
});

// initial states
const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: [],
};

const configWrapper = {
  headline: 'Registration Page',
};

export default function Signup () {
  const {currentUser, userError} = useSelector (mapState);
  const [user, setUser] = useState (initialState);
  const navigate = useNavigate ();
  const dispatch = useDispatch ();

  useEffect (
    () => {
      if (currentUser) {
        reset ();
        // navigate ('/');
      }
    },
    [currentUser]
  );

  useEffect (
    () => {
      if (Array.isArray (userError) && userError.length > 0) {
        setUser (prev => {
          return {
            ...prev,
            errors: userError,
          };
        });
      }
    },
    [userError]
  );

  function reset () {
    return {
      ...user,
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: [],
    };
  }

  const handleChange = e => {
    const {name, value} = e.target;
    setUser (prev => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Handle Form Submit
  const handleFormSubmit = async e => {
    e.preventDefault ();
    dispatch (
      signUpUserStart ({
        displayName,
        email,
        password,
        confirmPassword,
      })
    );
  };

  // Destructure the state variables from the state holder
  const {displayName, email, password, confirmPassword, errors} = user;
  return (
    <AuthWrapper {...configWrapper}>
      <div className="form__wrapper">
        <form action="" method="post" onSubmit={handleFormSubmit}>

          <FormInput
            label="Full Name:"
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={handleChange}
          />

          <FormInput
            label="Email Address:"
            type="email"
            name="email"
            value={email}
            placeholder="Email Address"
            handleChange={handleChange}
          />

          <FormInput
            label="Password:"
            type="password"
            name="password"
            value={password}
            placeholder="Enter Your Password"
            handleChange={handleChange}
          />

          <FormInput
            label="Confirm Password:"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Enter Same Password"
            handleChange={handleChange}
          />
          {errors.map ((err, i) => (
            <span
              style={{
                display: 'block',
                paddingBottom: '10px',
                fontSize: '15px',
                color: 'red',
              }}
              key={i}
            >
              {err}
            </span>
          ))}

          <Button type="submit">Register</Button>

          <div className="links">
            Already have an account?
            <Link to="/login">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
}
