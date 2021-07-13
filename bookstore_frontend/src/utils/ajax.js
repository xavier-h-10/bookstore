export default function postRequest(url, json, callback) {
  console.log(JSON.stringify(json));
  let opts = {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "include" //to upload cookies from client
    //credentials 是Request接口的只读属性，用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。
  };

  fetch(url, opts)
  .then(response => response.json())
  .then(data => {
    callback(data);
  })
  .catch(error => {
    console.log(error);
  })
}