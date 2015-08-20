export function getConfig(data) {
  return {
    type: 'GET_CONFIG',
    data,
  };
}

export function fetchConfig() {
  return dispatch => {
    fetch('/config.json')
      .then(res =>
        res.json().then(data => this.data = data).then((data) => {
          dispatch(getConfig(data));
        }));
  }
}