import { createContext,useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({});
    const [showBanner,setShowBanner] = useState("false");

    return (
        <AuthContext.Provider value={{auth,setAuth,showBanner,setShowBanner}}>
            {children}
        </AuthContext.Provider>
    )

}
export default AuthContext;