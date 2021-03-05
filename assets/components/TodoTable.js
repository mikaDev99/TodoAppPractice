import { IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,} from "@material-ui/core";
import React, { Fragment, useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import DeleteDialog from "./DeleteDialog";

const useStyles = makeStyles(theme => ({
  thead: {
    backgroundColor: 'red'
  }
}));

function TodoTable() {
  const context = useContext(TodoContext);
  const [addTodoTask, setAddTodoTask] = useState("");
  const [addTodoDescription, setAddTodoDescription] = useState("");
  const [editIsShown, setEditIsShown] = useState(false);
  const [editTodoTask, setEditTodoTask] = useState("");
  const [editTodoDescription, setEditTodoDescription] = useState("");
  const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(
    false
  );
  const [todoToBeDelete, setTodoToBeDelete] = useState(null);

  const classes = useStyles();

  const onCreateSubmit = (event) => {
    event.preventDefault();
    context.createTodo(event, {
      task: addTodoTask,
      description: addTodoDescription,
    });
    setAddTodoTask("");
    setAddTodoDescription("");
  };

  const onEditSubmit = (todoId, event) => {
    event.preventDefault();
    context.updateTodo({
      id: todoId,
      task: editTodoTask,
      description: editTodoDescription,
    });
    setEditIsShown(false);
  };

  return (
    <Fragment>
      <Table>
        <TableHead className={classes.thead}>
          <TableRow>
            <TableCell>Tareas</TableCell>
            <TableCell>Descripciones</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <form onSubmit={onCreateSubmit}>
                <TextField
                  type="text"
                  value={addTodoTask}
                  onChange={(event) => {
                    setAddTodoTask(event.target.value);
                  }}
                  label="Nueva Tarea"
                  fullWidth={true}
                />
              </form>
            </TableCell>

            <TableCell>
              <form>
                <TextField
                  type="text"
                  value={addTodoDescription}
                  onChange={(event) => {
                    setAddTodoDescription(event.target.value);
                  }}
                  label="Descripcion"
                  fullWidth={true}
                  multiline={true}
                />
              </form>
            </TableCell>

            <TableCell align="right">
              <IconButton onClick={onCreateSubmit}>
                <AddIcon />
              </IconButton>
            </TableCell>
          </TableRow>
          {context.todos
            .slice()
            .reverse()
            .map((todo, index) => (
              <TableRow key={"todo " + index}>
                <TableCell>
                  {editIsShown === todo.id ? (
                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        fullWidth={true}
                        autoFocus={true}
                        value={editTodoTask}
                        onChange={(event) => {
                          setEditTodoTask(event.target.value);
                        }}
                      />
                    </form>
                  ) : (
                    <Typography>{todo.task}</Typography>
                  )}
                </TableCell>

                <TableCell>
                  {editIsShown === todo.id ? (
                    <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                      <TextField
                        type="text"
                        fullWidth={true}
                        value={editTodoDescription}
                        onChange={(event) =>
                          setEditTodoDescription(event.target.value)
                        }
                        multiline={true}
                      />
                    </form>
                  ) : (
                    <Typography style={{ whiteSpace: "pre-wrap" }}>
                      {todo.description}
                    </Typography>
                  )}
                </TableCell>

                <TableCell align="right">
                  {editIsShown === todo.id ? (
                    <Fragment>
                      <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                        <DoneIcon />
                      </IconButton>
                      <IconButton onClick={() => setEditIsShown(false)}>
                        <CloseIcon />
                      </IconButton>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <IconButton
                        onClick={() => {
                          setEditIsShown(todo.id);
                          setEditTodoTask(todo.task);
                          setEditTodoDescription(todo.description);
                        }}
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        onClick={() => {
                          setDeleteConfirmationIsShown(true);
                          setTodoToBeDelete(todo);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Fragment>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {deleteConfirmationIsShown && (
        <DeleteDialog
          todo={todoToBeDelete}
          open={deleteConfirmationIsShown}
          setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
        />
      )}
    </Fragment>
  );
}

export default TodoTable;
