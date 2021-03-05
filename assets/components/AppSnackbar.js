import { Button, Snackbar, SnackbarContent } from "@material-ui/core";
import React, { Fragment, useContext, Component } from "react";
import { TodoContext } from "../contexts/TodoContext";

function checkLevel(level) {
  switch (level) {
    case "success":
      return "green";
      break;
    case "error":
      return "red";
      break;
    default:
      return "white";
      break;
  }
}

function AppSnackbar() {
  const context = useContext(TodoContext);

  return (
    <Snackbar autoHideDuration={6000} open={context.message.text !== undefined}>
      {context.message.text && (
        <SnackbarContent
          style={{ backgroundColor: checkLevel(context.message.level) }}
          message={context.message.text}
          action={[
            <Button
              onClick={() => context.setMessage({})}
              key="dismiss"
              color="inherit"
            >
              dismiss
            </Button>,
          ]}
        />
      )}
    </Snackbar>
  );
}

export default AppSnackbar;
