import { createContext, FormEvent, useReducer, useRef, useState } from "react"
import {
    Button,
    Grid2 as Grid,
    Modal,
    Box,
    Input,
    TextField
} from "@mui/material";
import UserReducer, { User } from "../UserModel";
import LoggedIn from "./LoggedIn";

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const us: User = {}
export const UserContext = createContext<User>(us);
export const functionContext = createContext<Function>(()=>{});

const HomePage = () => {


    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)


    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useReducer(UserReducer, {} as User)





    return (
        <>
            <Grid container>
                <Grid size={4}>
                    {!isLogin ?
                        <Button color="primary" variant="contained" onClick={() => setOpen(!open)}>Login</Button> : <UserContext.Provider value={user}>
                           <functionContext.Provider value={userDispatch}> <LoggedIn /></functionContext.Provider></UserContext.Provider>}
                </Grid>
            </Grid>


            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        setIsLogin(true)
                        userDispatch({
                            type: 'CREATE',
                            data: {
                                firstName: firstNameRef.current?.value || '',
                                lastName: firstNameRef.current?.value || '',
                                password: passwordRef.current?.value || ''
                            }
                        }
                    
                        )
                    }}>
                        <TextField label='firstName' inputRef={firstNameRef} />
                        <TextField label='lastName' inputRef={lastNameRef} />
                        <TextField label='password' type="password" inputRef={passwordRef} />
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                    </form>
                </Box>
            </Modal>
        </>
    )

}

export default HomePage


