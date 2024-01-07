import {gql} from "@apollo/client";

export const GET_TODO = gql`
    query {
        getTodo {
            id
            title
            description
            status
            createdAt
        }
    }
`

export const DELETE_TODO = gql`
    mutation deleteTodo($id:String!) {
        delete(id: $id)
    }
`

export const UPDATE_STATUS_TODO =gql`
    mutation updateTodo($id: String!) {
        update(id: $id) {
            id
            title
            description
            status
            createdAt
        }
    }
`

export const CREATE_TODO = gql`
    mutation create ($title: String!, $description: String!){
        create(title: $title, description: $description){
            id
            title
            description
            status
            createdAt
        }
    }
`