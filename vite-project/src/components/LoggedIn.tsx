import { useContext, useRef, useState } from "react"
import { style, UserContext, UserIdContext } from "./HomePage"
import { Avatar, Box, Button, Modal, TextField } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import { functionContext } from "./HomePage"
import axios from "axios"


const LoggedIn = () => {
    const myUser = useContext(UserContext)
    console.log("myuser:" + myUser);
    const userID = useContext(UserIdContext)
    console.log("userid" + userID);

    const myFunc = useContext(functionContext)
    const [open, setOpen] = useState(false)
    const url = "http://localhost:3000/api/user";


    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <h1>Details User: {myUser.firstName} {myUser.phone}</h1>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>{myUser.firstName?.charAt(0)}</Avatar>

            <h1>Hello {myUser.firstName}</h1>

            <button onClick={() => setOpen(!open)}>UpDate</button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={async (e) => {
                        e.preventDefault()

                        try {

                            const res = await axios.put(url, {
                                firstName: firstNameRef.current?.value,
                                lastName: lastNameRef.current?.value,
                                email: emailRef.current?.value,
                                password: passwordRef.current?.value,
                                phone: phoneRef.current?.value
                            }, { headers: { 'user-id': userID + '' } })

                            setOpen(false)

                            myFunc({
                                type: 'UPDATE',
                                data: {
                                    firstName: firstNameRef.current?.value || '',
                                    lastName: lastNameRef.current?.value || '',
                                    password: passwordRef.current?.value || '',
                                    email: emailRef.current?.value || '',
                                    address: addressRef.current?.value || '',
                                    phone: phoneRef.current?.value || '',
                                    id: userID
                                }
                            }
                            )
                        }
                        catch (e) {
                            console.log(e);
                            if (e.status === 404) {
                                alert("User not found");
                            }

                        }
                        finally {
                            firstNameRef.current!.value = ''
                            lastNameRef.current!.value = ''
                            emailRef.current!.value = ''
                            passwordRef.current!.value = ''
                            addressRef.current!.value = ''
                            phoneRef.current!.value = ''
                        }
                    }}>
                        <TextField label='firstName' value={myUser.firstName} inputRef={firstNameRef} />
                        <TextField label='lastName' value={myUser.lastName} inputRef={lastNameRef} />
                        <TextField label='password' value={myUser.password} inputRef={passwordRef} />
                        <TextField label='email' value={myUser.email} inputRef={emailRef} />
                        <TextField label='address' value={myUser.address} inputRef={addressRef} />
                        <TextField label='phone' value={myUser.phone} inputRef={phoneRef} />
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                    </form>
                </Box>
            </Modal>
            <Button color="primary" variant="contained">Add Recipe</Button>
        </>
    )
}

export default LoggedIn