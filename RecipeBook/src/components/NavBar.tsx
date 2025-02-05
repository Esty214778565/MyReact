import { useContext } from "react"
import { Link, NavLink } from "react-router"
import { UserContext } from "./HomePage"
import { Box } from "@mui/material"

const NavBar = () => {
    const [user] = useContext(UserContext);

    if (!user)
        console.log("please ligin first");

    return (<>
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: 2,
                zIndex: 1
            }}
        >
            <nav>
                <Link to='/' style={{ color: '#3f51b5' }}>HomePage</Link> |
                <Link to='/about' style={{ color: '#3f51b5' }}>About</Link> |
                <Link to={`/loggedin/${user.firstName}`} style={{ color: '#3f51b5' }}>about user</Link>
                <NavLink to='/rer' />
            </nav>
        </Box>
    </>)
}

export default NavBar