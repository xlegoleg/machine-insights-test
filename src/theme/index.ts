import {createTheme} from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: '#7071f3'
    }
  },
  components: {
    MuiDialog: {
      styleOverrides: {
        container: {
          backgroundColor: "rgba(1, 21, 43, 0.8)",
        },
      },
    },
  }
});