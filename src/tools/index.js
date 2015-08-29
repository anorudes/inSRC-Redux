export let trim = (text) => {
  let arr = text.split('---\n');
  arr.forEach(function (item, index) {
    let regexp = '';
    for (let symbol of item) {
      if (symbol === '\t') {
        regexp += '\\t';
      } else if (symbol === ' ') {
        regexp += ' ';
      } else break;
    }
    arr[index] = regexp !== '' ? arr[index].replace(new RegExp('^' + regexp, 'gm'), '') : arr[index];
  });
  return arr.join('---\n');
}

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

