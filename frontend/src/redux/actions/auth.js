import axios from "axios";
import qs from "qs";
import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  SHOPIFY_AUTH_SUCCESS,
  SHOPIFY_AUTH_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "./types";
import {checklogin} from "../checkLogin"
import {server} from "../serverLink"

const JWT_LIFETIME_SECONDS = 20;

export const loginUser = (userInfo) => (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  const body = qs.stringify({
    username: userInfo.email,
    password: userInfo.password,
  });
  const requestUrl = `${server}auth/jwt/login`;

  axios
    .post(requestUrl, body, config)
    .then(function (response) {
      // Set token to localStorage
      localStorage.setItem("token", response.data.access_token);

      // Set token expiration time to localStorage
      // TODO: Get JWT_LIFETIME_SECONDS from envvars
      const currentTimeSeconds = Date.now() / 1000;
      localStorage.setItem(
        "tokenExpiresAt",
        currentTimeSeconds + JWT_LIFETIME_SECONDS
      );

      // Dispatch the result
      dispatch({ type: SIGN_IN_SUCCESS, payload: response.data });

      // Get user data with another request
      dispatch(getUser());

      // Redirect to /dashboard
      window.location.replace("/dashboard");
    })
    .catch(function (error) {
      dispatch({ type: SIGN_IN_FAIL, payload: error });
      console.error("SIGN_IN_FAIL", error.response);
      // checklogin(error)
    });
};

export const getUser = () => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const requestUrl = `${server}auth/users/me`;

  axios
    .get(requestUrl, config)
    .then((response) => {
      dispatch({ type: GET_USER_SUCCESS, payload: response.data });
    })
    .catch(function (error) {
      dispatch({ type: GET_USER_FAIL, payload: error });
      checklogin(error)
    });
};

export const googleAuthorize = (authentication_backend = "jwt") => dispatch => {
    // const scopes = [
    // "https://www.googleapis.com/auth/userinfo.profile",
    // "https://www.googleapis.com/auth/userinfo.email",
    // ];

    const scopes = {
      profile: "&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile",
      email: "&scopes=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
    };

    const body = {authentication_backend, scopes: scopes}
    const config = { headers: { "Content-Type": "application/json" } };
    const requestUrl = `${server}auth/google/authorize?authentication_backend=${authentication_backend}${scopes.profile}${scopes.email}`

    axios
      .get(requestUrl, body, config)
      .then(function (response) {
          console.log('GOOGLE_AUTH_SUCCESS', response.data);
        dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: response.data });
        window.open(`${response.data.authorization_url}`);
        // dispatch(getUser());
      })
      .catch(function (error) {
          console.log('GOOGLE_AUTH_FAIL', error);
        dispatch({ type: GOOGLE_AUTH_FAIL, payload: error });
        checklogin(error)
      });
};

export const shopifyAuthorize = (
  shop = "shop",
  authentication_backend = "jwt"
) => (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const requestUrl = `${server}auth/shopify/authorize?shop=${shop}&authentication_backend=${authentication_backend}`;

  // learn-integrations.myshopify.com
  axios
    .get(requestUrl, config)
    .then(function (response) {
      dispatch({ type: SHOPIFY_AUTH_SUCCESS, payload: response.data });
      console.log("SHOPIFY_AUTH_SUCCESS", response.data);
      window.open(`${response.data.authorization_url}`);
    })
    .catch(function (error) {
      dispatch({ type: SHOPIFY_AUTH_FAIL, payload: error });
      console.log("SHOPIFY_AUTH_FAIL", error);
      checklogin(error)
    });
};

const path = window.location.pathname

const getShopifydata = (code) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const requestUrl = `${server}auth/shopify/callback?${code}`;
  axios
    .get(requestUrl, config)
    .then(function (response) {
      console.log("SHOPIFY_GET_SUCCESS", response.data);
      localStorage.setItem("shopify_token", response.data.access_token)
      window.close()
    })
    .catch(function (error) {
      console.log("SHOPIFY_GET_FAIL", error);
      window.close()
    });
}

if (path.split('/')[2] === "shopify" && path.split('/')[3] === "callback") {
  // let params = new URLSearchParams(window.location.search);
  // let need = params.get('code')
  // console.log("params", need);
  let url = window.location.search
  let code = url.split('?')
  code.shift()
  console.log("code :", code[0]);
  getShopifydata(code)
}

export const forgotPassword = (email = { email: "testmail@gmail.com" }) => (
  dispatch
) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify(email);
  const requestUrl = `${server}auth/forgot-password`;

  axios
    .post(requestUrl, body, config)
    .then(function (response) {
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data });
    })
    .catch(function (error) {
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error });
      checklogin(error)
    });
};

export const resetPassword = (password = "newPassword") => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({
    token: `Bearer ${localStorage.getItem("token")}`,
    password: password,
  });
  const requestUrl = `${server}auth/reset-password`;

  axios
    .post(requestUrl, body, config)
    .then(function (response) {
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data });
    })
    .catch(function (error) {
      dispatch({ type: RESET_PASSWORD_FAIL, payload: error });
      checklogin(error)
    });
};