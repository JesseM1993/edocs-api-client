import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthService'; 
import Login from './components/Login';
import Document from './pages/Document';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <Switch>
          <Route path="/document" component={Document} />
          <Route path="/" component={Login} /> 
        </Switch>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
