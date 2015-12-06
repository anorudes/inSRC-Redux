const gui = __NODE_WEBKIT__ ? require('nw.gui') : false;
const win = __NODE_WEBKIT__ ? gui.Window.get() : false;
const fs = __NODE_WEBKIT__ ? require('fs') : false;
const path = __NODE_WEBKIT__ ? require('path') : false;
const nwPath = __NODE_WEBKIT__ ? process.execPath : false;
const nw = __NODE_WEBKIT__ ? true : false;
let execPath = __NODE_WEBKIT__ ? path.dirname(nwPath).replace(/\\/g, '/') + '/' : '';

if (__NODE_WEBKIT__ && !fs.existsSync(execPath + 'config.json')) {
  execPath = '';
}

export {
  nw,
  gui,
  win,
  fs,
  path,
  nwPath,
  execPath,
};
