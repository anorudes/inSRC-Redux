/* config */
import Hotkeys from './hotkeys';
import Tray from './tray';
import { fetchConfig } from 'actions/config';
import hljs from 'highlight.js/lib/highlight';

export const configInit = (dispatch) => {
  dispatch(fetchConfig((data) => {
    hljs.configure({
      tabReplace: '  ',
    });
    window.globalConfig.nw && Hotkeys.init(data);
    window.globalConfig.nw && Tray.init(data);
  }));
};
