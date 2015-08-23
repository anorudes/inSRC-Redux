/* config */
import Hotkeys from './hotkeys';
import Tray from './tray';
import { fetchConfig } from 'actions/config';

export let configInit = (dispatch) => {
  dispatch(fetchConfig((data) => {
    nw && Hotkeys.init(data);
    nw && Tray.init(data);
  }));
}