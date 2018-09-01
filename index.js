const axios = require('axios');

axios.defaults.baseURL = 'https://dublintransportapi.herokuapp.com/api/';

class Service {
  constructor(service) {
    this.service = service;
  }

  get(id) {
    return new Promise((resolve, reject) => (
      axios.get(id ? `${this.service}/stops/${id}` : `${this.service}/stops`)
        .then(({ data }) => resolve(data))
        .catch(({ response: { data } }) => reject(data))
    ));
  }

  nearby(location) {
    return new Promise((resolve, reject) => (
      axios.post(`${this.service}/stops/nearby`, { location })
        .then(({ data }) => resolve(data))
        .catch(({ response: { data } }) => reject(data))
    ));
  }
}

class Api {
  constructor() {
    this.bus = new Service('bus');
    this.dart = new Service('dart');
    this.luas = new Service('luas');
  }

  /* eslint-disable */
  authenticate(key) {
    axios.default.defaults.headers.common.Auth = key;
  }

  nearby(location) {
    return new Promise((resolve, reject) => (
      axios.post('/nearby', { location })
        .then(({ data }) => resolve(data))
        .catch(({ response: { data } }) => reject(data))
    ));
  }
}
  /* eslint-enable */

module.exports = new Api();
