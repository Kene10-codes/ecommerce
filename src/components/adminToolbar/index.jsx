import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {checkUserIsAdmin} from '../../utils';
import './styles.scss';

const mapState = ({user}) => ({
  currentUser: user.currentUser,
});

export default function AdminToolbar () {
  const {currentUser} = useSelector (mapState);

  const isAdmin = checkUserIsAdmin (currentUser);

  if (!isAdmin) return null;

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">
            My Admin
          </Link>
        </li>
      </ul>

    </div>
  );
}
