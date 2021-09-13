import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B8A4C7", //light purple
      contrastText: "#fff",
    },
    secondary: {
      main: "#ec407a",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    button: {
      fontFamily: "Montserrat, sans-serif",
      textTransform: "none",
      fontWeight: "bold",
      color: "white",
    },
    h3: {
      fontSize: "3rem",
    },
    h4: {
      fontSize: "1.7rem",
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },

  overrides: {
    MuiInputBase: {
      input: {
        color: "white",
        fontSize: "0.9rem",
      },
    },
    MuiFormLabel: {
      root: {
        color: "#dacfed",
        fontSize: "1rem",
        "& .Mui-disabled": {
          color: "rgba(230, 230, 230, 0.5)",
        },
      },
    },
    MuiButton: {
      label: {
        color: "white",
      },
    },
    MuiFormHelperText: {
      root: {
        color: "red",
      },
    },

    MuiPaginationItem: {
      root: {
        color: "white",
      },
    },
    MuiPagination: {
      ul: {
        justifyContent: "center",
      },
    },
  },
});

export default theme;
