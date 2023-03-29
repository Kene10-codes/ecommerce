import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from 'react-router-dom';
import {checkUserIsAdmin} from '../../utils';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
});

const useAdminAuth = props => {
  const {currentUser} = useSelector (mapState);
  const navigate = useNavigation ();

  useEffect (
    () => {
      if (!checkUserIsAdmin) {
        navigate ('/login');
      }
    },
    [currentUser]
  );

  return currentUser;
};

export default useAdminAuth;
