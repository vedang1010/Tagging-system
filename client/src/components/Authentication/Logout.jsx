// import React from "react";
const Logout = ({onLogout}) =>{
    localStorage.removeItem('token')
    sessionStorage.removeItem("location")
    onLogout();
    return;
}

export default Logout;