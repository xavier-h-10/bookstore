import postRequest from "../utils/ajax";

export function  getOrder(callback) {
  const url=`http://localhost:8080/getOrder`;
  postRequest(url,{},callback);
}

export function  getAllOrder(callback) {
  const url=`http://localhost:8080/getAllOrder`;
  postRequest(url,{},callback);
}

export function getOrderItemById(orderId,callback) {
  const url=`http://localhost:8080/getOrderItemById?orderId=${orderId}`;
  postRequest(url,{},callback);
}

export function getOrderByTime(t1,t2,callback) {
  const url=`http://localhost:8080/getOrderByTime?t1=${t1}&t2=${t2}`;
  postRequest(url,{},callback);
}

export function getAllOrderByTime(t1,t2,callback) {
  const url=`http://localhost:8080/getAllOrderByTime?t1=${t1}&t2=${t2}`;
  postRequest(url,{},callback);
}