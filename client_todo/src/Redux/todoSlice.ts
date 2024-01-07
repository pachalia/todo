import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Todo {
    id: string
    title:string
    description: string
    status: boolean
    createdAt:string
}

export interface TodoState {
    todo:Todo[]
}

const initState:TodoState = {
    todo: []
}

export const todoSlice = createSlice({
    name: 'Todos',
    initialState: initState,
    reducers: {
        get_todos: (state, action: PayloadAction<Todo[]>) =>{
            state.todo=action.payload
        },
        add_todo:(state,action:PayloadAction<Todo>)=> {
            state.todo = [action.payload, ...state.todo]
        },
        delete_todo:(state, action:PayloadAction<string>)=>{
            state.todo = [...state.todo.filter((val)=>val.id !==action.payload)]
        },
        update_status_todo:(state, action:PayloadAction<Todo>) =>{
            const index = state.todo.findIndex((obj) => obj.id===action.payload.id)
            const todo = state.todo
            if(index !== -1){
                todo[index].status=action.payload.status
            }
            state.todo = [...todo]
        }
    }
})

export const {
    get_todos,
    add_todo,
    delete_todo,
    update_status_todo
} = todoSlice.actions
export default todoSlice.reducer
