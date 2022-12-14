import React, {useState} from "react";
import {login, logout} from "../actions/userActions";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import {useRouter} from "next/navigation";
import {corelink} from "../lib/corelink.browser.lib";
import Navbar from "./partials/Navbar";

export default function Login() {
    const [username, setUsername] = useState("Testuser")
    const [password, setPassword] = useState("Testpassword")

    const [host, setHost] = useState("corelink.hpc.nyu.edu")
    const [port, setPort] = useState(20012)

    const [result, setResult] = useState("")
    const router = useRouter()

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        login(username, password, host, port)
            .call(null)
            .then(() => {
                setResult("Success! Logged in successfully.")

                router.push("/users")
            }, (rej) => {
                console.log("error = " + rej)
                setResult("Failed to login! " + rej)
            })
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar></Navbar>

            <main className={styles.main}>
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

                <p>{result}</p>
            </main>
        </div>
    )
}
