
export let search = (item, input, all) => {
  let noteTitle = item.title.toLowerCase().split(' ');
  let noteKeywords = item.keywords.toLowerCase().split(',');
  let noteText = item.text.toLowerCase();
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

export let searchAll = (item, input) => {
  let noteKeywords = item.keywords.toLowerCase().split(',');
  let searchKeywords = input.split(' ');
  let found = 0;
  for (let searchKeyword of searchKeywords) {
    for (let noteKeyword of noteKeywords) {
      if (noteKeyword.indexOf(searchKeyword) >= 0) {
        found += 1;
        break;
      }
    }
  }
  return found === searchKeywords.length;
};
