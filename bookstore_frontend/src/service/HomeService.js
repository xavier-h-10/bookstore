import postRequest from "../utils/ajax";
import {message} from "antd";
import {history} from "../utils/history";

export function getHomeContent(callback) {
  const url = `http://localhost:8080/getHomeContent`;
  postRequest(url, {}, callback);
}

