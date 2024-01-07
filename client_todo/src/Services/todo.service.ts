import {ApolloClient, InMemoryCache} from "@apollo/client";
import {I_CREATE_TODO, I_Todo, I_TODO_DELETE, I_TODO_STATUS} from "../Graphql/todo.interface";
import {CREATE_TODO, DELETE_TODO, GET_TODO, UPDATE_STATUS_TODO} from "../Graphql/graphql.query";
import {Todo} from "../Redux/todoSlice";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery:{
            fetchPolicy:"no-cache"
        }
    }
})

interface I_Todos_Response {
    todos:Todo[]
    loading: boolean
    error:any
}
interface I_Todo_Delete_Response {
    delete:boolean
    loading: boolean
    error:any
}
interface I_Todo_Response {
    todo: Todo
    loading: boolean
    error:any
}


export class TodoService {
    get_todos():Promise<I_Todos_Response>{
        return new Promise((resolve, reject) =>{
            client.watchQuery<I_Todo>({
                query: GET_TODO
            })
                .subscribe({
                    next: (res) =>resolve({
                        error:res.error,
                        loading:res.loading,
                        todos:res.data.getTodo}),
                    error: (err) => reject(err.message)
                })
        })
    }
    delete_todo(id:string):Promise<I_Todo_Delete_Response> {
        return new Promise((resolve, reject)=>{
            client.watchQuery<I_TODO_DELETE>({
                query: DELETE_TODO,
                variables:{id}
            })
                .subscribe({
                    next:(val) => resolve({
                        error:val.error,
                        loading:val.loading,
                        delete:val.data.delete}),
                    error: (e)=> reject(e.message)
                })
        })
    }
    update_status_todo(id:string):Promise<I_Todo_Response> {
        return new Promise((resolve, reject) => {
            client.watchQuery<I_TODO_STATUS>({
                query: UPDATE_STATUS_TODO,
                variables: {id}
            })
                .subscribe({
                    next: (val) => resolve({
                        todo: val.data.update,
                        loading: val.loading,
                        error: val.error
                    }),
                    error:(err) =>reject(err.message)
                })
        })
    }

    create_todo(title:string, description:string):Promise<I_Todo_Response> {
        return new Promise((resolve, reject) =>{
            client.watchQuery<I_CREATE_TODO>({
                query: CREATE_TODO,
                variables: {title,description}
            })
                .subscribe({
                    next: (val) => resolve({
                        todo: val.data.create,
                        loading: val.loading,
                        error: val.error
                    }),
                    error: (err) => reject(err.message)
                })
        })
    }
}