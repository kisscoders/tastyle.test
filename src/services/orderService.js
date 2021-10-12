import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/orders";
const addApiEndpoint = apiEndpoint + "/a";

function orderUrl(id) {
	return `${apiEndpoint}/${id}`;
}

export async function getOrders() {
	const {
		data: { orders },
	} = await http.get(apiEndpoint);
	return orders;
}

export async function getMyOrders() {
	const {
		data: { orders },
	} = await http.get(apiEndpoint + "/me");
	return orders;
}

export async function getMyAddresses() {
	const {
		data: { addresses },
	} = await http.get(addApiEndpoint + "/me");
	return addresses;
}
export async function getOrder(orderId) {
	const {
		data: { order },
	} = await http.get(orderUrl(orderId));
	return order;
}

export function addOrder(order) {
	if (order._id) {
		const body = { ...order };
		delete body._id;
		http.put(orderUrl(order._id), body);
	}

	return http.post(apiEndpoint, order);
}

export function deleteOrder(orderId) {
	return http.delete(orderUrl(orderId));
}
