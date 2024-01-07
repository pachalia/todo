import React from 'react'
import {useAppDispatch} from "../../Redux/hook";
import {useController, UseControllerProps, useForm} from "react-hook-form";
import {TodoService} from "../../Services/todo.service";
import {add_todo} from "../../Redux/todoSlice";

type FormValue = {
    Title: string,
    Description:string
}

const Input = (props:UseControllerProps<FormValue>) => {
    const {field} = useController(props)
    return (
        <div style={{width:"100%"}}>
            <input {...field} placeholder={props.name} style={{width:"100%", padding:"10px 0", marginBottom:20}} />
        </div>
    )
}
const AddTodoForm:React.FC = () => {
    const dispatch = useAppDispatch()
    const {control, handleSubmit,reset} = useForm<FormValue>({
        defaultValues:{Title: "", Description:""},
    })
    const onSubmit = async(data:FormValue) =>{
        await new TodoService().create_todo(data.Title, data.Description).then((res) =>{
            dispatch(add_todo(res.todo))
            reset()
        })
            .catch(e => console.log(e))
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: "flex", width: '60%', margin: '0 auto', flexDirection: 'column'}}>
                    <Input control={control} name={"Title"} rules={{required: true}}/>
                    <Input control={control} name="Description"  rules={{required: true}}/>
                    <button type={"submit"} style={{cursor: "pointer", width:'30%', margin: '0 auto', padding: '5px 0'}}>Добавить</button>
                </div>
            </form>
        </>
    )
}

export default AddTodoForm




