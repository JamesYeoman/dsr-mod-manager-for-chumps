import type { ReactNode, SVGProps } from 'react';

import React from 'react';

interface IconBaseProps {
  className?: string;
  x: number;
  y: number;
  children: ReactNode;
}

const IconBase = (props: IconBaseProps) => {
  const { className, x, y, children } = props;
  const svgProps: Partial<SVGProps<SVGSVGElement>> = {
    xmlns: 'http://www.w3.org/2000/svg',
    version: '1.1',
    x: '0px',
    y: '0px',
    viewBox: `0 0 ${x} ${y}`,
  };

  if (className && className.length > 0) {
    svgProps.className = className;
  }

  return <svg {...svgProps}>{children}</svg>;
};

export default IconBase;
