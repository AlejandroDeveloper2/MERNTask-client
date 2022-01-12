import {useContext, useEffect} from 'react'
import Sidebar from "../layout/Sidebar"
import Bar from "../layout/Bar"
import FormTask from "../tasks/FormTask"
import TasksList from "../tasks/TasksList"
import AuthContext from "../../context/authentication/authContext"

const Projects = () => {

    //get authenticated user data
    const authContext=useContext(AuthContext)
    const {getAuthenticatedUser}=authContext

    useEffect(()=>{
        getAuthenticatedUser()
        // eslint-disable-next-line
    },[])

    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <Bar/>
                <main>
                    <FormTask/>
                    <div className="contenedor-tareas">
                        <TasksList/>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;