import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function TodoTable() {
        const context = useContext(TodoContext);

        const [addTodo, setAddTodo] = useState('');

        return (
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
                                <TableCell>{todo.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton><EditIcon/></IconButton>
                                    <IconButton><DeleteIcon/></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>
        );
}

export default TodoTable;