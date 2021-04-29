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

  getUsers() {
    return service
      .get("/user/users")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getTodos() {
    return service
      .get("/todo/todos")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOneTodo(id) {
    return service
      .get(`/todo/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateTodo(todoUpdate, id) {
    return service
      .patch(`/todo/${id}`, todoUpdate)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  createTodo(newTodo) {
    return service
      .post("/todo/todo", newTodo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteTodo(id) {
    return service
      .delete(`/todo/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  postTodo(todo) {
    return service
      .post("/todo/todo", todo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  postSubTodo(subTodo) {
    return service
      .post("/todo/subTodo", subTodo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getSubtodos() {
    return service
      .get("/todo/subTodos/all")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getOneSubTodo(id) {
    return service
      .get(`/todo/subTodos/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  updateSubTodo(subTodo, id) {
    return service
      .patch(`/todo/subTodos/${id}`, subTodo)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteSubTodo(id) {
    return service
      .delete(`/todo/subTodos/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteProjectSubtodos(id) {
    return service
      .delete(`/todo/subTodos/project/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  postComment(comment) {
    return service
      .post("/todo/comment", comment)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getComments() {
    return service
      .get("/todo/comments/all")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  getOneComment() {
    return service
      .get("/todo/comments/:id")
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteComment(id) {
    return service
      .delete(`/todo/comments/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deletSubTodoComments(id) {
    return service
      .delete(`/todo/comments/subTodos/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  },

  deleteProjectComments(id) {
    return service
      .delete(`/todo/comments/todo/${id}`)
      .then((res) => res.data)
      .catch(errorHandler)
  }
};