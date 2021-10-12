import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";
const loginEndpoint = apiUrl + "/users/auth";
const tokenKey = "token";
// const currentUser = getAllUsers();
// console.log(currentUser);

http.setJwt(getJwt());

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

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

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

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export default {
	login,
	logout,
	getCurrentUser,
	loginWithJwt,
	getJwt,
};
