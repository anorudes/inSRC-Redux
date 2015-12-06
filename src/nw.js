export const gui = __NODE_WEBKIT__ ? require('nw.gui') : false;
export const win = __NODE_WEBKIT__ ? gui.Window.get() : false;
export const fs = __NODE_WEBKIT__ ? require('fs') : false;
export const path = __NODE_WEBKIT__ ? require('path') : false;
export const nwPath = __NODE_WEBKIT__ ? process.execPath : false;
export const nw = __NODE_WEBKIT__ ? true : false;

let execPath = path.dirname(nwPath).replace(/\\/g, "/") + '/';
if (__NODE_WEBKIT__ && !fs.existsSync(execPath + 'config.json')) {
  execPath = '';
}

export { execPath };
