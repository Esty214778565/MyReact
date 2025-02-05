import { createContext, Dispatch, useReducer, useRef, useState } from "react"
import { Button, Grid2 as Grid, Modal, Box, TextField } from "@mui/material";
import UserReducer, { action, User } from "./user/UserModel";
import LoggedIn from "./user/LoggedIn";
import axios from "axios";
import RecipeList from "./My-Recipes/RecipeList";
import { Outlet } from "react-router";
import AddRecipe from "./My-Recipes/AddRecipe";
import { style } from "./style/My-Style";
import Img from "./style/Img";


export const UserContext = createContext<[User, Dispatch<action>]>([{ firstName: 'fff', lastName: "dgd", password: "546456" }, () => { }]);

const HomePage = () => {

    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)

    const [isLogin, setIsLogin] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, userDispatch] = useReducer(UserReducer, {} as User)
    const [enter, setEnter] = useState("")
    const url = "http://localhost:3000/api/user";


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const res = await axios.post(url + enter, {
                email: emailRef.current?.value,
                password: passwordRef.current?.value
            })
            userDispatch({
                type: 'CREATE',
                data: {
                    firstName: res?.data?.user?.firstName || firstNameRef.current?.value,
                    lastName: res?.data?.user?.lastName || lastNameRef.current?.value,
                    password: res?.data?.user?.password || passwordRef.current?.value,
                    id: enter === "/login" ? res.data.user.id : res.data.userId
                }
            })

            setIsLogin(true)
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                switch (e.status) {
                    case 400:
                        alert("the user already exist");
                        break;
                    case 401:
                        alert("User does not exist")
                        break;
                    case 422:
                        alert("Sorry but this user already exists");
                        break;
                }
            }
        }
        finally {
            setOpen(false);
        }
    }

    return (
        <>
            <h1>HomePage</h1>

            <Grid container>
                <Grid size={4}>
                    {!isLogin ?
                        <div>
                            <Button style={{ margin: '0.5em' }} color="primary" variant="contained" onClick={() => { setOpen(!open); setEnter("/login") }}>Login</Button>
                            <Button style={{ margin: '0.5em' }} color="primary" variant="contained" onClick={() => { setOpen(!open); setEnter("/register") }}>Register</Button>
                        </div> :
                        <UserContext value={[user, userDispatch]}>
                            <LoggedIn />
                            <AddRecipe />
                        </UserContext>
                    }
                </Grid>
            </Grid>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit} >
                        <TextField label='firstName' inputRef={firstNameRef} style={{ margin: '0.5em' }} />
                        <TextField label='lastName' inputRef={lastNameRef} style={{ margin: '0.5em' }} />
                        <TextField label='password' type="password" inputRef={passwordRef} style={{ margin: '0.5em' }} />
                        <TextField label='email' type="email" inputRef={emailRef} style={{ margin: '0.5em' }}></TextField>
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                    </form>
                </Box>
            </Modal>
            <RecipeList />
            <Img />
            <Outlet />
        </>
    )
}
export default HomePage