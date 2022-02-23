import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true,
});


function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  service,

  register(user) {
    return service
      .post("/user/register", user)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  login(user) {
    return service
      .post("/user/login", user)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/user/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/user/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  validateApi(apiKey) {
    return service
      .post("/user/api", apiKey)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateApiKey(apiKey, id) {
    return service
      .put(`/user/apiKey/${id}`, apiKey)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  sendMetric(metricObject) {
    return service
      .post("/metrics/post_metrics", metricObject)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  sendEvent(eventObject) {
    return service
      .post("/logs/post_event", eventObject)
      .then((res) => res.data)
      .catch(errorHandler)
  }

};

