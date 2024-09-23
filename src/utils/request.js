import axios from "axios";
const noAuthRequest = axios.create({
  baseURL: "http://localhost:1337/api",
});

noAuthRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const authRequest = axios.create({
  baseURL: "http://localhost:1337/api",
});

// Add a request interceptor
authRequest.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = "Bearer " + getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
authRequest.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const getToken = function () {
  return localStorage.getItem("token");
};

export { noAuthRequest, authRequest };
