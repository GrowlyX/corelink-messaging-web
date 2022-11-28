// Navbar for the top of pages
import React from 'react';
import Link from 'next/link';
import {corelink} from "../corelink.browser.lib";
import {logout} from "../../actions/userActions";
import {useRouter} from "next/router";

export default function Navbar() {
    const control: any = corelink
    const router = useRouter()

    const logoutFunc = () => {
        logout()
            .call(null)
            .then((res) => {
                router.push("/")
            }, (rej) => {
                console.log("error = " + rej)
            })
    }

    return (
        <div className="navbar">
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/users">
                <a>Users</a>
            </Link>

            {control.isConnected() ? <>
                <button onClick={logoutFunc}>Logout</button>
            </> : <>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </>}
        </div>
    );
}
