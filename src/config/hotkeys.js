export default class Hotkeys {
  static init = () => {
    let shortcutList = new gui.Shortcut({ key : ConfigService.configData.hotkeyList, active : function() {
      //TODO
      win.focus();
    }});

    let shortcutAdd = new gui.Shortcut({ key : ConfigService.configData.hotkeyAdd, active : function() {
      //TODO
      win.focus();
    }});

    gui.App.registerGlobalHotKey(shortcutList);
    gui.App.registerGlobalHotKey(shortcutAdd);
  };
}
