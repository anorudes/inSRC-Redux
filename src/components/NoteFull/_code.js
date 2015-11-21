import React from 'react';

import Highlight from 'react-highlight';

export const Code = ({noteText}) => (
  <div>
    {
      noteText.split('---').map((code, index) => {
        if (code.length) {
          const lang = (code.match(/^(js|html|css|php|auto|a)\n/m) || ['', 'js'])[1];
          const _code = code.replace(new RegExp('^(js|html|css|php|auto|a)\n'), '');
          if (lang === 'auto' || lang === 'a') {
            return (
              <span key={index}>
                <Highlight>{_code}</Highlight>
                <br />
              </span>
            );
          } else {
            return (
              <span key={index}>
                <Highlight className={'language-' + lang}>{_code}</Highlight>
                <br />
              </span>
            );
          }
        }
      })
    }
  </div>
);
