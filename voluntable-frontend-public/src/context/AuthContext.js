import React from "react";

import { ENDPOINTS } from "../utils/constants";

import { APIinstance, refreshKey } from "../instances/axios";
import { useAlert } from "react-alert";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("voluntable:volunteer:user")));
    const alert = useAlert();

    const login = async (user) => {
        let response = await APIinstance.post(ENDPOINTS.login, user);
        if (response.status === 200) {
            setUser(response.data.user);
            localStorage.setItem("voluntable:volunteer:user", JSON.stringify(response.data.user));
            localStorage.setItem("voluntable:volunteer:token", response.data.token);
            await refreshKey();
            return response.data;
        } else {
            alert.error("Login Failed");
            return null;
        }
        // setUser(user);

    }

    const logout = async () => {
        localStorage.removeItem("voluntable:volunteer:user");
        localStorage.removeItem("voluntable:volunteer:token");
        setUser(null);
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }

    return context;
}