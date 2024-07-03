// import React from "react";
const Logout = ({onLogout}) =>{
    localStorage.clear();
    sessionStorage.clear();
    onLogout();
    return;
}

export default Logout;