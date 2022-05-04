import { refreshToken } from "./actions/auth";
import axios from "axios"

export const jwt = ({getState}) => {
  setInterval(() => {
    return console.log(getState().auth.loggedIn);
    // if (getState().auth.loggedIn) {
    //   console.log("yes")
    // }
    // else {
    //   console.log("no");
    // }
  }, 600000)
}

// export const jwt = ({ dispatch, getState }) => {
//   console.log("1");
//   console.log(Date.now() / 1000);
//   console.log("token before", localStorage.getItem("tokenExpiresAt"));
//   return () => {
//     console.log("2");
//     // only worry about expiring token for async actions
//       const token = localStorage.getItem("token") ? true : false;
//       if (token) {
//         console.log("3");
//         // if we have token then we have tokenExpiresAt as well
//         const tokenExpiresAt = parseInt(localStorage.getItem("tokenExpiresAt"));
//         const currentTimeSeconds = Date.now() / 1000;
//         if (tokenExpiresAt - currentTimeSeconds < 5) {
//           console.log("4");
//           // make sure we are not already refreshing the token
//           if (!getState().auth.freshTokenPromise) {
//             console.log("5");
//             console.log("called refresh")
//               console.log('token refreshed');
//               const config = {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//               };
//               const requestUrl = "http://localhost:8000/auth/jwt/refresh";
            
//               axios
//                 .post(requestUrl, null, config)
//                 .then((response) => {
//                   // localStorage.clear()
//                   const token = response.data.access_token;
//                   localStorage.setItem("token", token);
//                   const currentTimeSeconds = Date.now() / 1000;
//                   localStorage.setItem(
//                     "tokenExpiresAt",
//                     currentTimeSeconds + JWT_LIFETIME_SECONDS
//                   );
//                   // dispatch({type: START_REFRESHING_TOKEN, payload: response.data})
//                   console.log("token response", response.data);
//                 })
//                 .catch((e) => {
//                   dispatch({ type: STOP_REFRESHING_TOKEN });
//                 });
            
//             console.log("token AFTER", localStorage.getItem("tokenExpiresAt"));
//           } else {
//             console.log("exit");
//           }
//         }
//       }
//   };
// };