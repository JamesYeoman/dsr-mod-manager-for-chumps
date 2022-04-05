import React from 'react';

import IconBase, { IconProps } from './Base';

/* https://www.svgrepo.com/svg/82691/folder */
const FolderIcon = ({ className }: IconProps) => (
  <IconBase className={className} x={240} y={200}>
    <desc>Click me to open up a folder picker dialog!</desc>
    <polygon points="225,53 15,53 15,0 85,0 93,19 225,19" />
    <polygon points="15,200 225,200 240,66 0,66" />
  </IconBase>
);

export default FolderIcon;
