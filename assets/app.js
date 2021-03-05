import { CssBaseline } from "@material-ui/core";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import AppSnackbar from "./components/AppSnackbar";
import DefaultThemeProvider from "./components/themes/DefaultThemeProvider";
import TodoTable from "./components/TodoTable";
import TodoContextProvider, { TodoContext } from "./contexts/TodoContext";

class App extends Component {
  render() {
    return (
      <TodoContextProvider>
        <CssBaseline>
          <TodoTable />
          <AppSnackbar />
        </CssBaseline>
      </TodoContextProvider>
    );
  }
}

ReactDOM.render(<DefaultThemeProvider>
  <App />
</DefaultThemeProvider>, document.getElementById("root"));
