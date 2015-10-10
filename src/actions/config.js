let configPath = window.globalConfig.execPath + 'config.json';

export function getConfig(data) {
  return {
    type: 'GET_CONFIG',
    data,
  };
}

export function fetchConfig(callback) {
  if (window.globalConfig.nw) { // for nw.js
    return dispatch => {
      let data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      dispatch(getConfig(data));
      callback(data);
    }
  } else { // for site
    return dispatch => {
      fetch(configPath)
        .then(res =>
          res.json().then((data) => {
              dispatch(getConfig(data));
              callback(data);
            }
          ))
        .catch((error) => console.log(error))
    }
  }
}
