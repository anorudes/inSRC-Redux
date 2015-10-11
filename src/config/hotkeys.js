import { store } from '../store';
import { searchNotes } from 'actions/notes';

export default class Hotkeys {
  static init = (data) => {
    const shortcutList = new gui.Shortcut({ key: data.hotkeyList, active: function() {
      location.hash = 'list';
      win.focus();
      win.show();
      setTimeout(() => {
        const search = document.getElementById('search');
        store.dispatch(searchNotes(''));
        search.focus();
        search.value = '';
      }, 50);
    }});

    const shortcutAdd = new gui.Shortcut({ key: data.hotkeyAdd, active: function() {
      location.hash = 'add';
      win.focus();
      win.show();
    }});
    document.onkeydown = (e) => {
      if (e.keyCode === 27) {
        win.minimize();
      }
    };
    gui.App.registerGlobalHotKey(shortcutList);
    gui.App.registerGlobalHotKey(shortcutAdd);
  };
}
