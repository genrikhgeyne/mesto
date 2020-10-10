export default class Api {
  methodApi (url, method, header, body) {
    return fetch(url, {
      method: method,
      headers: header,
      body: body
      })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res.status);
        } else {
          return res.json();
        }
      })
  }
}
