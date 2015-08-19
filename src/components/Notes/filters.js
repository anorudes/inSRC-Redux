
export let searchByTitle = (item, input) => {
  let noteTitle = item.title.toLowerCase().split(' ');
  let searchTitle = input.split(' ');
  let found = 0;
  for (let searchT of searchTitle) {
    for (let noteT of noteTitle) {
      if (noteT.indexOf(searchT) >= 0) {
        found += 1;
        break;
      }
    }
  }
  return found === searchTitle.length;
};

export let searchByKeywords = (item, input) => {
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


export let searchByText = (item, input) => {
  let noteText = item.text.toLowerCase();
  let searchText = input.split(' ');
  let found = 0;
  for (let searchT of searchText) {
    if (noteText.indexOf(searchT) >= 0) {
      found += 1;
    }
  }
  return found === searchText.length;
};
