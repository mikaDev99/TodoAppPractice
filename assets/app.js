import { CssBaseline } from '@material-ui/core';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoTable from './components/TodoTable';
import TodoContextProvider, { TodoContext } from './contexts/TodoContext';

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
