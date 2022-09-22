import { createTheme } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';

// change theme here
const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: pink,
  },
});

theme.props = {
  MuiButton: {
    disableElevation: true,
  },
};

export default theme;
