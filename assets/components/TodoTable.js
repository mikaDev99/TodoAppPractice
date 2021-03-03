import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import DeleteDialog from './DeleteDialog';

function TodoTable() {
        const context = useContext(TodoContext);

        const [addTodo, setAddTodo] = useState('');
        const [editIsShown, setEditIsShown] = useState(false);
        const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
        const [editTodo, setEditTodo] = useState('');
        const [todoToBeDelete, setTodoToBeDelete] = useState(null);

        return (
            <Fragment>
            <form onSubmit={(event) => {
                context.createTodo(event ,{name: addTodo});
                }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tareas</TableCell>
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField value={addTodo} onChange={(event) => {setAddTodo(event.target.value)}} label="Nueva Tarea" fullWidth={true}/>
                            </TableCell>
                            <TableCell align="right">
                                <IconButton type="submit">
                                    <AddIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map((todo, index) => (
                            <TableRow key={'todo ' + index}>
                                <TableCell>
                                    {editIsShown === todo.id ?
                                        <TextField 
                                        fullWidth={true} 
                                        value={editTodo} 
                                        onChange={(event) => {
                                            setEditTodo(event.target.value);
                                        }}
                                        InputProps={{
                                            endAdornment:  <Fragment>
                                                <IconButton onClick={() => 
                                                    {setEditIsShown(false);
                                                    }}>
                                                        <CloseIcon/>
                                                </IconButton>
                                                <IconButton onClick={() =>
                                                    {context.updateTodo({id: todo.id, name: editTodo});
                                                    setEditIsShown(false);
                                                }}>
                                                    <DoneIcon/>
                                                </IconButton>
                                            </Fragment>,
                                        }}
                                        />

                                    :
                                    
                                    todo.name
                                    
                                    }



                                    </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => {
                                        setEditIsShown(todo.id);
                                        setEditTodo(todo.name)
                                    }}>
                                        <EditIcon/>
                                    </IconButton>

                                    


                                    <IconButton onClick={() => {
                                        setDeleteConfirmationIsShown(true); 
                                        setTodoToBeDelete(todo);
                                        }}>
                                        <DeleteIcon/>
                                    </IconButton>






                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </form>
                
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