import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/orders";
const addApiEndpoint = apiEndpoint + "/a";

function orderUrl(id) {
  return `${apiEndpoint}/${id}`;
}
function addressUrl(id) {
  return `${addApiEndpoint}/${id}`;
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
export async function getAddress(Id) {
  const {
    data: { address },
  } = await http.get(addressUrl(Id));
  return address;
}

export function saveOrder(order) {
  if (order._id) {
    const body = { ...order };
    delete body._id;
    http.put(orderUrl(order._id), body);
  }

  return http.post(apiEndpoint, order);
}

export function saveAddress(address) {
  if (address._id) {
    const body = { ...address };
    delete body._id;
    http.put(addressUrl(address._id), body);
  }

  return http.post(addApiEndpoint, address);
}

export function deleteOrder(orderId) {
  return http.delete(orderUrl(orderId));
}

export function deleteAddress(addId) {
  return http.delete(addressUrl(addId));
}
