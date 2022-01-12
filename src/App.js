import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/auth/Login'
import NewAccount from './components/auth/NewAccount'
import Projects from './components/projects/Projects'
import tokenAuth from './config/token'
import PrivateRoute from './components/Routes/PrivateRoute'

import ProjectState from './context/projects/projectState'
import TaskState from './context/tasks/taskState'
import StateAlert from './context/alerts/alertState'
import AuthState from './context/authentication/authState'

//Check if a token exists
const token=localStorage.getItem('token');
if(token){
  tokenAuth(token)
}

function App() {

  return (
    <ProjectState>
      <TaskState>
        <StateAlert>
          <AuthState>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />}/>
                    <Route exact path="/new-account" element={<NewAccount />                  }/>
                    <Route exact path="/projects" element={
                      <PrivateRoute>
                        <Projects />
                      </PrivateRoute>                   
                    }/>
                </Routes>
            </BrowserRouter>
          </AuthState>
        </StateAlert>
      </TaskState>
    </ProjectState>
  );
}

export default App;
