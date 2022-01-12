import {useContext} from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {

    //Get form's state
    const projectsContext = useContext(projectContext)
    const {selectCurrentProject} = projectsContext

    //Get the function of task context
    const tasksContext = useContext(taskContext)
    const{getTasks}=tasksContext

    //Fuction for adding current project
    const selectProject = id =>{
        selectCurrentProject(id) //Set a current project
        getTasks(id)//filter the tasks when user clicked
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() =>selectProject(project._id)}
            >
                {project.name}
            </button>
        </li>
    );
};

export default Project;