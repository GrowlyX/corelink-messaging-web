import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {router} from "next/client";

export default function User() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const { user } = router.query

    useEffect(() => {
        // TODO: subscribe to message stream
        //  grab message history of user (redis?)
        setMessages([
            "hors",
            "donkey"
        ])
    }, [messages])

    if (loading || !messages)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>{loading ? "Loading messages..." : !messages ? "No messages were found!" : ""}</h1>
            </main>
        </div>

    return (
        <div className={styles.container}>
            <Head>
                <title>Conversing with {user}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <ul>
                    {messages.map((message) => (
                        <li key="">{message.content}</li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
