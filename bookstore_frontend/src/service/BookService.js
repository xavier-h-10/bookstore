import postRequest from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";

export function getBooksByPage(num,callback) {
  const url=`http://localhost:8080/getBooksByPage?num=${Number(num)}`;
  postRequest(url,{},callback);
}

export function getBookById(bookId, callback) {
  const url=`http://localhost:8080/getBookById?id=${Number(bookId)}`;
  postRequest(url,{},callback);
}

export function getBookByName(name,callback) {
  const url=`http://localhost:8080/getBookByName?name=${name}`;
  postRequest(url,{},callback);
}

export function deleteBookById(id,callback) {
  const url=`http://localhost:8080/deleteBookById?id=${id}`;
  postRequest(url,{},callback);
}

export function addBook(data,callback) {
  const url = `http://localhost:8080/addBook`;
  postRequest(url, data, callback);
}

export function updateBook(data,callback) {
  const url=`http://localhost:8080/updateBook`;
  postRequest(url,data,callback);
}


export function getBooks(callback) {
  const url=`http://localhost:8080/getBooks`;
  postRequest(url,{},callback);
}