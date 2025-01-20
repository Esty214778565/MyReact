import { createContext, FormEvent, useContext, useRef, useState } from "react"
import { User } from "../UserModel"
import { style, UserContext, UserIdContext } from "./HomePage"
import { ThemeContext } from "@emotion/react"
import { Avatar, Box, Button, Modal, styled, TextField } from "@mui/material"
import { deepOrange, deepPurple } from "@mui/material/colors"
import { functionContext } from "./HomePage"
import axios from "axios"


const LoggedIn = () => {
    const myUser = useContext(UserContext)
    console.log("myuser:" + myUser);
    const userID = useContext(UserIdContext)
    console.log("userid"+userID);

    const myFunc = useContext(functionContext)
    const [open, setOpen] = useState(false)
    const url = "http://localhost:3000/api/user";


    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const addressRef = useRef<HTMLInputElement>(null)
    const phoneRef = useRef<HTMLInputElement>(null)
    // const [userID, setUserID] = useState<number>()


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
                                alert("not found");
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
                        <TextField label='email' inputRef={emailRef} />
                        <TextField label='address' inputRef={addressRef} />
                        <TextField label='phone' inputRef={phoneRef} />
                        <Button type="submit" color="primary" variant="contained">Login</Button>
                    </form>
                </Box>
            </Modal>





        </>
    )












    // return (
    //     <>
    //         {products.map((p) => <div>
    //             <h2>{p.name}</h2>
    //             <h3>{p.price}</h3>
    //             <button onClick={() => handleDelete(p.id || 0)}>delete</button>
    //         </div>
    //         )}
    //         <h2>Add Product</h2>
    //         <form onSubmit={handleSubmit}>
    //             <input type='text' id='name' ref={nameRef} />
    //             <input type='text' id='price' ref={priceRef} />
    //             <button type='submit'>Add</button>
    //         </form>
    //     </>
    // )
}

export default LoggedIn