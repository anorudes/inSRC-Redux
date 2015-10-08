import expect from 'expect.js';
import { notes as reducer } from 'reducers/notes';

const initialState = {
  notes: [],
  openNote: {},
  scrollY: 0,
  searchText: "",
};

const stateAfterAdd = {
  notes: [{
    id: 1,
    title: 'test',
    titleL: 'test',
    keywords: 'test',
    keywordsL: 'test',
    text: 'test',
    textL: 'test',
    date: '01/01/2015',
  }],
  openNote: {},
  scrollY: 0,
  searchText: "",
};

describe("Notes reducer:", () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.equal(initialState);
  });

  it('should handle ADD', () => {
    expect(
      items(initialState, {
        type: 'ADD_NOTE',
        note: {
          title: 'test',
          keywords: 'test',
          text: 'test',
          date: '01/01/2015',
        },
      })
    ).to.equal(stateAfterAdd);
  });

  it('should handle SAVE', () => {
    expect(
      items(stateAfterAdd, {
        type: 'SAVE_NOTE',
        note: {
          id: 1,
          title: 'test2',
          keywords: 'test2',
          text: 'test2',
        },
      })
    ).to.equal({
      notes: [{
        id: 1,
        title: 'test',
        titleL: 'test',
        keywords: 'test',
        keywordsL: 'test',
        text: 'test',
        textL: 'test',
        date: '01/01/2015',
      }],
      openNote: {},
      scrollY: 0,
      searchText: "",
    });
  });

  it('should handle DELETE', () => {
    expect(
      items(stateAfterAdd, {
        type: 'DELETE_NOTE',
        id: 1,
      })
    ).to.equal(stateAfterAdd);
  });
});

