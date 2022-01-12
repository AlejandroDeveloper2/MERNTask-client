import {useContext, useState, useEffect} from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const FormTask = () => {
    //Get form if a project is active
    const projectsContext = useContext(projectContext)
    const {project} = projectsContext

    //Get the function of task context
    const tasksContext = useContext(taskContext)
    const{errorTask, selectedTask, addTask, validateTask, getTasks, 
        updateTask, cleanTask}=tasksContext
    //Effect 
    useEffect(()=>{
        if(selectedTask !==null){
            setTask(selectedTask)
        }else{
            setTask({
                name:''
            })
        }
    },[selectedTask])
    // State of the form
    const [task, setTask]=useState({
        name:''
    })
    const {name}=task

    //if there's not any project selected
    if(!project) return null

    //Array destructuring for getting the current project
    const [currentProject]=project

    //Read the form's values 
    const handleChange=e=>{
        setTask({
            ...task,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit =e=>{
        e.preventDefault()

        //validate
        if(name.trim()===''){
            validateTask()
            return
        }
        // Check if it's a review or it's a new task
        if(selectedTask===null){
            //Add a new task in the tasks state
            task.project=currentProject._id
            task.status=false
            addTask(task)
        }else{
            updateTask(task)
            //Delete the selected task from state
            cleanTask()
        }       
        //Get and filter tasks of the current project
        getTasks(currentProject._id)
        //Reload form
        setTask({
            name:''
        })
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task's name"
                        name="name"
                        value={name}
                        onChange={handleChange}                                              
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? 'Edit Task':'Add Task'}

                    />
                </div>
            </form>
            {errorTask ? <p className="mensaje error">Task's name is required!</p>:null}
        </div>        
    );
};

export default FormTask;