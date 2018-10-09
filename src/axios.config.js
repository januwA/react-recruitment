import axios from "axios";
import store from "./store";

const l = console.log;
// Add a request interceptor
axios.interceptors.request.use(
  c => {
    // Do something before request is sent
    store.isL = true;
    return c;
  },
  function(error) {
    // Do something with request error
    store.isL = false
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  r => {
    // Do something with response data
    store.isL = false
    return r.data;
  },
  function(error) {
    // Do something with response error
    store.isL = false
    return Promise.reject(error);
  }
);
