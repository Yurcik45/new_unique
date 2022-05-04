import "./App.sass";
import Hello from "./pages/FirstPages/Hello/Hello";
import Register from "./pages/FirstPages/Register/Register";
import Login from "./pages/FirstPages/Login/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SettingsPagesForm from "./pages/SettingsPages/SettingsPagesForm";
import MatchPagesForm from "./pages/MatchPages/MatchPagesForm";
import ImagePagesForm from "./pages/ImagePages/ImagePagesForm";
import ResetPassword from "./pages/FirstPages/ResetPassword/ResetPassword";
import ConfirmPassword from "./pages/FirstPages/ConfirmPassword/ConfirmPassword";
import LeftMenu from "./components/LeftMenu/LeftMenu";
import Dashboard from "./pages/Dashboard/Dashboard"
import CrispChat from "./components/CrispChat/CrispChat";
import PrivateRoute from "./components/PrivateRoute"
import NotificationPopup from "./components/NotificationPopup/NotificationPopup"
import {useEffect, useState, useselector} from "react"
import {falseLogged} from "./redux/checkLogin"
import {refreshToken} from "./redux/refreshToken"
import { useSelector } from "react-redux";
import Page404 from "./components/Page404/Page404";
import AuthPage from "./pages/AuthPage/AuthPage";

const App = () => {

  // console.log("false", falseLogged);

  // popup settings

  const [popup, setPopup] = useState(false)
  const [popupSettings, setPopupSettings] = useState({
    type: '', value: ''
  })

  //@ts-ignore
  const authData = useSelector(state => state.auth)
  console.log("AUTH DATA ERROR", authData.error);

  function checkCredentials() {
    if (authData.error.response !== undefined) {
      if (authData.error.response.data.detail === "LOGIN_BAD_CREDENTIALS") {
        setPopup(true)
        setPopupSettings({type: 'danger', value: 'Неправильный логин или пароль'})
      } 
    }
    else if (authData.error.message !== undefined) {
      if (authData.error.message === "Network Error") {
        setPopup(true)
        setPopupSettings({type: 'danger', value: 'Проблемы с интеренет-соединением'})
      } 
    } 
    else {
      console.log("APP other fail auth", authData.error);
    }
  }


  useEffect(() => {
    checkCredentials()
    if (falseLogged) {
      popupSettings.value = "no authorization"
      popupSettings.type = "danger"
      setPopup(true)
    }
  }, [authData])


  // refresh user token

  const JWT_LIFETIME_SECONDS = 60;
  const tokenExpiresAt = parseInt(localStorage.getItem("tokenExpiresAt"));
  const currentTimeSeconds = Date.now() / 1000;
  const auth = localStorage.getItem("token") ? true : false
  
  function refresh() {
    if (tokenExpiresAt - currentTimeSeconds < 5 && auth) { 
      refreshToken(JWT_LIFETIME_SECONDS)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  setInterval(() => {
    refresh()
    console.log("DEFF", tokenExpiresAt - currentTimeSeconds);
    console.log("DEFF CHECK", tokenExpiresAt - currentTimeSeconds < 5);
  }, (JWT_LIFETIME_SECONDS * 1000) - 5)

  // если tokenExpiresAt - currentTimeSeconds < 5 и есть токен то візови рефреш токена


  // get user pathname

  let cp = window.location.pathname.split('/')[1];

  console.log("cp[1]", cp);

  return (
      <div className="App">
        <BrowserRouter>
          {
            cp === 'dashboard' || cp === 'Dashboard' ||
            cp === 'matches' || cp === 'Matches' ||
            cp === 'images' || cp === 'Images' ||
            cp === 'settings' || cp === 'Settings'
              ? <LeftMenu setPopup={setPopup}/>
              // ? <div style={{minWidth: 200, maxWidth: 200, minHeight: "100vh", border: "1px solid black", position: "fixed", fontSize: 50, textAlign: "center"}}>menu</div>
              : null
          }
          {
            cp === 'dashboard' || cp === 'Dashboard' ||
            cp === 'matches' || cp === 'Matches' ||
            cp === 'images' || cp === 'Images' ||
            cp === 'settings' || cp === 'Settings'
              ? <CrispChat/>
              : null
          }
            <NotificationPopup
              popup={popup}
              setPopup={setPopup}
              popupSettings={popupSettings}
              setPopupSettings={setPopupSettings}
            />
          <Switch>
            <Route exact path="/">
              <Hello />
            </Route>
            <Route exact path="/login">
              <Login popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>
            </Route>
            <Route exact path="/register">
              <Register popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>
            </Route>
            <Route exact path="/password_reset">
              <ResetPassword popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>
            </Route>
            <Route exact path="/password_confirm">
              <ConfirmPassword popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>
            </Route>
            <PrivateRoute component={<Dashboard popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>} path="/dashboard" />
            <PrivateRoute component={<ImagePagesForm popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>} path="/images" />
            <PrivateRoute component={<MatchPagesForm popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>} path="/matches" />
            <PrivateRoute component={<SettingsPagesForm popup={popup} setPopup={setPopup} setPopupSettings={setPopupSettings}/>} path="/settings" />
            
            {/* 3000/auth/shopify/callback */}
            <Route exact path="/auth/*">
              <AuthPage/>
            </Route>
            <Route exact path="**">
              <Page404/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
  );
};

export default App;
