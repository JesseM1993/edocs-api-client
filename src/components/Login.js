import { useHistory, Redirect } from 'react-router-dom';
import { AuthService } from '../services/AuthService';

const Login = ({ location }) => {
  const auth = AuthService();
  const history = useHistory();
  
  const loginHandler = () => {
    auth.login({
      username: "testuser1@edocuments.co.uk",
      password: "20DemoPass20"
    });
    history.push("/document");
  }

  return (auth.user && auth.user.token) 
  ? (<Redirect to={{ pathname: "/document", state: { from: location } }} />)
  : (
      <div>
        <button onClick={loginHandler}>Login</button>
      </div>
    )
}

export default Login;