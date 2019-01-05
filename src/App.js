import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { auth } from "./firebase";
import './App.scss';

import Login from './components/login/Login';
import UserHome from './components/userHome/UserHome';
import CreateAccount from './components/login/CreateAccount';
import Header from './components/header/Header'
import Spinner from './components/spinner/Spinner'

function App() {     

  const [user, setUser] = useState(null)
  const [uid, setUid] = useState(null) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      setUser(newUser)
      newUser ? setUid(newUser.uid) && console.log('uid loaded') : console.log('no user')
      setLoading(false)
    })
  }, [])

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      render={(props) =>
        user ? (
          <Component />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );

  return (
    loading ? <Spinner />
      :
      <Router>
        <div>
          <Header />

          <Switch>

            <PrivateRoute exact path="/" component={UserHome} />

            <Route path="/create-account" render={() => (
              !user ? (<Route component={(props) =>
                (<CreateAccount {...props} />)}
              />)
                : <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
            )} />

            <Route path="/login" render={() => (
              !user ? (<Route component={(props) =>
                (<Login {...props} />)}
              />)
                : <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
            )} />

          </Switch>
        </div>
      </Router>
  );
}

 export default App;