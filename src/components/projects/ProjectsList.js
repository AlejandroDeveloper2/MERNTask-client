import {useContext, useEffect} from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ProjectsList = () => {

    const projectsContext = useContext(projectContext)
    const {message, projects, getProjects} = projectsContext

    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    //Get projects when the component loads
    useEffect(()=>{

        if(message){
            showAlert(message.msg, message.category)
        }
        getProjects()     
        //eslint-disable-next-line        
    },[message])

    if(projects.length === 0) return <p>There are no projects! Get started creating new one!</p>
   
    return (
        <ul className="listado-proyectos">
            {alert ?(<div className={`alerta ${alert.category}`}>{alert.msg}</div> ):
            null}
            <TransitionGroup>
                {projects.map(project =>(
                    <CSSTransition
                        key={project._id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Project                                          
                            project={project}
                        />
                    </CSSTransition>                    
                ))}
            </TransitionGroup>           
        </ul>
    );
};

export default ProjectsList;