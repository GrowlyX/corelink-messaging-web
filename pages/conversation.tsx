import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, {useEffect, useState} from "react";
import {router} from "next/client";

export default function Conversation() {
    const [messages, setMessages] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const {user} = router.query

    useEffect(() => {
        // TODO: subscribe to message stream
        //  grab message history of user (redis?)
    })

    if (loading)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Loading messages...</h1>
            </main>
        </div>

    if (!messages)
        return <div className={styles.container}>
            <Head>
                <title>Corelink Messaging</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>No messages found! (check console)</h1>
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
                    {messages.map((message) => (
                        <li key="">{message.content}</li>
                    ))}
                </ul>
            </main>
        </div>
    )
}
