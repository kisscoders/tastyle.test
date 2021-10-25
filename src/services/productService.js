import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/products";
const apiDashEndpoint = apiUrl + "/products/dash";

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

function productDashUrl(id) {
  return `${apiDashEndpoint}/${id}`;
}

function productDashListUrl(id) {
  return `${apiDashEndpoint}/makelisted/${id}`;
}

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getAllProducts() {
  return http.get(apiDashEndpoint);
}
export function getProduct(productId) {
  return http.get(productUrl(productId));
}

export function makeProductListed(productId) {
  return http.get(productDashListUrl(productId));
}

export async function saveProduct(product) {
  // const config = {
  //   headers: { "content-type": "multipart/form-data;boundary=MyBoundary" },
  // };
  if (product._id) {
    const body = { ...product };
    delete body._id;
    const data = await http.put(productDashUrl(product._id), body);
    return data;
  }

  return http.post(apiDashEndpoint, product);
}

export function deleteProduct(productId) {
  return http.delete(productDashUrl(productId));
}
