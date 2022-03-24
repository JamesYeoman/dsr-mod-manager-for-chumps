import React from 'react';

import IconBase from './Base';

export interface DropdownArrowProps {
  classname?: string;
}

const DropdownArrow = ({ classname }: DropdownArrowProps) => (
  <IconBase className={classname} x={120} y={120}>
    {/* Top-left-to-center */}
    <polygon points="21 23 79 79 99 60 41 3" strokeWidth="1" />

    {/* Bottom-left-to-center */}
    <polygon points="21 97 41 117 99 60 79 41" strokeWidth="1" />
  </IconBase>
);

export default DropdownArrow;
