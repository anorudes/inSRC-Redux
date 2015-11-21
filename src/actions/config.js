import { CONFIG_PATH } from 'constants';

export function getConfig(data) {
  return {
    type: 'GET_CONFIG',
    data,
  };
}

export function fetchConfig(callback) {
  if (window.globalConfig.nw) { // for nw.js
    return dispatch => {
      const data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
      dispatch(getConfig(data));
      callback(data);
    };
  } else {
    return dispatch => {
      fetch(CONFIG_PATH)
        .then(res =>
          res.json().then((data) => {
            dispatch(getConfig(data));
            callback(data);
          }))
        .catch((error) => console.log(error));
    };
  }
}
