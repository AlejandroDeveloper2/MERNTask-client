import {useContext, useState} from 'react'
import projectContext from '../../context/projects/projectContext'

const NewProject = () => {
    //Get form's state
    const projectsContext = useContext(projectContext)
    const {form,errorform,showForm, addProject, showError} = projectsContext

    //project's state
    const [project, setProject]=useState({
        name:''
    })

    const {name}=project
    //Read contents of the input 
    const onChangeProject=e=>{
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }
    //When user sends a project
    const onSubmitProject=e=>{
        e.preventDefault()
        //validate project
        if(name ===''){
            showError()
            return
        }
        //add to state
        addProject(project)

        //Reload the form
        addProject({
            name:''
        })
    }
    return (
        <>
            <button
                type="button"            
                className="btn btn-block btn-primario"
                onClick={()=>showForm()}
            >
                New Project
            </button>
            {
                form ? (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProject}          
                     >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="New project's name"
                            name="name"
                            value={name}
                            onChange={onChangeProject}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Add Project"
                        />
                    </form>
                ):null           
            }
            {errorform ? <p className="mensaje error">Project's name is required! </p>:null}
        </>       
    );
};

export default NewProject;