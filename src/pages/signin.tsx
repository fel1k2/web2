import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSigninMutation } from "@/store/auth.Api";


export default function Index() {
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");

    const [signin] = useSigninMutation();


    return <Box sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "space-around"
    }}>
        <Box>
            <TextField
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                label={"Enter email"}

            />
            <TextField
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                label={"Enter password"}
                error={!!isPasswordError}
                onBlur={() => {
                    if (password.match(/[^a-z0-9]+$/gi)) {
                        setIsPasswordError("Password should contain only latin symbols and numbers")
                    }
                }}
                onFocus={() => {
                    setIsPasswordError("")
                }}
                helperText={isPasswordError}
            />
            <Button onClick={() => {
                console.log(">>>>>>>>>>>>", { email, password })
                signin({ email, password })
            }}>Sign in</Button>
        </Box>
    </Box>
}