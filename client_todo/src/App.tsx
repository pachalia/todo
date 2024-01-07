import React from 'react';
// import './App.scss';
import Todo from "./Components/Todo/Todo";
import AddTodoForm from "./Components/Todo/AddTodoForm";


const App:React.FC = () => {
    return (
        <>
            <h1 style={{textAlign: 'center'}}>Todo List</h1>
            <h3 style={{textAlign: 'center'}}>Чтобы изменить статус todo кликните на todo </h3>
            <Todo/>
            <AddTodoForm/>
        </>
    )
}
export default App







