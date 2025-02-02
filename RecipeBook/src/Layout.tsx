import { Outlet } from "react-router";
import { UserContext, } from "./components/HomePage";
import NavBar from "./components/NavBar";
import { useContext } from "react";

const Layout = () => {
    const user = useContext(UserContext);
    return (<>
        <UserContext.Provider value={user}>
            <NavBar />
        </UserContext.Provider>
        <Outlet />
    </>)
}

export default Layout;