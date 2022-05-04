import { Route } from 'react-router-dom';

const PrivateRoute = props => {
  // const auth = localStorage.getItem("token") ? true : false
  const auth = true
  return (
    auth
      ? <Route exec path={props.path}>{props.component}</Route>
      : window.location.replace("/login")
  )
};

export default PrivateRoute;