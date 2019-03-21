import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);
    // const [todoState, setTodoState] = useState({userInput: '', todoList: []})

    // the empty array passed as the second argument tells it to only run this function when the component mounts. If you want to run the api call when something changes, pass that variable into the array and it will listen for changes. 

    // The return statement in the first argument specifies what to do when the component unmounts. 
    useEffect(() => {
        axios.get('https://hooks-testing.firebaseio.com/todos.json').then(res => {
            console.log(res);
            const todoData = res.data;
            const todos = [];
            for (let key in todoData) {
                todos.push({id: key, name: todoData[key].name})
            }
            setTodoList(todos);
        });
        return () => {
            console.log('Cleanup');
        };
    }, [todoName]);

    const mouseMoveHandler = event => {
        console.log(event.clientX, event.clientY);
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        }
    }, [])

    const inputChangeHandler = event => {
        setTodoName(event.target.value);
        // setTodoState({userInput: event.target.value, todoList: todoState.todoList})
    }

    const todoAddHandler = () => {
        setTodoList(todoList.concat(todoName));
        axios.post('https://hooks-testing.firebaseio.com/todos.json', {name: todoName})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        // setTodoState({userInput: todoState.userInput, todoList: todoState.todoList.concat(todoState.userInput)});
    }

    return (
        <Fragment>
            <input 
            type='text' 
            placeholder='todo' 
            onChange={inputChangeHandler} 
            value={todoName} 
            />
            <button type='button' onClick={todoAddHandler}>Add</button>
            <ul>
                {todoList.map((todo, i) => (<li key={todo.id}>{todo.name}</li>))}
            </ul>
        </Fragment>
    )
}

export default todo;