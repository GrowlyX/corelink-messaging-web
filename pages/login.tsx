import React, {useState} from "react";
import {useNavigate} from "react-router";
import {login} from "../actions/userActions";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [host, setHost] = useState("corelink.hpc.nyu.edu")
    const [port, setPort] = useState(20012)

    const navigate = useNavigate();

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        login(username, password, host, port)
    }

    return (
        <form onSubmit={submit} autoComplete="on">
            <br></br>
            <label>Username: </label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)}/><br></br>

            <label>Password: </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/><br></br>

            <label>Host: </label>
            <input type="text" value={host} onChange={e => setHost(e.target.value)}/><br></br>

            <label>Port: </label>
            <input type="number" value={port} onChange={e => setPort(e.target.valueAsNumber)}/><br></br>

            <input type="submit" value="Login"/>
        </form>
    )
}
