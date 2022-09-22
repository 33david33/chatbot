import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import Svg from './Svg';
import { SvgIconType } from '../../types/types';

const useStyles = makeStyles(() => ({
  noPadding: {
    paddingLeft: '0px',
    paddingRight: '0px',
    minWidth: '44px',
    height: '100%',
  },
}));

type Props = {
  svgName: SvgIconType;
  handleClick: () => void;
  disabled?: boolean;
};
const SendButton = ({ svgName, handleClick, disabled }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Button
      onClick={handleClick}
      color="primary"
      variant="contained"
      size="small"
      className={classes.noPadding}
      disabled={disabled}
    >
      <Svg svgName={svgName} width={24} height={24} />
    </Button>
  );
};

SendButton.defaultProps = {
  disabled: false,
};

export default React.memo(SendButton);
