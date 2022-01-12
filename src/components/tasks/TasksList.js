import {useContext} from 'react'
import Task from "./Task"
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const TasksList = () => {

    const projectsContext = useContext(projectContext)
    const {project,deleteProject } = projectsContext

    const tasksContext = useContext(taskContext)
    const {projectTasks}= tasksContext

    //if there's not any project selected
    if(!project) return <h2>No project selected!</h2>

    //Array destructuring for getting the current project
    const [currentProject]=project
 
    return (       
        <>
            <h2>
                Project: {currentProject.name}          
            </h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0 ? (
                    <li className="tarea"><p>There are not any tasks</p></li>
                ):
                    <TransitionGroup>
                        {
                            projectTasks.map(task=>(
                                <CSSTransition
                                    key={task.id}
                                    timeout={300}
                                    classNames="tarea"
                                >
                                    <Task                                       
                                        task={task}
                                    />
                                </CSSTransition>
                            ))      
                        }
                    </TransitionGroup>      
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={()=>deleteProject(currentProject._id)}
            >Delete project &times;</button>
        </>       
    );
};

export default TasksList;