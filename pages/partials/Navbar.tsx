// Navbar for the top of pages
import React from 'react';
import Link from 'next/link';
import {corelink} from "../../lib/corelink.browser.lib";
import {logout} from "../../actions/userActions";
import {useRouter} from "next/router";

export default function Navbar() {
    const control: any = corelink
    const router = useRouter()

    const logoutFunc = () => {
        logout()
            .call(null)
            .then((res) => {

            }, (rej) => {
                console.log("error = " + rej)
            })

        router.push("/")
    }

    return (
        <div className="navbar">
            <Link href="/">Home</Link> |

            {control.isConnected() ? <>
                <Link href="/users"> Users</Link> | <b> </b>
                <button onClick={logoutFunc}>Logout</button>
            </> : <>
                <b> </b><button onClick={
                    () => { router.push("/login") }
                }>Login</button>
            </>}
        </div>
    );
}
