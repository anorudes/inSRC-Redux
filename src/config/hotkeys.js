import { store } from '../store';
import { searchNotes } from 'actions/notes';

export default class Hotkeys {
  static init = (data, router) => {
    let shortcutList = new gui.Shortcut({ key : data.hotkeyList, active : function() {
      location.hash = "list";
      win.focus();
      win.show();
      setTimeout(() => {
        let search = document.getElementById('search');
        store.dispatch(searchNotes(''));
        search.focus();
        search.value = '';
      }, 50);
    }});

    let shortcutAdd = new gui.Shortcut({ key : data.hotkeyAdd, active : function() {
      location.hash = "add";
      win.focus();
      win.show();
    }});

    gui.App.registerGlobalHotKey(shortcutList);
    gui.App.registerGlobalHotKey(shortcutAdd);
  };
}
