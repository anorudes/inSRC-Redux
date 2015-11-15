export const linkAndBold = (text) => {
  let replacedText;

  const replacePattern1 = /(\b(https?):\/\/[-A-Z0-9+&amp;@#\/%?=~_|!:,.;]*[-A-Z0-9+&amp;@#\/%=~_|])/ig;
  replacedText = text.replace(replacePattern1, '<a class="colored-link-1" title="$1" href="javascript: gui.Shell.openExternal(\'$1\')">$1</a>');

  const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(replacePattern2, '$1<a class="colored-link-1" href="javascript: gui.Shell.openExternal(\'http://$2\')">$2</a>');

  replacedText = replacedText.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  return replacedText;
};
