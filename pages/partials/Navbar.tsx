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
        if (control.isConnected()) {
            return
        }

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
            <button onClick={logoutFunc}>Logout</button>
        </div>
    );
}
