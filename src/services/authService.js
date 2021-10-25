import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";
const loginEndpoint = apiUrl + "/users/auth";
const updateEndpoint = apiUrl + "/users/updateprofile";
const roleChangeEndpoint = apiUrl + "/users/updaterole";
const tokenKey = "token";

// const currentUser = getAllUsers();
// console.log(currentUser);

http.setJwt(getJwt());

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function roleUserUrl(id) {
  return `${roleChangeEndpoint}/${id}`;
}

export async function login(email, password) {
  const { data } = await http.post(loginEndpoint, { email, password });
  const { token: jwt } = data;
  localStorage.setItem(tokenKey, jwt);
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

export async function updateProf(user) {
  const { data } = await http.post(updateEndpoint, user);
  const { token: jwt } = data;
  localStorage.setItem(tokenKey, jwt);
  return data;
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

// export function updateJwt(jwt) {
// 	localStorage.removeItem(tokenKey);
// 	localStorage.setItem(tokenKey, jwt);
// }

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getAllUsers() {
  const {
    data: { users },
  } = await http.get(apiEndpoint);
  return users;
}

export async function getUserById(userId) {
  const {
    data: { user },
  } = await http.get(userUrl(userId));
  console.log(user);
  return user;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId));
}

export function roleChange(userId) {
  return http.post(roleUserUrl(userId));
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
  register,
  getUserById,
  updateProf,
  roleChange,
};
