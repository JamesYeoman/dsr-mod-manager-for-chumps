import React from 'react';

import IconBase, { IconProps } from './Base';

const FileIcon = (props: IconProps) => (
  <IconBase className={props.className} x={369} y={369}>
    <polygon points="240,0 229,15 244,26 300,80 311,95 326,87" />
    <polygon points="229,95 244,80 300,80 311,95" />
    <polygon points="229,15 229,95 244,80 244,25" />
    <polygon points="43,0 240,0 229,15 58,15 58,354 43,369" />
    <polygon points="43,369 58,354 311,354 311,95 326,87 326,369" />

    {/* "Content" lines */}
    <g>
      <rect x="86" y="80" width="120" height="20" />
      <rect x="86" y="150" width="200" height="20" />
      <rect x="86" y="220" width="200" height="20" />
      <rect x="86" y="290" width="200" height="20" />
    </g>
  </IconBase>
);

export default FileIcon;
