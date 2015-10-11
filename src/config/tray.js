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

    const min = () => {
      const tray = new gui.Tray({ icon: 'icon.png' });
      const menu = new gui.Menu();
      const showWindow = () => {
        win.show();
      };
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'List', click: function() {
        location.hash = '#/list/';
        showWindow();
      }}));
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Add', click: function() {
        location.hash = '#/add/';
        showWindow();
      }}));
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Exit', click: function() {
        enableClose = true;
        win.close();
      }}));
      tray.menu = menu;
      tray.on('click', function() {
        location.hash = '#/list/';
        showWindow();
      });
    };

    win.on('minimize', function() {
      win.hide();
    });

    min();

    location.hash = 'list';
  };
}
