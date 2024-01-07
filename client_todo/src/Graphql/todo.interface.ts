import {Todo} from "../Redux/todoSlice";

export interface I_Todo {
    getTodo:Todo[]
}

export interface I_TODO_DELETE {
    delete: boolean
}

export interface I_TODO_STATUS {
    update: Todo
}

export interface I_CREATE_TODO {
    create: Todo
}