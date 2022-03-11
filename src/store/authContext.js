import React, { useState, useEffect, useCallback } from 'react';



const AuthContext = React.createContext({
    updateTasks: false,
    setUpdateTasks: () => {},
    updateProject: false,
    setUpdateProject: () => {},
    token: '',
    isLoggedIn: false,
    name: '',
    login: () => {},
    logout: () => {}
})


export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token')

    const [token, setToken] = useState(initialToken)
    const [name, setName] = useState('')
    const [update, setUpdate] = useState(false)
    const [updateProjectList, setUpdateProjectList] = useState(null)


const updateTasks = () => {
    console.log('updating projects')
    setUpdate(!update)
}

const updateProject = () => {
    setUpdateProjectList(!updateProjectList)
}
 


 const loginState = !!token

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
    }

    const loginHandler = (receivedToken) => {
        localStorage.setItem('token', receivedToken)
        setToken(receivedToken)

    }


    const contextValue = {
        updateTasks: update,
        setUpdateTasks: updateTasks,
        updateProject: updateProjectList,
        setUpdateProject: updateProject,
        token: token,
        isLoggedIn: loginState,
        name: name,
        setName: setName,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
