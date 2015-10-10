import React from 'react';

import { Notes, SearchNotes } from 'components';

export const List = (props) => (
  <div>
    <SearchNotes {...props} />
    <Notes {...props} />
  </div>
);
