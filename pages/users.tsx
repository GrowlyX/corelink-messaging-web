import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {listUsers} from "../actions/userListActions";
import React, {useEffect, useState} from "react";
import Link from "next/link";

export default function Users() {
    const [users, setUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listUsers("listUsers")
            .call(null)
            .then((res) => {
                setUsers(res.userList)
                setLoading(false)
            }, (res) => {
                console.log("Error while fetching users: " + res)
            })
    })

    if (loading)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Loading...</h1>
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
                <ul>
                    {users.map((user) => (
                        <li key={user.username}>{user.email}</li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
