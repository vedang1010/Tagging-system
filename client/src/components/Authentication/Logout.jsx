// import React from "react";
const Logout = ({onLogout}) =>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem('subgroup')
    sessionStorage.removeItem("location")
    onLogout();
    return;
}

export default Logout;