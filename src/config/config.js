import Hotkeys from './hotkeys';
import Tray from './tray';

export let Config = {
  data: {},
  load() {
    return fetch('/config.json')
      .then(res =>
        res.json().then(data => this.data = data).then(() => {
          nw && Hotkeys.init();
          nw && Tray.init();
        })
    );
  }
};
