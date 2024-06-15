// import React from "react";
const Logout = ({onLogout}) =>{
    localStorage.removeItem('token')
    onLogout();
    return;
}

export default Logout;