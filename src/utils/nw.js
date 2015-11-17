/* global win, gui */

import { store } from '../store';
import { searchNotes } from 'actions/notes';

export const Hotkeys = {
  init: (data) => {
    const shortcutList = new gui.Shortcut({ key: data.hotkeyList, active: () => {
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

    const shortcutAdd = new gui.Shortcut({ key: data.hotkeyAdd, active: () => {
      location.hash = 'add';
      win.focus();
      win.show();
    }});
    document.onkeydown = (event) => {
      if (event.keyCode === 27) {
        win.minimize();
      }
    };
    gui.App.registerGlobalHotKey(shortcutList);
    gui.App.registerGlobalHotKey(shortcutAdd);
  },
};

export const Tray = {
  init: () => {
    let enableClose = false;

    win.on('close', () => {
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
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'List', click: () => {
        location.hash = '#/list/';
        showWindow();
      }}));
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Add', click: () => {
        location.hash = '#/add/';
        showWindow();
      }}));
      menu.append(new gui.MenuItem({ type: 'checkbox', label: 'Exit', click: () => {
        enableClose = true;
        win.close();
      }}));
      tray.menu = menu;
      tray.on('click', () => {
        location.hash = '#/list/';
        showWindow();
      });
    };

    win.on('minimize', () => {
      win.hide();
    });

    min();

    location.hash = 'list';
  },
};

