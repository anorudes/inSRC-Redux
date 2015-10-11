export const linkAndBold = (text) => {
  let replacedText, replacePattern1, replacePattern2;
  replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
  if (window.globalConfig.nw) {
    replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="javascript: gui.Shell.openExternal(\'$1\')">$1</a>');
  } else {
    replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="$1" target="_blank">$1</a>');
  }

  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  if (window.globalConfig.nw) {
    replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="javascript: gui.Shell.openExternal(\'http://$2\')">$2</a>');
  } else {
    replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="http://$2" target="_blank">$2</a>');
  }

  replacedText = replacedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  return replacedText;
};
