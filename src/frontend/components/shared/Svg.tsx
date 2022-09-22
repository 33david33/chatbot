import React from 'react';
import { uiConfig } from '../../config';
import renderSVG from '../../config/svgConfig';
import { SvgIconType } from '../../types/types';

type Props = {
  svgName: SvgIconType;
  width?: number;
  height?: number;
  fill?: string;
};

const Svg = ({ svgName, width, height, fill }: Props): JSX.Element => {
  return <>{renderSVG(svgName, width, height, fill)}</>;
};

Svg.defaultProps = {
  width: uiConfig.defaultIconWidth,
  height: uiConfig.defaultIconHeight,
  fill: '#000',
};
export default Svg;
