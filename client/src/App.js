import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "./App.css";

import MyNav from "./Components/MyNav.js";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Body from "./Components/Body";
import { getLoggedUser } from "./Api/GetApi";
import { logoutUser } from "./Api/DeleteApi";

function App() {
  const [userName, setUserName] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [iduserName, setIDUserName] = useState(-1);
  const [checked, setChecked] = useState(false);
  const [errorApi, seterrorApi] = useState(false);

  const login = (user) => {
    setUserName(user.name);
    setIDUserName(user.id);
    setIsLogged(true);
    setChecked(true);
  };

  const logout = () => {
    setChecked(false);
    logoutUser()
      .then(() => {
        setUserName("");
        setIsLogged(false);
        setChecked(true);
      })
      .catch((err) => {
        seterrorApi(err);
        setChecked(true);
      });
  };

  useEffect(() => {
    if (!isLogged) {
      getLoggedUser()
        .then((user) => {
          setUserName(user.name);
          setIDUserName(user.id);
          setIsLogged(user.id === -1 ? false : true);
          setChecked(true);
        })
        .catch((err) => {
          seterrorApi(err);
          setChecked(true);
        });
    }
  }, [isLogged]);

  return (
    <>
      <Router>
        {userName ? <Redirect to="/" /> : null}
        <Switch>
          <Route path="/login">
            <LoginForm login={login} setChecked={setChecked} />
          </Route>
          <Route
            path="/"
            render={() => (
              <>
                <MyNav userName={userName} logout={logout} />
                <Body
                  isLogged={isLogged}
                  check={checked}
                  iduser={iduserName}
                  userName={userName}
                  errorApi={errorApi}
                  seterrorApi={seterrorApi}
                ></Body>
              </>
            )}
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
