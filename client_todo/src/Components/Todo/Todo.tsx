import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "../../Redux/hook";
import {TodoService} from "../../Services/todo.service";
import {delete_todo, get_todos, update_status_todo} from "../../Redux/todoSlice";
import '../../App.scss';
import './todo.scss'

const Todo:React.FC = () => {
    const {todo} = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch()
    const lineTable = ['№', 'Title Todo', 'Description', 'Status', 'Дата создания', 'Удалить']
    useEffect(() => {
        new TodoService().get_todos().then((res) => dispatch(get_todos(res.todos))).catch(e=>alert('Сервер не доступен'))
    }, [dispatch]);
    const handleStatus = async (id:string) => {
        await new TodoService().update_status_todo(id).then((res) =>
            dispatch(update_status_todo(res.todo))).catch((e=>console.log(e)))
    }
    const handleDelete = async (id:string) => {
        await new TodoService().delete_todo(id) && dispatch(delete_todo(id))
    }
    return (
        <>
            {todo.length !==0 &&
                <table style={{width: '90%', margin: '0 auto', marginBottom: 40}}>
                    <thead>
                    <tr>{lineTable.map((val,i)=>
                        <th
                            style={{border: '1px solid black', width: i===1 ? '30%': 'inherit'}}
                            key={i}>{val}
                        </th>
                    )}
                    </tr>
                    </thead>
                    <tbody>
                    {todo.map((val,i) =>
                        <tr key={i}>
                            <td className={val.status ? "status" : undefined}>{i+1}</td>
                            <td className={val.status ? "status" : undefined}
                                onClick={()=> handleStatus(val.id)}
                                style={{cursor: 'pointer', width: '20%'}}>{val.title}
                            </td>
                            <td className={val.status ? "status" : undefined} style={{width:'40%'}}>{val.description}</td>
                            <td className={val.status ? "status" : undefined}>{val.status ? 'Выполнен' : 'Не выполнен'}</td>
                            <td className={val.status ? "status" : undefined}>{new Date(+val.createdAt).toLocaleDateString('ru',{
                                day:"numeric",
                                month: "numeric",
                                year: "numeric",
                                hour:"2-digit",
                                minute:"2-digit"
                            })}</td>
                            <td className={val.status ? "status" : undefined}
                                onClick={()=>handleDelete(val.id)}
                                style={{cursor: 'pointer'}}>Удалить</td>
                        </tr>)}
                    </tbody>
                </table>
            }
        </>
    )
}

export default Todo