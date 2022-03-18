import React from 'react';

import IconBase from './Base';

export interface FolderIconProps {
  styling?: string;
}

/* https://www.svgrepo.com/svg/82691/folder */
const FolderIcon = ({ styling }: FolderIconProps) => (
  <IconBase className={styling} x={240} y={240}>
    <desc>Click me to open up a folder picker dialog!</desc>
    <path d="M226 76 H14 V23 h71 l8 19 h133 V76 z" />
    <path d="M5 217 h230 L240 89 H0 L5 217 z" />
  </IconBase>
);

export default FolderIcon;
