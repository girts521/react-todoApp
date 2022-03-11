import React from "react";

const UpdateTasks = React.createContext({
    updateNow: false,
    // update: () => {
    //     console.log('global update')
    //     updateNow = !updateNow
    // }
})

export default UpdateTasks