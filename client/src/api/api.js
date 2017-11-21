const API = 'http://localhost:5000/';

export class Api {
  static get API() {
    return API;
  }

  static handleErrors(response) {
    if (!response.ok) {
        console.log("error", response);
        return {error: response.statusText};
    }
    return response.json();
  };

  static postUrl(url) {
    let response = []
    console.log(url);
    return fetch(`${Api.API}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url   
          })
      }).then((response) => {
          return this.handleErrors(response);
      }).then((response) => {
          console.log(response);
          return {
              response: response
          };
      });
  }
}

export default Api;
