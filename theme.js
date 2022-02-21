import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
      050: "#E3F9E5",
      100: "#C1EAC5",
      200: "#A3D9A5",
      300: "#7BC47F",
      400: "#57AE5B",
      500: "#3F9142",
      600: "#2F8132",
      700: "#207227",
      800: "#0E5814",
      900: "#05400A"
    },
    secondary: {
      main: '#19857b',
    },
    neutrals: {
      000: "#FFFFFF",
      050: "#F5F7FA",
      100: "#E4E7EB",
      200: "#CBD2D9",
      300: "#9AA5B1",
      400: "#52667A",
      500: "#313D49",
      600: "#29333D",
      700: "#212931",
      800: "#181F25",
      900: "#101418",
      999: "#080A0C"
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;