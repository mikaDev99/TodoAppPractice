import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const DefaultThemeProvider = (props) => {
  return (
        <MuiThemeProvider theme={theme}>{
            props.children}
        </MuiThemeProvider>
    );
};

export default DefaultThemeProvider;
