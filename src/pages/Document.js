import { useHistory, Redirect } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

import Portfolio from '../components/Portfolio/Portfolio';

const Document = () => {
  const auth = AuthService();
  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
    history.push("/");
  };

  
  return (auth.user && auth.user.token) 
  ? (
      <div>
        <button onClick={logoutHandler}>Sign Out</button>
        <Portfolio/>
      </div>
    ) 
  : (<Redirect to={{ pathname: "/" }} /> )
}

export default Document;