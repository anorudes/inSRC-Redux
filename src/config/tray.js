export default class Tray {
  static init = () => {
    let enableClose = false;

    win.on('close', function() {
      if (enableClose) {
        gui.App.quit();
      } else {
        win.minimize();
      }
    });

    let min = () => {
      win.hide();
      let tray = new gui.Tray({ icon: 'icon.png' });
      let menu = new gui.Menu();
      let showWindow = () => {
        win.show();
        tray.remove();
        tray = null;
      };
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'List', click: function() {
        location.hash = "#/list/";
        showWindow();
      }}));
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Add', click: function() {
        location.hash = "#/add/";
        showWindow();
      }}));

      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Exit', click: function() {
        enableClose = true;
        win.close();
      }}));
      tray.menu = menu;
      tray.on('click', function() {
        showWindow();
      });
    }

    win.on('minimize', function() {
      min();
    });

    min();
  };
}
