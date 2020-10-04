/*REVIEW. Надо исправить.

Структура методов класса Api должна быть следующей:

methodApi = (...) => {
  return fetch(`...`, {
     ...
    })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.status);
      } else {
        return res.json();
      }
    })
}

Также, как видно из приведённой структуры, методы Api должны только возвращать полученный от сервера ответ, но не обрабатывать его, так как присутствие обработки
в методах Api, нарушает принцип единственной ответственности методов и класса в целом, лишает его возможности быть переиспользованным в других проектоах.
Поэтому  структура вызова преобразованного метода API (в файле script.js) и обработки результата ответа (силами методов других классов) должна быть такой:
api.methodApi(параметры).then(обработка ответа силами методов других классов).catch(...);

Подчеркну, что блок catch методы класса API содержать не должны, так как метод catch должен быть последним в цепочке промисов, потому что только тогда блок catch
может обнаружить все ошибки (и сети, и серверные, и клиентского приложения), произошедшие в методах then цепочки, расположенных до него.
Об этом также  можно прочитать здесь:
https://learn.javascript.ru/promise-error-handling.
*/

class Api {
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
  // profile() {
  //   fetch('https://nomoreparties.co/cohort12/users/me', {
  //     headers: {
  //       authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1'
  //     }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((result) => {
  //       nameValue.textContent = result.name;
  //       aboutValue.textContent = result.about;
  //       avatar.style.backgroundImage='url('+result.avatar+')';
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // cards() {
  //   fetch('https://nomoreparties.co/cohort12/cards', {
  //     headers: {
  //       authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1'
  //     }
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((result) => {
  //       result.forEach((item)=> {
  //         cardList.addCard(item.name, item.link);
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // editProfile() {
  //   fetch('https://nomoreparties.co/cohort12/users/me', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: 'f3ff5620-355a-45ba-81b6-2c05840deeb1',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: nameForm.value,
  //       about: aboutForm.value
  //     })
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         return res.json();
  //       }

  //       return Promise.reject(`Ошибка: ${res.status}`);
  //     })
  //     .then((result) => {
  //       userInfo.setUserInfo(nameValue, aboutValue, result.name, result.about);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}
