export default class Hotkeys {
  static init = (data, router) => {
    let shortcutList = new gui.Shortcut({ key : data.hotkeyList, active : function() {
      location.hash = "#/list/";
      win.focus();
    }});

    let shortcutAdd = new gui.Shortcut({ key : data.hotkeyAdd, active : function() {
      location.hash = "#/add/";
      win.focus();
    }});

    gui.App.registerGlobalHotKey(shortcutList);
    gui.App.registerGlobalHotKey(shortcutAdd);
  };
}
