import postRequest from "../utils/ajax";

export function addCartItem(bookId,amount,active,callback) {
  const url=`http://localhost:8080/addCartItem?bookId=${Number(bookId)}&amount=${Number(amount)}&active=${Boolean(active)}`;
  postRequest(url,{},callback);
}

export function setCartItem(bookId,active,callback) {
  const url=`http://localhost:8080/setCartItem?bookId=${Number(bookId)}&active=${Boolean(active)}`;
  postRequest(url,{},callback);
}

export function deleteCartItem(bookId,callback) {
  const url=`http://localhost:8080/deleteCartItem?bookId=${Number(bookId)}`;
  postRequest(url,{},callback);
}

export function submitCart(callback) {
  const url=`http://localhost:8080/submitCart`;
  postRequest(url,{},callback);
}

export function getCartItems(callback) {
  const url=`http://localhost:8080/getCartItems`;
  postRequest(url,{},callback);
}

export function  getRealCartItems(callback) {
  const url=`http://localhost:8080/getRealCartItems`;
  postRequest(url,{},callback);
}