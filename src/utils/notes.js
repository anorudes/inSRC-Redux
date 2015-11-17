export const trim = (text) => {
  const arr = text.split('---');
  arr.forEach((item, index) => {
    const _item = item.replace(new RegExp('^(js|html|css|php|auto|a)', 'gm'), '');
    const spaces = _item.match(/^(\s*)/m);
    if (spaces[1] !== undefined && spaces[1] !== '' && spaces[1] !== '\n') {
      spaces[1] = spaces[1].split('\n').join('');
      arr[index] = arr[index].replace(new RegExp('^' + spaces[1], 'gm'), '');
    }
  });
  return arr.join('---');
};

export const search = (item, input, all) => {
  const noteTitle = item.titleL.split(' ');
  const noteKeywords = item.keywordsL.split(' ');
  const noteText = item.textL;
  const searchTitle = input;
  let found = 0;
  for (const searchT of searchTitle) {
    let foundB = false;
    for (const noteT of noteTitle) {
      if (noteT.indexOf(searchT) >= 0) {
        found += 1;
        foundB = true;
        break;
      }
    }
    if (!foundB) {
      for (const noteT of noteKeywords) {
        if (noteT.indexOf(searchT) >= 0) {
          found += 1;
          foundB = true;
          break;
        }
      }
    }
    if (all && !foundB) {
      if (noteText.indexOf(searchT) >= 0) {
        found += 1;
        foundB = true;
        break;
      }
    }
  }
  return found === searchTitle.length;
};
