/* config */
import Hotkeys from './hotkeys';
import Tray from './tray';
import { fetchConfig } from 'actions/config';
import hljs from 'highlight.js/lib/highlight';


export let configInit = (dispatch) => {
  dispatch(fetchConfig((data) => {
    hljs.configure({
      tabReplace: '  ',
    });
    window.nw && Hotkeys.init(data);
    window.nw && Tray.init(data);
  }));
}