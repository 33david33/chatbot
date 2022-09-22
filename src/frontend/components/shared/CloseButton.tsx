import React from 'react';
import { Button } from '@material-ui/core';
import Svg from './Svg';

type Props = {
  handleClick: () => void;
};
const CloseButton = ({ handleClick }: Props): JSX.Element => {
  return (
    <Button
      onClick={handleClick}
      size="small"
      color="primary"
      variant="contained"
    >
      <Svg svgName="close" width={24} height={24} />
    </Button>
  );
};

export default React.memo(CloseButton);
