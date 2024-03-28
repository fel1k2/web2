import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSignupMutation } from "@/store/auth.Api";

export default function Index() {
    const [username, setUsername] = useState("");
    const [isUsernameError, setIsUsernameError] = useState("");

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");
    const [isRepeatPasswordError, setIsRepeatPasswordError] = useState("");

    const [signup] = useSignupMutation();

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
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                label={"Enter username"}
                error={!!isUsernameError}
                onBlur={() => {
                    if (username.length < 3) {
                        setIsUsernameError("Username should contain at least 3 characters")
                    }
                }}
                onFocus={() => { setIsUsernameError("") }}
                helperText={isUsernameError}
            />
            <TextField
                value={nickname}
                onChange={(ev) => setNickname(ev.target.value)}
                label={"Enter nickname"}
                error={!!isNicknameError}
                onBlur={() => {
                    if (nickname.length < 3) {
                        setIsNicknameError("Nickname should contain at least 3 characters")
                    }
                }}
                onFocus={() => { setIsNicknameError("") }}
                helperText={isNicknameError}
            />
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
                    if (password.length < 8) {
                        setIsPasswordError("Password should contain at least 8 characters")
                    }
                    if (password.match(/[^a-z0-9]+$/gi)) {
                        setIsPasswordError("Password should contain only latin symbols and numbers")
                    }
                }}
                onFocus={() => { setIsPasswordError("") }}
                helperText={isPasswordError}
            />

            <TextField
                value={repeatPassword}
                onChange={(ev) => setRepeatPassword(ev.target.value)}
                label={"Repeat password"}
                error={!!isRepeatPasswordError}
                onBlur={() => {
                    if (!(password == repeatPassword)) {
                        setIsRepeatPasswordError("Passwords don't match")
                    }
                }}
                onFocus={() => { setIsRepeatPasswordError("") }}
                helperText={isRepeatPasswordError}
            />
            <Button onClick={() => {
                if (!isUsernameError && repeatPassword === password) {
                    console.log(">>>>>>>>>>>>", { username, nickname, email, password })
                    signup({ username, nickname, email, password })
                }
            }}>Sign up</Button>
        </Box>
    </Box>
}