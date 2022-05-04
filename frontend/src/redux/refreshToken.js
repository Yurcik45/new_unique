import {server} from './serverLink';
import axios from 'axios';
import {checklogin} from './checkLogin'

export const refreshToken = (JWT_LIFETIME_SECONDS) => {
    console.log("refresh");
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const requestUrl = `${server}auth/jwt/refresh`;
    
      axios
        .post(requestUrl, null, config)
        .then((response) => {
          localStorage.clear()
          const token = response.data.access_token;
          localStorage.setItem("token", token);
          const currentTimeSeconds = Date.now() / 1000;
          localStorage.setItem(
            "tokenExpiresAt",
            currentTimeSeconds + JWT_LIFETIME_SECONDS
          );
          console.log("token response", response.data);
        })
        .catch(function (error) {
          console.warn("refresh error", error);
          checklogin(error)
        });
}