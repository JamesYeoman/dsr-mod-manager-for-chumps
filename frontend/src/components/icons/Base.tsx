import { ReactNode, SVGProps } from 'react';

interface IconBaseProps {
  className?: string;
  x: number;
  y: number;
  children: ReactNode;
}

const IconBase = (props: IconBaseProps) => {
  const { className, x, y, children } = props;
  let svgProps: Partial<SVGProps<SVGSVGElement>> = {
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
