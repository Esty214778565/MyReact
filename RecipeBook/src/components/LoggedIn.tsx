import { useContext, useRef, useState } from "react"
import { UserContext } from "./HomePage"
import { Avatar, Box, Button, Modal, TextField } from "@mui/material"
import axios from "axios"
import { style } from "../My-Style"

const LoggedIn = () => {
    const [myUser, setMyUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const url = "http://localhost:3000/api/user";

    const firstNameRef = useRef<HTMLInputElement>()
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <h1>Details User: {myUser.firstName} {myUser.phone}</h1>
            <Avatar sx={{
                bgcolor: '#3f51b5', color: '#fff', fontWeight: 'bold', width: 56, height: 56,
            }}>{myUser.firstName?.charAt(0)}</Avatar>

            <h1>Hello {myUser.firstName}</h1>
            <div>
                <button
                    onClick={() => setOpen(!open)}
                    style={{
                        margin: '0.5em',
                        padding: '0.5em 1em',
                        backgroundColor: '#3f51b5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#303f9f')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3f51b5')}
                >
                    UpDate
                </button>
            </div>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        try {
                            await axios.put(url, {
                                firstName: firstNameRef.current?.value,
                                lastName: lastNameRef.current?.value,
                                email: emailRef.current?.value,
                                password: passwordRef.current?.value,
                                phone: phoneRef.current?.value
                            }, { headers: { 'user-id': myUser.id + '' } })

                            setMyUser({
                                type: 'UPDATE',
                                data: {
                                    firstName: firstNameRef.current?.value || '',
                                    lastName: lastNameRef.current?.value || '',
                                    password: passwordRef.current?.value || '',
                                    email: emailRef.current?.value || '',
                                    address: addressRef.current?.value || '',
                                    phone: phoneRef.current?.value || '',
                                    id: myUser.id
                                }
                            }
                            )
                        }
                        catch (e: any) {
                            console.log(e);
                            if (e.status === 404) {
                                alert("User not found");
                            }
                        }
                        finally {
                            setOpen(false)
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
        </>
    )
}

export default LoggedIn