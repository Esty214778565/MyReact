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
import axios from "axios";

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
export const functionContext = createContext<Function>(() => { });
export const UserIdContext = createContext<number>(0);


const HomePage = () => {

    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)


    const [userID, setUserID] = useState<number>(0)
    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useReducer(UserReducer, {} as User)
    const [enter, setEnter] = useState("")
    const url = "http://localhost:3000/api/user";
    return (
        <>
            <functionContext.Provider value={userDispatch}>
                <UserContext.Provider value={user}>
                    <h1>HomePage</h1>
                    <Grid container>
                        <Grid size={4}>
                            {!isLogin ?
                                <div>
                                    <Button color="primary" variant="contained" onClick={() => { setOpen(!open); setEnter("/login") }}>Login</Button>
                                    <Button color="primary" variant="contained" onClick={() => { setOpen(!open); setEnter("/register") }}>Register</Button>

                                </div> : <UserContext.Provider value={user}>
                                    <functionContext.Provider value={userDispatch}> <UserIdContext.Provider value={userID}><LoggedIn /></UserIdContext.Provider></functionContext.Provider></UserContext.Provider>}

                        </Grid>
                    </Grid>

                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box sx={style}>
                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                setOpen(false)



                                console.log(firstNameRef.current?.value);

                                try {
                                    const res = await axios.post(url + enter, {
                                        email: emailRef.current?.value,
                                        password: passwordRef.current?.value

                                    })
                                    console.log(firstNameRef.current?.value);

                                    setUserID(enter === "/login" ? res.data.user.id : res.data.userId)
                                    console.log(userID);

                                    setIsLogin(true)
                                    userDispatch({
                                        type: 'CREATE',
                                        data: {
                                            firstName: firstNameRef.current?.value || '',
                                            lastName: lastNameRef.current?.value || '',
                                            password: passwordRef.current?.value || '',
                                            id: userID
                                        }
                                    }
                                    )
                                    console.log("succes");
                                }
                                catch (e) {
                                    console.log(e.status);

                                    if (e.status === 422) {
                                        alert("sorry but this user already exists");
                                    }
                                    else if (e.status === 401) {
                                        alert("isn't apear")
                                    }

                                }
                                finally {


                                    console.log("firstname ref: " + firstNameRef.current?.value);

                                    firstNameRef.current!.value = ''
                                    lastNameRef.current!.value = ''
                                    emailRef.current!.value = ''
                                    passwordRef.current!.value = ''
                                }

                            }}>
                                <TextField label='firstName' inputRef={firstNameRef} />
                                <TextField label='lastName' inputRef={lastNameRef} />
                                <TextField label='password' type="password" inputRef={passwordRef} />
                                <TextField label='email' type="email" inputRef={emailRef}></TextField>
                                <Button type="submit" color="primary" variant="contained">Login</Button>
                            </form>
                        </Box>
                    </Modal>
                </UserContext.Provider>
            </functionContext.Provider>
        </>
    )

}

export default HomePage


