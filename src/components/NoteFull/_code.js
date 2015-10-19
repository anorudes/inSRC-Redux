import React from 'react';

import Highlight from 'react-highlight';

export const Code = ({noteText}) => (
  <div>
    {
      noteText.split('---').map((code, i) => {
        if (code.length) {
          let lang = (code.match(/^(js|html|css|php|auto|a)\n/m) || ['', 'js'])[1];
          if (lang !== 'js' && lang !== 'html' && lang !== 'css' && lang !== 'php' && lang !== 'auto' && lang !== 'a') {
            lang = 'js';
          }
          code = code.replace(new RegExp('^(js|html|css|php|auto|a)\n'), '');
          if (lang === 'auto' || lang === 'a') {
            return (<span key={i}><Highlight>{code}</Highlight><br /></span>);
          } else {
            return (<span key={i}><Highlight className={'language-' + lang}>{code}</Highlight><br /></span>);
          }
        }
      })
    }
  </div>
);
