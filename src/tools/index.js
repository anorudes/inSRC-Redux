export let trim = (text) => {
  let arr = text.split('---');
  arr.forEach(function (item, index) {
    item = item.replace(new RegExp('(js|html|css|php|auto|a)', 'gm'), '');
    let spaces = item.match(/^(\s*)/m);
    if (spaces[1] !== undefined && spaces[1] !== '' && spaces[1] !== '\n') {
      spaces[1] = spaces[1].split('\n').join('');
      arr[index] = arr[index].replace(new RegExp('^' + spaces[1], 'gm'), '');
    }
  });
  return arr.join('---');
};

export let search = (item, input, all) => {
  let noteTitle = item.titleL.split(' ');
  let noteKeywords = item.keywordsL.split(' ');
  let noteText = item.textL;
  let searchTitle = input;
  let found = 0;
  for (let searchT of searchTitle) {
    let foundB = false;
    for (let noteT of noteTitle) {
      if (noteT.indexOf(searchT) >= 0) {
        found += 1;
        foundB = true;
        break;
      }
    }
    if (!foundB) {
      for (let noteT of noteKeywords) {
        if (noteT.indexOf(searchT) >= 0) {
          found += 1;
          foundB = true;
          break;
        }
      }
    }
    if (all && !foundB) {
      for (let noteT of noteText) {
        if (noteText.indexOf(searchT) >= 0) {
          found += 1;
          foundB = true;
          break;
        }
      }
    }
  }
  return found === searchTitle.length;
};
