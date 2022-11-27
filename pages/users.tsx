import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {listUsers} from "../actions/userListActions";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {corelink} from "./corelink.browser.lib";
import {useRouter} from "next/router";

export default function Users() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const control: any = corelink

        // if (control.request === undefined) {
        //     router.push("/login").then(() => {
        //         console.log("User tried accessing protected page. Not yet logged in.")
        //     })
        //     return
        // }

        listUsers("listUsers")
            .call(null)
            .then((res) => {
                setUsers(res.userList)
                setLoading(false)
            }, (res) => {
                console.log("Error while fetching users: " + res)
            })
    }, [])

    if (loading)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Loading...</h1>
                <p>The content is currently loading.</p>
            </main>
        </div>


    if (!users)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>No users found! (check console)</h1>
            </main>
        </div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Users:</h1>
                <p>Select one to start conversing...</p>

                <ul>
                    {users.map((user) => (
                        <li key={user.username}>
                            <Link href={`/conversation/${user.username}`}>{user.email}</Link>
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
